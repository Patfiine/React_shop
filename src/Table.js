// Table.js
import React, { useState } from 'react';
import './Table.css';

const Table = ({ employees, onDelete, onEditName, onEditJob, isAdmin }) => {
  const [editingId, setEditingId] = useState(null);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');

  const startEdit = (employee, field) => {
    setEditingId(employee.id); // <- исправлено number -> id
    setEditField(field);
    setEditValue(field === 'name' ? employee.name : employee.job);
  };

  const saveEdit = (id) => {
    if (editValue.trim() === '') return;
    if (editField === 'name') {
      onEditName(id, editValue.trim());
    } else {
      onEditJob(id, editValue.trim());
    }
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditField('');
    setEditValue('');
  };

  const handleKeyPress = (e, id) => {
    if (e.key === 'Enter') saveEdit(id);
    if (e.key === 'Escape') cancelEdit();
  };

  if (!employees || employees.length === 0) {
    return (
      <div className="table-container">
        <div className="no-data">
          <p>Нет данных о сотрудниках</p>
          {isAdmin && <p>Нажмите "Добавить сотрудника" чтобы добавить первого сотрудника</p>}
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
          {employees.map(emp => (
            <tr key={emp.id} className="employee-row"> {/* <- number -> id */}
              <td className="employee-id">{emp.id}</td>

              {/* Имя */}
              <td className="employee-name">
                {editingId === emp.id && editField === 'name' ? (
                  <div className="edit-container">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e, emp.id)}
                      className="edit-input"
                      autoFocus
                      disabled={!isAdmin}
                    />
                    {isAdmin && (
                      <div className="edit-actions">
                        <button onClick={() => saveEdit(emp.id)} className="save-btn">✓</button>
                        <button onClick={cancelEdit} className="cancel-btn">✕</button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="name-container">
                    <span>{emp.name}</span>
                    {isAdmin && (
                      <button onClick={() => startEdit(emp, 'name')} className="edit-btn">✏️</button>
                    )}
                  </div>
                )}
              </td>

              {/* Должность */}
              <td className="employee-job">
                {editingId === emp.id && editField === 'job' ? (
                  <div className="edit-container">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e, emp.id)}
                      className="edit-input"
                      autoFocus
                      disabled={!isAdmin}
                    />
                    {isAdmin && (
                      <div className="edit-actions">
                        <button onClick={() => saveEdit(emp.id)} className="save-btn">✓</button>
                        <button onClick={cancelEdit} className="cancel-btn">✕</button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="name-container">
                    <span>{emp.job}</span>
                    {isAdmin && (
                      <button onClick={() => startEdit(emp, 'job')} className="edit-btn">✏️</button>
                    )}
                  </div>
                )}
              </td>

              {/* Действия */}
              <td className="employee-actions">
                {isAdmin && onDelete ? (
                  <button
  onClick={() => onDelete(emp.id)}
  className="delete-btn"
>
  🗑️
</button>
                ) : (
                  <span className="no-permission">Только просмотр</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table-info">
        <p>Всего сотрудников: {employees.length}</p>
        {isAdmin ? (
          <p className="admin-info">Режим администратора: полный доступ</p>
        ) : (
          <p className="user-info">Режим пользователя: только просмотр и редактирование</p>
        )}
      </div>
    </div>
  );
};

export default Table;
