import './App.css';
import EmployeeAPI from "./api/services";
import Table from "./Table";
import React, { useState } from "react";

function App() {
  const [employees, setEmployees] = useState(EmployeeAPI.all());

  const handleDelete = (id) => {
    EmployeeAPI.delete(id);
    setEmployees([...EmployeeAPI.all()]);
  };

  const handleAdd = () => {
    const newEmployee = {
      number: Date.now(),
      name: "New Employee",
      job: "Intern",
    };
    EmployeeAPI.add(newEmployee);
    setEmployees([...EmployeeAPI.all()]);
  };

  // Исправленная функция изменения имени
  const handleEditName = (id, newName) => {
    console.log('Editing:', id, newName); // для отладки
    
    const employeeToUpdate = employees.find(emp => emp.number === id);
    
    if (employeeToUpdate) {
      const updatedEmployee = {
        ...employeeToUpdate,
        name: newName
      };
      
      // Вызываем update и проверяем результат
      const result = EmployeeAPI.update(id, updatedEmployee);
      console.log('Update result:', result); // для отладки
      
      // Обновляем состояние на основе актуальных данных из API
      setEmployees(EmployeeAPI.all());
    }
  };

  return (
    <div className="App">
      <h1>Shop</h1>
      <button onClick={handleAdd}>Add Employee</button>
      <Table 
        employees={employees} 
        onDelete={handleDelete}
        onEditName={handleEditName}
      />
    </div>
  );
}

export default App;