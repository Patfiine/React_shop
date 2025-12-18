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

    if (!credentials.username.includes('@')) {
      setError('Логин должен быть в формате email');
      return;
    }

    if (credentials.password.length < 5 || credentials.password.length > 10) {
      setError('Пароль должен быть от 5 до 10 символов');
      return;
    }

    // передаем email + isAdmin
    if (credentials.username === 'admin@gmail.com' && credentials.password === 'admin') {
      onLogin(credentials.username, true); // email + админ
      setError('');
    } else {
      onLogin(credentials.username, false); // email + обычный пользователь
      setError('');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Вход в систему</h2>

        <div className="form-group">
          <label htmlFor="username">Email:</label>
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
          <p><strong>Тестовый аккаунт админа:</strong></p>
          <p>Email: admin@gmail.com / Пароль: admin</p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
