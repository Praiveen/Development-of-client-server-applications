import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Главная</NavLink></li>
        <li><NavLink to="/about">О нас</NavLink></li>
        <li><NavLink to="/projects">Проекты</NavLink></li>
        <li><NavLink to="/gallery">Галерея</NavLink></li>
        <li><NavLink to="/contact">Контакты</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navigation; 