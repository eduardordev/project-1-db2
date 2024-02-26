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

import * as Yup from "yup";
import checkout from "./form";

const {
  formField: {
    name,
    address,
    phone,
    email,
    responsable,
    },
} = checkout;

const validations = [
  Yup.object().shape({
    [name.name]: Yup.string().required(name.errorMsg),
    [phone.name]: Yup.string().required(phone.errorMsg),
    [email.name]: Yup.string().required(email.errorMsg).email(email.invalidMsg),
    [address.name]: Yup.string().required(address.errorMsg),
    [responsable.name]: Yup.string().required(responsable.errorMsg),
  }),
];

export default validations;
