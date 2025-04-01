import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuth, registerUser } from '../redux/actions';
import { generatePKCEChallenge } from '../utils/pkce';

function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registeredUsers = useSelector(state => state.registeredUsers);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { codeVerifier } = await generatePKCEChallenge();
      
      if (!isLoginMode) {
        if (credentials.password !== credentials.confirmPassword) {
          alert('Пароли не совпадают');
          return;
        }

        if (registeredUsers.some(user => user.username === credentials.username)) {
          alert('Пользователь с таким именем уже существует');
          return;
        }

        const newUser = {
          username: credentials.username,
          password: credentials.password,
          role: 'user',
          verifier: codeVerifier
        };

        dispatch(registerUser(newUser));
        dispatch(setAuth(true, { 
          username: credentials.username, 
          role: 'user',
          verifier: codeVerifier
        }));
        navigate('/');
      } else {
        const user = registeredUsers.find(
          user => user.username === credentials.username && 
                  user.password === credentials.password
        );

        if (user) {

          try {

            const mockAuthResponse = await mockAuthServer(user.verifier, codeVerifier);
            
            if (mockAuthResponse.success) {
              dispatch(setAuth(true, { 
                username: user.username, 
                role: user.role,
                verifier: codeVerifier 
              }));
              navigate('/');
            } else {
              alert('Ошибка проверки PKCE');
            }
          } catch (error) {
            console.error('PKCE verification error:', error);
            alert('Ошибка проверки PKCE');
          }
        } else {
          alert('Неверные учетные данные для входа');
        }
      }
    } catch (error) {
      console.error('Ошибка аутентификации:', error);
      alert('Произошла ошибка при аутентификации');
    }
  };

  const mockAuthServer = (storedVerifier, newVerifier) => {
    return new Promise((resolve) => {

      setTimeout(() => {
        resolve({
          success: true,
          token: 'mock_token_' + Math.random()
        });
      }, 100);
    });
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