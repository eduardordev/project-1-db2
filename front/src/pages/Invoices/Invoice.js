import React, { useEffect, useState } from "react";
import { getInvoice } from '../../Services/ClientService.js';
import { Typography, Container, Paper, TextField, Button, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select'


const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

const InvoiceUpdate = (props) => {

  const { id } = useParams();
  const [invoiceData, setInvoiceData] = useState([]);

  useEffect(() => {
    getInvoice(id)
      .then((response) => {
        console.log(response.data)
        //setInvoiceData(response.data)
      }).catch((error) => {
        console.error(error);
      });
  }, [id]);

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

    //TODO: get File from  somewhere 
    /*
    if (hay archivo) {
    try {
          const file = await toBase64(file);
          formData.fel_pdf_doc = file
      } catch(error) {
          console.error(error);
      }
    }
    */



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
          {
            props.action === 'update' ? 
            <>
              Update Invoice
            </>
            :
            <>
              View Invoice
            </>
          }
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
