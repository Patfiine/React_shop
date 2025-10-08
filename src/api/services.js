const EmployeeAPI = {
    all: () => {
      const employees = JSON.parse(localStorage.getItem('employees') || '[]');
      return employees;
    },
  
    add: (employee) => {
      const employees = EmployeeAPI.all();
      employees.push(employee);
      localStorage.setItem('employees', JSON.stringify(employees));
      return employee;
    },
  
    delete: (id) => {
      let employees = EmployeeAPI.all();
      employees = employees.filter(emp => emp.number !== id);
      localStorage.setItem('employees', JSON.stringify(employees));
    },
  
    update: (id, updatedEmployee) => {
      let employees = EmployeeAPI.all();
      const index = employees.findIndex(emp => emp.number === id);
      
      if (index !== -1) {
        employees[index] = { ...employees[index], ...updatedEmployee };
        localStorage.setItem('employees', JSON.stringify(employees));
        return employees[index];
      }
      return null;
    }
  };
  
  export default EmployeeAPI;