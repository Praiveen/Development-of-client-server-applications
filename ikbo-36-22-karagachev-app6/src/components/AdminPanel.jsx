import { useSelector } from 'react-redux';
import { isAllowed } from '../utils/auth';

function AdminPanel() {
  const user = useSelector(state => state.user);

  return (
    <div className="admin-panel">
      <h2>Панель администратора</h2>
      {isAllowed(user, ['can_edit_articles']) && (
        <div className="admin-section">
          <h3>Управление статьями</h3>
          <button>Создать статью</button>
          <button>Редактировать статьи</button>
        </div>
      )}
      {isAllowed(user, ['can_delete_articles']) && (
        <div className="admin-section">
          <h3>Управление пользователями</h3>
          <button>Управление правами</button>
          <button>Удаление пользователей</button>
        </div>
      )}
    </div>
  );
}

export default AdminPanel; 