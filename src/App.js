import "./App.css";
import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
import Button from "@mui/material/Button";

// pages
import Shop from "./pages/Shop";
import Tables from "./pages/Tables";
import BasketPage from "./pages/BasketPage";

// components
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";

// employees
import EmployeeAPI from "./api/services";
import Table from "./Table";

// --- About page ---
const About = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>О нашем магазине</h2>
      <p>Добро пожаловать в систему управления магазином!</p>
      <p>Здесь вы можете управлять сотрудниками и просматривать информацию о магазине.</p>
      <ul>
        <li>Просмотр списка сотрудников</li>
        <li>Добавление сотрудников (администратор)</li>
        <li>Редактирование данных</li>
        <li>Удаление сотрудников</li>
      </ul>
    </div>
  );
};

function App() {
  // --- auth ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  // --- employees ---
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
    const username = adminStatus ? "admin" : "user";

    setUser(username);
    setIsLoggedIn(true);
    setIsAdmin(adminStatus);
    setEmployees(EmployeeAPI.all());

    localStorage.setItem("user", username);
    localStorage.setItem("isAdmin", adminStatus);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
    setEmployees([]);

    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
  };

  // --- employees actions ---
  const handleDelete = (id) => {
    if (!isAdmin) {
      alert("Только администратор может удалять сотрудников");
      return;
    }
    EmployeeAPI.delete(id);
    setEmployees(EmployeeAPI.all());
  };

  const handleAdd = () => {
    if (!isAdmin) {
      alert("Только администратор может добавлять сотрудников");
      return;
    }

    EmployeeAPI.add({
      number: Date.now(),
      name: "Новый сотрудник",
      job: "Intern",
    });

    setEmployees(EmployeeAPI.all());
  };

  const handleEditName = (id, newName) => {
    const employee = employees.find((e) => e.number === id);
    if (!employee) return;

    EmployeeAPI.update(id, { ...employee, name: newName });
    setEmployees(EmployeeAPI.all());
  };

  // --- auth guard ---
  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="App">
        {/* ===== HEADER ===== */}
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

        {/* ===== CONTENT ===== */}
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
                    isAdmin={isAdmin}
                  />
                </div>
              }
            />
          </Routes>
        </div>

        {/* 🔔 GLOBAL NOTIFICATIONS */}
        <Notification />
      </div>
    </Router>
  );
}

export default App;
