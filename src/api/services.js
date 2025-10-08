
const EmployeeAPI = {
    employees: [
      { number: 1, name: "Ben Ghost", job: "Teacher" },
      { number: 2, name: "Yui Shami", job: "Student" },
      { number: 3, name: "Man Manui", job: "Teacher" },
      { number: 4, name: "Ted Groy", job: "Student" },
      { number: 5, name: "Most Erich", job: "Student" },
      { number: 6, name: "Igor Greg", job: "Rector" },
    ],
  
    //  Получить всех сотрудников
    all: function () {
      return this.employees;
    },
  
    //  Найти сотрудника по ID
    get: function (id) {
      return this.employees.find((p) => p.number === id);
    },
  
    //  Удалить сотрудника по ID
    delete: function (id) {
      this.employees = this.employees.filter((p) => p.number !== id);
    },
  
    //  Добавить нового сотрудника
    add: function (employee) {
      this.employees.push(employee); // push добавляет в конец массива
      return employee;
    },
  
    //  Обновить данные сотрудника
    update: function (employee) {
      const index = this.employees.findIndex((p) => p.number === employee.number);
      if (index !== -1) {
        this.employees[index] = employee; // заменяем по индексу
      }
      return employee;
    },
  };
  
  export default EmployeeAPI;
  