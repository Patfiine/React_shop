import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Простая проверка логина/пароля
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      onLogin(true);
      setError('');
    } else if (credentials.username === 'user' && credentials.password === 'user') {
      onLogin(false);
      setError('');
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Вход в систему</h2>
        
        <div className="form-group">
          <label htmlFor="username">Логин:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="login-btn">Войти</button>

        <div className="login-hint">
          <p><strong>Тестовые аккаунты:</strong></p>
          <p>Админ: admin / admin</p>
          <p>Пользователь: user / user</p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;