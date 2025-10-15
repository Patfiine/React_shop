import './App.css';
import EmployeeAPI from "./api/services";
import Table from "./Table";
import LoginForm from "./components/LoginForm.js";
import React, { useState, useEffect } from "react";

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
    <div className="App">
      <div className="app-header">
        <h1>Shop Management System</h1>
        <div className="user-info">
          <span>Добро пожаловать, {user}!</span>
          <button onClick={handleLogout} className="logout-btn">Выйти</button>
        </div>
      </div>
      
      <div className="app-content">
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
    </div>
  );
}

export default App;