import React, { useState } from 'react';

function Table({ employees, onDelete, onEditName }) {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleEditClick = (employee) => {
    setEditingId(employee.number);
    setEditName(employee.name);
  };

  const handleSaveClick = (id) => {
    if (editName.trim() !== '') {
      onEditName(id, editName.trim());
    }
    setEditingId(null);
    setEditName('');
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditName('');
  };

  const handleKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      handleSaveClick(id);
    } else if (e.key === 'Escape') {
      handleCancelClick();
    }
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th style={{ padding: '10px', border: '1px solid #ddd' }}>Number</th>
          <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
          <th style={{ padding: '10px', border: '1px solid #ddd' }}>Job</th>
          <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(employee => (
          <tr key={employee.number}>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{employee.number}</td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
              {editingId === employee.number ? (
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, employee.number)}
                  autoFocus
                  style={{ width: '100%', padding: '5px' }}
                />
              ) : (
                employee.name
              )}
            </td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{employee.job}</td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
              {editingId === employee.number ? (
                <div>
                  <button 
                    onClick={() => handleSaveClick(employee.number)}
                    style={{ marginRight: '5px', padding: '5px 10px' }}
                  >
                    Save
                  </button>
                  <button 
                    onClick={handleCancelClick}
                    style={{ padding: '5px 10px' }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <button 
                    onClick={() => handleEditClick(employee)}
                    style={{ marginRight: '5px', padding: '5px 10px' }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(employee.number)}
                    style={{ padding: '5px 10px' }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;