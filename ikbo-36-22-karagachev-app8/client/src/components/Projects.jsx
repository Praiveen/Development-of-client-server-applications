import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import api from '../utils/axios';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
  });
  
  const { user, isAuthenticated } = useSelector(state => state);
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      console.log('Загруженные проекты:', response.data);
      setProjects(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке проектов:', error);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/projects', newProject);
      setProjects([response.data, ...projects]);
      setNewProject({ title: '', description: '' });
    } catch (error) {
      console.error('Ошибка при создании проекта:', error);
    }
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/projects/${editingProject.id}`, editingProject);
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      console.error('Ошибка при обновлении проекта:', error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Вы уверены, что хотите удалить этот проект?')) {
      try {
        await api.delete(`/projects/${projectId}`);
        fetchProjects();
      } catch (error) {
        console.error('Ошибка при удалении проекта:', error);
      }
    }
  };

  return (
    <div className="page">
      <h1>Наши проекты</h1>
      
      {console.log('Текущий пользователь:', user)}
      {console.log('isAuthenticated:', isAuthenticated)}
      {console.log('isAdmin:', isAdmin)}
      
      {isAuthenticated && (
        <div className="project-form">
          <h3>Создать новый проект</h3>
          <form onSubmit={handleCreateProject}>
            <div>
              <label>Название:</label>
              <input
                type="text"
                value={newProject.title}
                onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                required
              />
            </div>
            <div>
              <label>Описание:</label>
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                required
              />
            </div>
            <button type="submit">Создать проект</button>
          </form>
        </div>
      )}

      <div className="projects-grid">
        {projects.map(project => {
          console.log('Проект:', project);
          console.log('ID проекта:', project.userId);
          console.log('ID пользователя:', user?.id);
          console.log('Условие доступа:', {
            isAuthenticated,
            isAdmin,
            projectUserId: String(project.userId),
            userId: String(user?.id),
            hasAccess: isAuthenticated && (isAdmin || String(project.userId) === String(user?.id))
          });
          
          return (
            <div key={project.id} className="project-card">
              {editingProject?.id === project.id ? (
                <form onSubmit={handleUpdateProject}>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      title: e.target.value
                    })}
                    required
                  />
                  <textarea
                    value={editingProject.description}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      description: e.target.value
                    })}
                    required
                  />
                  <div className="project-actions">
                    <button type="submit">Сохранить</button>
                    <button type="button" onClick={() => setEditingProject(null)}>
                      Отмена
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-meta">
                    <small>
                      Автор: {project.creatorName || 'Неизвестен'}
                    </small>
                    <small>
                      Создано: {new Date(project.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  {isAuthenticated && (isAdmin || String(project.userId) === String(user?.id)) && (
                    <div className="project-actions">
                      <button onClick={() => setEditingProject(project)}>
                        Редактировать
                      </button>
                      <button 
                        onClick={() => handleDeleteProject(project.id)}
                        className="delete-button"
                      >
                        Удалить
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Projects; 