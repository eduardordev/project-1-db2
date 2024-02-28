// form.js
const form = {
  formId: "new-invoice-form",
  formField: {
    nit: {
      name: "nit",
      label: "NIT",
      type: "text",
      errorMsg: "Campo requerido",
    },
    name: {
      name: "name",
      label: "Nombre",
      type: "text",
      errorMsg: "Campo requerido",
    },
    date: {
      name: "date",
      label: "Fecha",
      type: "date",
      errorMsg: "Campo requerido",
    },
    infile_detail: {
      name: "infile_detail",
      label: "Detalle de factura",
      type: "select",
      options: [
        { value: "Producto1", label: "Producto1" },
        { value: "Producto2", label: "Producto2" },
        // Agrega más opciones según tus necesidades
      ],
      errorMsg: "Campo requerido",
    },
    total: {
      name: "total",
      label: "Total",
      type: "number",
      errorMsg: "Campo requerido",
    },
    
  },
};

export default form;
