import './App.css';
import Shop from "./pages/Shop";
import Tables from "./pages/Tables";
import EmployeeAPI from "./api/services";
import Table from "./Table";
import LoginForm from "./components/LoginForm.js";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import Basket from "./pages/Basket"; 





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
      name: "Новый сотрудник",
      job: "Intern",
    };
    EmployeeAPI.add(newEmployee);
    setEmployees([...EmployeeAPI.all()]);
  };
  

// --- добавляем состояние корзины в App ---
const [basket, setBasket] = useState(() => {
  return JSON.parse(localStorage.getItem("basket") || "[]");
});

// Функция добавления товара в корзину
const addToBasket = (product) => {
  const updated = [...basket, product];
  setBasket(updated);
  localStorage.setItem("basket", JSON.stringify(updated));
};

// Функция удаления товара из корзины
const handleRemoveFromBasket = (product) => {
  const updated = basket.filter(item => item !== product);
  setBasket(updated);
  localStorage.setItem("basket", JSON.stringify(updated));
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

    {/* --- Header --- */}
    <div className="app-header">
      <div className="header-top">
        <h1 className="header-title">Shop Management System</h1>
        <div className="user-info">
          <span>Добро пожаловать, {user}!</span>
          {isAdmin && <span>(Admin)</span>}
        </div>
      </div>

      <div className="header-bottom">
        <nav className="header-nav">
          <NavLink to="/employees" className={({ isActive }) => isActive ? 'active' : ''}>Сотрудники</NavLink>
          <NavLink to="/shop" className={({ isActive }) => isActive ? 'active' : ''}>Товары</NavLink>
          <NavLink to="/tables" className={({ isActive }) => isActive ? 'active' : ''}>Таблицы</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>О магазине</NavLink>
           <NavLink to="/basket" className={({ isActive }) => isActive ? 'active' : ''}>Корзина</NavLink>
        </nav>

        <Button 
  variant="outlined" 
  color="error" 
  onClick={handleLogout}
>
  Выйти
</Button>

      </div>
    </div>

    {/* --- Контент --- */}
    <div className="app-content">
      <Routes>
  <Route path="/" element={<Navigate to="/shop" replace />} />
  
  {/* Передаем addToBasket в Shop */}
  <Route path="/shop" element={<Shop addToBasket={addToBasket} />} />

  <Route path="/employees" element={
    <div>
      {isAdmin && <button onClick={handleAdd} className="add-btn">Добавить сотрудника</button>}
      <Table employees={employees} onDelete={isAdmin ? handleDelete : null} onEditName={handleEditName} isAdmin={isAdmin} />
    </div>
  } />

  <Route path="/tables" element={<Tables />} />
  <Route path="/about" element={<About />} />

  {/* Корзина получает basket и функцию удаления */}
  <Route path="/basket" element={<Basket basketItems={basket} onRemove={handleRemoveFromBasket} />} />
</Routes>

    </div>

  </div>
</Router>
  );
}//

export default App;