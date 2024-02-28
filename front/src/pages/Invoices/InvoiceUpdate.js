import React, { useState } from "react";
import { Typography, Container, Paper, TextField, Button, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

const InvoiceUpdate= () => {
  const [formData, setFormData] = useState({
    invoiceId: '',
    nit: '',
    name: '',
    date: '',
    producto: '',
    descripcion: '',
    detail_name: '',
    quantity: '',
    price: '',
    total: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://127.0.0.1:8000/invoices/${formData.invoiceId}/update/`, formData,{
          headers: {
    'Content-Type': 'application/json',
  },
      });
      setSnackbarMessage(response.data.message);
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Error updating invoice');
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Update Invoice
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Invoice ID input */}
          <TextField
            label="Invoice ID"
            name="invoiceId"
            value={formData.invoiceId}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />

          {/* Other input fields */}
          <TextField
            label="Nit"
            name="nit"
            value={formData.nit}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date"
            name="date"
            value={formData.date}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Producto"
            name="producto"
            value={formData.producto}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Detail Name"
            name="detail_name"
            value={formData.detail_name}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Total"
            name="total"
            value={formData.total}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />

<Button type="submit" variant="contained" color="secondary" style={{ marginTop: '20px', backgroundColor: '#4CAF50', color: 'white' }}>
            Update Invoice
          </Button>
        </form>
      </Paper>

      {/* Snackbar for displaying messages */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default InvoiceUpdate;
