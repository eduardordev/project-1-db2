// validations.js
import * as Yup from "yup";
import form from "./form";

const {
  formField: {
    nit,
    name,
    date,
    infile_detail,
    total,
  },
} = form;

const validations = [
  Yup.object().shape({
    [nit.name]: Yup.string().required(nit.errorMsg),
    [name.name]: Yup.string().required(name.errorMsg),
    [date.name]: Yup.date().required("Campo requerido"),
    [infile_detail.name]: Yup.array().of(
      Yup.object().shape({
        producto: Yup.string().required("Campo requerido"),
        descripcion: Yup.string().required("Campo requerido"),
        detail_name: Yup.string().required("Campo requerido"),
        quantity: Yup.number().required("Campo requerido").positive("Debe ser un número positivo"),
        price: Yup.number().required("Campo requerido").positive("Debe ser un número positivo"),
      })
    ).required("Campo requerido"),
    [total.name]: Yup.number().required("Campo requerido").positive("Debe ser un número positivo"),
  }),
];

export default validations;
