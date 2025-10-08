import React from "react";
import { useState } from "react";

const Form = ({ handleSubmit, inClient }) => {
    const [client, setClient] = useState(inClient);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setClient({ ...client, [name]: value });
    };
  
    const onSubmit = (event) => {
      event.preventDefault();
      handleSubmit(client);
      setClient(inClient);
    };
  
    return (
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={client.name}
          onChange={handleChange}
        />
        <label htmlFor="surname">Surname</label>
        <input
          type="text"
          name="surname"
          value={client.surname}
          onChange={handleChange}
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          name="phone"
          value={client.phone}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
    );
  };
  
  export default Form;