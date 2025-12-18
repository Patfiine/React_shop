// App.js
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { showNotification } from "./features/notification/notificationSlice";

import Shop from "./pages/Shop";
import Tables from "./pages/Tables";
import BasketPage from "./pages/BasketPage";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import EmployeeAPI from "./api/services";
import Table from "./Table";

const About = () => (
  <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
    <h2>О нашем магазине</h2>
    <p>Добро пожаловать в систему управления магазином!</p>
    <ul>
      <li>Просмотр списка сотрудников</li>
      <li>Добавление сотрудников (администратор)</li>
      <li>Редактирование данных</li>
      <li>Удаление сотрудников</li>
    </ul>
  </div>
);

function App() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedIsAdmin = localStorage.getItem("isAdmin");

    if (savedUser) {
      setUser(savedUser);
      setIsLoggedIn(true);
      setIsAdmin(savedIsAdmin === "true");
      setEmployees(EmployeeAPI.all());
    }
  }, []);

  const handleLogin = (adminStatus) => {
    const username = adminStatus ? "admin@gmail.com" : "user@gmail.com";
    setUser(username);
    setIsLoggedIn(true);
    setIsAdmin(adminStatus);
    setEmployees(EmployeeAPI.all());

    localStorage.setItem("user", username);
    localStorage.setItem("isAdmin", adminStatus);

    dispatch(
      showNotification({
        message: adminStatus ? "Вход как администратор" : "Вход как пользователь",
        type: "success",
        duration: 3000
      })
    );
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
    setEmployees([]);

    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");

    dispatch(
      showNotification({
        message: "Вы вышли из системы",
        type: "info",
        duration: 3000
      })
    );
  };

  const handleDelete = (id) => {
    if (!isAdmin) {
      alert("Только администратор может удалять сотрудников");
      return;
    }
    const employee = employees.find((e) => e.number === id);
    EmployeeAPI.delete(id);
    setEmployees(EmployeeAPI.all());

    dispatch(
      showNotification({
        message: `Сотрудник "${employee.name}" удалён`,
        type: "info",
        duration: 3000
      })
    );
  };

  const handleAdd = () => {
    if (!isAdmin) {
      alert("Только администратор может добавлять сотрудников");
      return;
    }

    const newEmp = { number: Date.now(), name: "Новый сотрудник", job: "Intern" };
    EmployeeAPI.add(newEmp);
    setEmployees(EmployeeAPI.all());

    dispatch(
      showNotification({
        message: `Добавлен сотрудник "${newEmp.name}"`,
        type: "success",
        duration: 3000
      })
    );
  };

  const handleEditName = (id, newName) => {
    const employee = employees.find((e) => e.number === id);
    if (!employee) return;

    EmployeeAPI.update(id, { ...employee, name: newName });
    setEmployees(EmployeeAPI.all());

    dispatch(
      showNotification({
        message: `Имя сотрудника обновлено на "${newName}"`,
        type: "success",
        duration: 3000
      })
    );
  };

  const handleEditJob = (id, newJob) => {
    const employee = employees.find((e) => e.number === id);
    if (!employee) return;

    EmployeeAPI.update(id, { ...employee, job: newJob });
    setEmployees(EmployeeAPI.all());

    dispatch(
      showNotification({
        message: `Должность сотрудника обновлена на "${newJob}"`,
        type: "success",
        duration: 3000
      })
    );
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="App">
        <div className="app-header">
          <div className="header-top">
            <h1 className="header-title">Shop Management System</h1>
            <div className="user-info">
              <span>Добро пожаловать, {user}!</span>
              {isAdmin && <span> (Admin)</span>}
            </div>
          </div>

          <div className="header-bottom">
            <nav className="header-nav">
              <NavLink to="/employees">Сотрудники</NavLink>
              <NavLink to="/shop">Товары</NavLink>
              <NavLink to="/tables">Таблицы</NavLink>
              <NavLink to="/about">О магазине</NavLink>
              <NavLink to="/basket">Корзина</NavLink>
            </nav>

            <Button variant="outlined" color="error" onClick={handleLogout}>
              Выйти
            </Button>
          </div>
        </div>

        <div className="app-content">
          <Routes>
            <Route path="/" element={<Navigate to="/shop" replace />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/basket" element={<BasketPage />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/employees"
              element={
                <div>
                  {isAdmin && (
                    <button onClick={handleAdd} className="add-btn">
                      Добавить сотрудника
                    </button>
                  )}
                  <Table
                    employees={employees}
                    onDelete={isAdmin ? handleDelete : null}
                    onEditName={handleEditName}
                    onEditJob={handleEditJob}
                    isAdmin={isAdmin}
                  />
                </div>
              }
            />
          </Routes>
        </div>

        <Notification />
      </div>
    </Router>
  );
}

export default App;