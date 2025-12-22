import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000" // JSON Server
});

const EmployeeAPI = {
  all: () => api.get("/employees").then(res => res.data),
  add: (employee) => api.post("/employees", employee).then(res => res.data),
  update: (id, employee) => api.put(`/employees/${id}`, employee).then(res => res.data),
  delete: (id) => api.delete(`/employees/${id}`).then(res => res.data)
};

export default EmployeeAPI;
