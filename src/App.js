import './App.css';
import EmployeeAPI from "./api/services";
import Table from "./Table";
import LoginForm from "./components/LoginForm.js";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Создаем компонент About страницы
const About = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>О нашем магазине</h2>
      <p>Добро пожаловать в систему управления магазином!</p>
      <p>Здесь вы можете управлять сотрудниками и просматривать информацию о магазине.</p>
      <div style={{ marginTop: '20px' }}>
        <h3>Наши возможности:</h3>
        <ul>
          <li>Просмотр списка сотрудников</li>
          <li>Добавление новых сотрудников (для администраторов)</li>
          <li>Редактирование информации о сотрудниках</li>
          <li>Удаление сотрудников (для администраторов)</li>
        </ul>
      </div>
    </div>
  );
};

function App() {
  const [employees, setEmployees] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedIsAdmin = localStorage.getItem('isAdmin');
    
    if (savedUser) {
      setUser(savedUser);
      setIsLoggedIn(true);
      setIsAdmin(savedIsAdmin === 'true');
      setEmployees(EmployeeAPI.all());
    }
  }, []);

  const handleLogin = (adminStatus) => {
    const username = adminStatus ? 'admin' : 'user';
    setUser(username);
    setIsLoggedIn(true);
    setIsAdmin(adminStatus);
    setEmployees(EmployeeAPI.all());
    
    localStorage.setItem('user', username);
    localStorage.setItem('isAdmin', adminStatus);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
    setEmployees([]);
    
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
  };

  const handleDelete = (id) => {
    if (!isAdmin) {
      alert('Только администратор может удалять сотрудников');
      return;
    }
    EmployeeAPI.delete(id);
    setEmployees([...EmployeeAPI.all()]);
  };

  const handleAdd = () => {
    if (!isAdmin) {
      alert('Только администратор может добавлять сотрудников');
      return;
    }
    const newEmployee = {
      number: Date.now(),
      name: "New Employee",
      job: "Intern",
    };
    EmployeeAPI.add(newEmployee);
    setEmployees([...EmployeeAPI.all()]);
  };

  const handleEditName = (id, newName) => {
    console.log('Editing:', id, newName);
    
    const employeeToUpdate = employees.find(emp => emp.number === id);
    
    if (employeeToUpdate) {
      const updatedEmployee = {
        ...employeeToUpdate,
        name: newName
      };
      
      const result = EmployeeAPI.update(id, updatedEmployee);
      console.log('Update result:', result);
      
      setEmployees(EmployeeAPI.all());
    }
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="App">
        <div className="app-header">
          <h1>Shop Management System</h1>
          <div className="user-info">
            <span>Добро пожаловать, {user}!</span>
            
            {/* Добавляем навигацию */}
            <nav style={{ display: 'inline-block', marginLeft: '20px' }}>
              <Link 
                to="/" 
                style={{ 
                  marginRight: '15px', 
                  textDecoration: 'none',
                  color: 'black',
                  padding: '5px 10px',
                  border: '1px solid white',
                  borderRadius: '3px'
                }}
              >
                Сотрудники
              </Link>
              <Link 
                to="/about" 
                style={{ 
                  textDecoration: 'none',
                  color: 'black',
                  padding: '5px 10px',
                  border: '1px solid white',
                  borderRadius: '3px'
                }}
              >
                О магазине
              </Link>
            </nav>
            
            <button onClick={handleLogout} className="logout-btn">Выйти</button>
          </div>
        </div>
        
        <div className="app-content">
          <Routes>
            {/* Главная страница с таблицей сотрудников */}
            <Route path="/" element={
              <div>
                {isAdmin && (
                  <button onClick={handleAdd} className="add-btn">Add Employee</button>
                )}
                
                <Table 
                  employees={employees} 
                  onDelete={isAdmin ? handleDelete : null}
                  onEditName={handleEditName}
                  isAdmin={isAdmin}
                />
              </div>
            } />
            
            {/* Страница "О магазине" */}
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;