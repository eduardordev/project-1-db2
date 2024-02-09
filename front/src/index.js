/*!

=========================================================
* Black Dashboard PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "./layouts/Auth/Auth.jsx";
import AdminLayout from "./layouts/Admin/Admin.jsx";

import "./assets/css/nucleo-icons.css";
import "./assets/scss/black-dashboard-pro-react.scss?v=1.0.0";
import "./assets/demo/demo.css";
import "react-notification-alert/dist/animate.css";
import "react-datetime/css/react-datetime.css";
import "./assets/css/nucleo-icons.css";
import "./assets/scss/black-dashboard-pro-react.scss?v=1.1.0";
import "./assets/demo/demo.css";
import "./assets/css/nucleo-icons.css";
import 'react-perfect-scrollbar/dist/css/styles.css';
import "./assets/scss/black-dashboard-pro-react.scss?v=1.0.0";
import "./assets/demo/demo.css";



const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Redirect from="/" to="/admin/home" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
