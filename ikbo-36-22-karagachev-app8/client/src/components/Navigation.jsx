import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../redux/actions';
import { hasRole } from '../utils/auth';

function Navigation() {
  const { isAuthenticated, user } = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <nav>
      <ul>
        <li><NavLink to="/">Главная</NavLink></li>
        <li><NavLink to="/about">О нас</NavLink></li>
        <li><NavLink to="/projects">Проекты</NavLink></li>
        <li><NavLink to="/gallery">Галерея</NavLink></li>
        <li><NavLink to="/contact">Контакты</NavLink></li>
        
        {isAuthenticated && (
          <>
            <li><NavLink to="/dialogs">Диалоги</NavLink></li>
            {hasRole(user, ['admin']) && (
              <li><NavLink to="/admin">Админ панель</NavLink></li>
            )}
          </>
        )}
        
        {!isAuthenticated ? (
          <li><NavLink to="/auth">Войти</NavLink></li>
        ) : (
          <li><button onClick={() => dispatch(setAuth(false, null))}>Выйти</button></li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation; 