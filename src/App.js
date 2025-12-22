import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { showNotification } from "./features/notification/notificationSlice";

import Shop from "./pages/Shop";
import Tables from "./pages/Tables";
import BasketPage from "./pages/BasketPage";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Table from "./Table";
import EmployeeAPI from "./api/services"; // <- axios сервис

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

  // 🔹 fetchEmployees обернута в useCallback, чтобы ESLint не ругался
  const fetchEmployees = useCallback(async () => {
    try {
      const data = await EmployeeAPI.all();
      setEmployees(data);
    } catch (err) {
      console.error(err);
      dispatch(showNotification({ message: "Ошибка загрузки сотрудников", type: "error", duration: 3000 }));
    }
  }, [dispatch]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedIsAdmin = localStorage.getItem("isAdmin");

    if (savedUser) {
      setUser(savedUser);
      setIsLoggedIn(true);
      setIsAdmin(savedIsAdmin === "true");
      fetchEmployees();
    }
  }, [fetchEmployees]);

  const handleLogin = (email, adminStatus) => {
    setUser(email);
    setIsLoggedIn(true);
    setIsAdmin(adminStatus);
    fetchEmployees();

    localStorage.setItem("user", email);
    localStorage.setItem("isAdmin", adminStatus);

    dispatch(showNotification({
      message: adminStatus ? "Вход как администратор" : "Вход как пользователь",
      type: "success",
      duration: 3000
    }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
    setEmployees([]);

    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");

    dispatch(showNotification({ message: "Вы вышли из системы", type: "info", duration: 3000 }));
  };

  const handleAdd = async () => {
    if (!isAdmin) return alert("Только администратор может добавлять сотрудников");

    const newEmp = { name: "Новый сотрудник", job: "Intern" };
    try {
      await EmployeeAPI.add(newEmp);
      await fetchEmployees();
      dispatch(showNotification({ message: `Добавлен сотрудник "${newEmp.name}"`, type: "success", duration: 3000 }));
    } catch (err) {
      console.error(err);
      dispatch(showNotification({ message: "Ошибка при добавлении сотрудника", type: "error", duration: 3000 }));
    }
  };

  const handleDelete = async (id) => {
    if (!isAdmin) return alert("Только администратор может удалять сотрудников");

    const employee = employees.find(e => e.id === id);
    if (!employee) return;

    if (!window.confirm(`Вы уверены, что хотите удалить сотрудника ${employee.name}?`)) return;

    try {
      await EmployeeAPI.delete(id);
      await fetchEmployees();
      dispatch(showNotification({ message: `Сотрудник "${employee.name}" удалён`, type: "info", duration: 3000 }));
    } catch (err) {
      console.error(err);
      dispatch(showNotification({ message: "Ошибка при удалении сотрудника", type: "error", duration: 3000 }));
    }
  };

  const handleEditName = async (id, newName) => {
    const employee = employees.find(e => e.id === id);
    if (!employee) return;

    try {
      await EmployeeAPI.update(id, { ...employee, name: newName });
      await fetchEmployees();
      dispatch(showNotification({ message: `Имя сотрудника обновлено на "${newName}"`, type: "success", duration: 3000 }));
    } catch (err) {
      console.error(err);
      dispatch(showNotification({ message: "Ошибка при редактировании имени", type: "error", duration: 3000 }));
    }
  };

  const handleEditJob = async (id, newJob) => {
    const employee = employees.find(e => e.id === id);
    if (!employee) return;

    try {
      await EmployeeAPI.update(id, { ...employee, job: newJob });
      await fetchEmployees();
      dispatch(showNotification({ message: `Должность сотрудника обновлена на "${newJob}"`, type: "success", duration: 3000 }));
    } catch (err) {
      console.error(err);
      dispatch(showNotification({ message: "Ошибка при редактировании должности", type: "error", duration: 3000 }));
    }
  };

  if (!isLoggedIn) return <LoginForm onLogin={handleLogin} />;

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

            <Button variant="outlined" color="error" onClick={handleLogout}>Выйти</Button>
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
