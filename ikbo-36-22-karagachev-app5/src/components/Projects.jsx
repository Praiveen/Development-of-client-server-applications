function Projects() {
  const projects = [
    {
      id: 1,
      title: "Веб-приложение",
      description: "Разработка современного веб-приложения на React",
      status: "В разработке",
      progress: 75
    },
    {
      id: 2,
      title: "Мобильное приложение",
      description: "Создание кроссплатформенного мобильного приложения",
      status: "Завершен",
      progress: 100
    },
    {
      id: 3,
      title: "Дизайн система",
      description: "Разработка корпоративной дизайн системы",
      status: "Планируется",
      progress: 0
    }
  ];

  return (
    <div className="page">
      <h1>Наши проекты</h1>
      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-status">
              <span>Статус: {project.status}</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{width: `${project.progress}%`}}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects; 