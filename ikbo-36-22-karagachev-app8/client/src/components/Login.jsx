import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuth } from '../redux/actions';
import axios from 'axios';
import { decodeJWT } from '../utils/jwt';

function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!isLoginMode) {
        if (credentials.password !== credentials.confirmPassword) {
          alert('Пароли не совпадают');
          return;
        }

        const response = await axios.post('http://localhost:3000/api/auth/register', {
          username: credentials.username,
          password: credentials.password
        });

        const { user, token } = response.data;
        const decodedToken = decodeJWT(token);

        dispatch(setAuth(true, {
          id: decodedToken.id,
          username: user.username,
          role: user.role,
          token
        }));
        navigate('/');
      } else {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          username: credentials.username,
          password: credentials.password
        });

        const { user, token } = response.data;
        const decodedToken = decodeJWT(token);

        dispatch(setAuth(true, {
          id: decodedToken.id,
          username: user.username,
          role: user.role,
          token
        }));
        navigate('/');
      }
    } catch (error) {
      console.error('Ошибка аутентификации:', error);
      alert(error.response?.data?.error || 'Произошла ошибка при аутентификации');
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isLoginMode ? 'Вход в систему' : 'Регистрация'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Имя пользователя:</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Пароль:</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          {!isLoginMode && (
            <div>
              <label>Подтвердите пароль:</label>
              <input
                type="password"
                name="confirmPassword"
                value={credentials.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <button type="submit">
            {isLoginMode ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>
        <button
          className="switch-auth-mode"
          onClick={() => setIsLoginMode(!isLoginMode)}
        >
          {isLoginMode ? 'Создать аккаунт' : 'Уже есть аккаунт?'}
        </button>
      </div>
    </div>
  );
}

export default Login; 