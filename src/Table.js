import React, { useState } from 'react';
import './Table.css';

const Table = ({ employees, onDelete, onEditName, isAdmin }) => {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleEditClick = (employee) => {
    setEditingId(employee.number);
    setEditValue(employee.name);
  };

  const handleSaveClick = (id) => {
    if (editValue.trim() !== '') {
      onEditName(id, editValue.trim());
    }
    setEditingId(null);
    setEditValue('');
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      handleSaveClick(id);
    } else if (e.key === 'Escape') {
      handleCancelClick();
    }
  };

  if (!employees || employees.length === 0) {
    return (
      <div className="table-container">
        <div className="no-data">
          <p>Нет данных о сотрудниках</p>
          {isAdmin && (
            <p>Нажмите "Add Employee" чтобы добавить первого сотрудника</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Должность</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.number} className="employee-row">
              <td className="employee-id">{employee.number}</td>
              
              <td className="employee-name">
                {editingId === employee.number ? (
                  <div className="edit-container">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e, employee.number)}
                      className="edit-input"
                      autoFocus
                    />
                    <div className="edit-actions">
                      <button 
                        onClick={() => handleSaveClick(employee.number)}
                        className="save-btn"
                        title="Сохранить"
                      >
                        ✓
                      </button>
                      <button 
                        onClick={handleCancelClick}
                        className="cancel-btn"
                        title="Отменить"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="name-container">
                    <span>{employee.name}</span>
                    <button 
                      onClick={() => handleEditClick(employee)}
                      className="edit-btn"
                      title="Редактировать имя"
                    >
                      ✏️
                    </button>
                  </div>
                )}
              </td>
              
              <td className="employee-job">{employee.job}</td>
              
              <td className="employee-actions">
                {onDelete && (
                  <button 
                    onClick={() => {
                      if (window.confirm(`Вы уверены, что хотите удалить сотрудника ${employee.name}?`)) {
                        onDelete(employee.number);
                      }
                    }}
                    className="delete-btn"
                    title="Удалить сотрудника"
                  >
                    🗑️
                  </button>
                )}
                {!onDelete && (
                  <span className="no-permission">Только просмотр</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="table-info">
        <p>Всего сотрудников: {employees.length}</p>
        {isAdmin && (
          <p className="admin-info">Режим администратора: полный доступ</p>
        )}
        {!isAdmin && (
          <p className="user-info">Режим пользователя: только просмотр и редактирование имен</p>
        )}
      </div>
    </div>
  );
};

export default Table;