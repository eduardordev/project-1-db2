import checkout from "./form";

const {
  formField: {
    nit,
    name,
    date,  // Agregamos el campo de fecha
    infile_detail,  // Agregamos el campo de infile_detail
    total,
  },
} = checkout;

export const initialValues = {
  [nit.name]: "",
  [name.name]: "",
  [date.name]: "",  // Aseguramos agregar el campo de fecha con un valor inicial adecuado
  [infile_detail.name]: [],  // Aseguramos que infile_detail sea un array vacío al inicio
  [total.name]: 0,  // Aseguramos que total sea 0 al inicio
};

export const initialValuesFromObj = (obj) => {
  let resp = {
    [nit.name]: obj.nit,
    [name.name]: obj.name,
    [date.name]: obj.date,
    [infile_detail.name]: obj.infile_detail,
    [total.name]: obj.total,
  
  };
  return resp;
}
