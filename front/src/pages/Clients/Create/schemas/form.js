/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

const form = {
  formId: "new-customer-form",
  formField: {
    name: {
      name: "name",
      label: "Nombre",
      type: "text",
      errorMsg: "Campo requerido",
    },
    address: {
      name: "address",
      label: "Direccion",
      type: "text",
      errorMsg: "Campo requerido",
    },
    phone: {
      name: "phone",
      label: "Telefono",
      type: "text",
      errorMsg: "Campo requerido",
    },
    email: {
      name: "email",
      label: "Correo",
      type: "text",
      errorMsg: "Campo requerido",
      invalidMsg: "Correo invalido",
    },
    responsable: {
      name: "responsable",
      label: "Responsable",
      type: "text",
      errorMsg: "Campo requerido",
    },
  },
};

export default form;
