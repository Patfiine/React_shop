import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

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
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400 }}>
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <Typography variant="h6">Client Form</Typography>

          <TextField
            label="Name"
            name="name"
            value={client.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />

          <TextField
            label="Surname"
            name="surname"
            value={client.surname}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />

          <TextField
            label="Phone"
            name="phone"
            value={client.phone}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />

          <Button type="submit" variant="contained">
            Add
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default Form;
