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

export const initialValues = {
  [name.name]: "",
  [address.name]: "",
  [phone.name]: "",
  [email.name]: "",
  [responsable.name]: "",
};

export const initialValuesFromObj = (obj) => {
  let resp = {
    [name.name]: obj.name,
    [address.name]: obj.address,
    [phone.name]: obj.phone,
    [email.name]: obj.email,
    [responsable.name]: obj.responsable,
  }
  return resp
}
