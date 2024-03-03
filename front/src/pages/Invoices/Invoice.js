import React, { useEffect, useState } from "react";
import { getInvoice } from '../../Services/ClientService.js';
import { Typography, Container, Paper, TextField, Button, Snackbar } from "@mui/material";
import { Table, TableBody, TableCell, TableRow, TableContainer, TableHead } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select'
import { blue } from "@mui/material/colors";
import { productList } from './products.js'

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});
const getDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
  const day = today.getDate().toString().padStart(2, '0'); // Add leading zero if needed

  return `${year}-${month}-${day}`;
};

const InvoiceUpdate = (props) => {

  const { id } = useParams();
  const [invoiceData, setInvoiceData] = useState([]);
  const [invoiceDets, setInvoiceDets] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState('');
  const [nuevaDescripcion, setNuevaDescripcion] = useState('');
  const [nuevoDetalle, setNuevoDetalle] = useState('');
  const [nuevaCantidad, setNuevaCantidad] = useState(0);
  const [nuevoPrecio, setNuevoPrecio] = useState(0.0);
  const [date, setDate] = useState();



  useEffect(() => {
    console.log(productList)
    getInvoice(id)
      .then((response) => {
        console.log(response.data)
        setInvoiceData(response.data)
      }).catch((error) => {
        console.error(error);
      });
  }, [id]);

  const agregarDetalle = () => {
    const nuevoDetalle = {
      "producto": nuevoProducto,
      "descripcion": nuevaDescripcion,
      "detail_name": nuevoDetalle,
      "quantity": nuevaCantidad,
      "price": nuevoPrecio
    };

    setInvoiceDets(prevInvoiceDets => [...prevInvoiceDets, nuevoDetalle]);

  };

  const [formData, setFormData] = useState({
    invoiceId: '',
    nit: '',
    name: '',
    date: '',
    infile_detail: invoiceDets,
    total: '',
  });

  const customStyles = {
    control: base => ({
      ...base,
      width: 400,
    }),
  };

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
      const response = await axios.post(`http://127.0.0.1:8000/invoices/${formData.invoiceId}/update/`, formData, {
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
        {
          props.action === 'update' ?
            <>
              <Typography variant="h4" gutterBottom>
                Actualizar Factura
              </Typography>

              <form onSubmit={handleSubmit}>

                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                  <div>
                    <Typography variant="h6" align="left">
                      No. Factura: <span style={{ color: 'red' }}>{invoiceData.id}</span>
                    </Typography>
                    <br />

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
                  </div>
                  <div>
                    <TextField
                      label="Date"
                      name="date"
                      value={getDate()}
                      onChange={handleFormChange}
                      fullWidth
                      margin="normal"
                    />
                  </div>
                </div>

                <br />
                <hr />
                <br />

                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>

                  <Select
                    options={productList}
                    styles={customStyles}
                    onChange={(e) => {

                    }}
                  />

                  <Button
                    variant="contained"
                    color="info"
                    style={{ marginLeft: '1.5vh', backgroundColor: '#1e88e5', color: 'white' }}
                  >
                    Agregar Producto
                  </Button>
                </div>
                <br />
                <TableContainer>
                  <Table>
                    <thead>
                      <tr>
                        <th style={{ fontSize: "1rem", textAlign: 'left' }}>Producto</th>
                        <th style={{ fontSize: "1rem", textAlign: 'left' }}>Categoria</th>
                        <th style={{ fontSize: "1rem", textAlign: 'left' }}>Descripción</th>
                        <th style={{ fontSize: "1rem", textAlign: 'left' }}>Cantidad</th>
                        <th style={{ fontSize: "1rem", textAlign: 'left' }}>Precio</th>
                      </tr>
                    </thead>
                    <br />
                    <TableBody>
                      {productList.map((product, index) => (
                        <TableRow key={index}>
                          <TableCell>{product.label}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.descripcion}</TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>Q.{product.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <br />
                <hr />


                <Typography variant="h3" align="right">
                  Total: Q.{invoiceData.total}
                </Typography>

                <Button type="submit" variant="contained" color="secondary" style={{ marginTop: '20px', backgroundColor: '#4CAF50', color: 'white' }}>
                  Update Invoice
                </Button>
              </form>
            </>
            : props.action === 'view' ?
              <>
                <Typography variant="h4" gutterBottom>
                  Consulta de Factura
                </Typography>
                <br />

                <form onSubmit={handleSubmit}>

                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <div>

                      <Typography variant="h6" align="left">
                        No. Factura: <span style={{ color: 'red' }}>{invoiceData.id}</span>
                      </Typography>
                      <br />

                      <Typography variant="h6" align="left">
                        NIT: {invoiceData.nit}
                      </Typography>
                      <br />

                      <Typography variant="h6" align="left">
                        Nombre: {invoiceData.name}
                      </Typography>

                    </div>
                    <div>
                      <Typography variant="h6">
                        Fecha: {invoiceData.date}
                      </Typography>
                    </div>
                  </div>

                  <br />
                  <hr />
                  <br />


                  <TableContainer>
                    <Table>
                      <thead>
                        <tr>
                          <th style={{ fontSize: "1rem", textAlign: 'left' }}>Producto</th>
                          <th style={{ fontSize: "1rem", textAlign: 'left' }}>Categoria</th>
                          <th style={{ fontSize: "1rem", textAlign: 'left' }}>Descripción</th>
                          <th style={{ fontSize: "1rem", textAlign: 'left' }}>Cantidad</th>
                          <th style={{ fontSize: "1rem", textAlign: 'left' }}>Precio</th>
                        </tr>
                      </thead>
                      <br />
                      <TableBody>

                        {productList.map((product, index) => (
                          <TableRow key={index}>
                            <TableCell>{product.label}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.descripcion}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>Q.{product.value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>


                  <br />
                  <hr />
                  <br />


                  <Typography variant="h3" align="right">
                    Total: Q.{invoiceData.total}
                  </Typography>


                </form>
              </>
              :
              <>
                <Typography variant="h4" gutterBottom>
                  Crear Factura
                </Typography>

                <form onSubmit={handleSubmit}>

                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <div>

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
                    </div>
                    <div>
                      <TextField
                        label="Date"
                        name="date"
                        value={getDate()}
                        onChange={handleFormChange}
                        fullWidth
                        margin="normal"
                      />
                    </div>
                  </div>

                  <br />
                  <hr />
                  <br />

                  <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>

                    <Select
                      options={productList}
                      styles={customStyles}
                      onChange={(e) => {

                      }}
                    />

                    <Button
                      variant="contained"
                      color="info"
                      style={{ marginLeft: '1.5vh', backgroundColor: '#1e88e5', color: 'white' }}
                    >
                      Agregar Producto
                    </Button>
                  </div>
                  <br />

                  <TableContainer>
                    <Table>
                      <thead>
                        <tr>
                          <th style={{ fontSize: "1rem", textAlign: 'left' }}>Producto</th>
                          <th style={{ fontSize: "1rem", textAlign: 'left' }}>Categoria</th>
                          <th style={{ fontSize: "1rem", textAlign: 'left' }}>Descripción</th>
                          <th style={{ fontSize: "1rem", textAlign: 'left' }}>Cantidad</th>
                          <th style={{ fontSize: "1rem", textAlign: 'left' }}>Precio</th>
                        </tr>
                      </thead>
                      <br />
                      <TableBody>
                        {productList.map((product, index) => (
                          <TableRow key={index}>
                            <TableCell>{product.label}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.descripcion}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>Q.{product.value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>


                  <br />
                  <hr />


                  <Typography variant="h3" align="right">
                    Total: Q.{invoiceData.total}
                  </Typography>

                  <Button type="submit" variant="contained" color="secondary" style={{ marginTop: '20px', backgroundColor: '#4CAF50', color: 'white' }}>
                    Crear Factura
                  </Button>
                </form>
              </>
        }


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
