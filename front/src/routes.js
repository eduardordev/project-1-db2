/*!

=========================================================
* Black Dashboard React v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/* eslint-disable no-unused-vars*/
import Home from "./views/Home.jsx";
import Login from "./views/Login.jsx";
import RecoverPassword from "./views/RecoverPassword";
import Infiles from "./views/Infiles.jsx";
import InfilesCreator from "./views/InfilesCreator.jsx";



var routes = [
  {
    path: "/login",
    name: "Log in",
    icon: "tim-icons icon-bank",
    component: Login,
    layout: "/auth",
    invisible: true,
  },
  {
    path: "/recover",
    name: "Recover Password",
    icon: "tim-icons icon-bank",
    component: RecoverPassword,
    layout: "/auth",
    invisible: true,
  },
  {
    path: "/home",
    name: "Home",
    icon: "tim-icons icon-bank",
    component: Home,
    layout: "/admin",
  },

  
  

  {
    collapse: true,
    name: "FACTURAS",
    icon: "tim-icons icon-align-center",
    state: "pagesCollapseInfile",
    views: [
      {
        path: "/infile_list",
        name: "Listado de Facturas",
        component: Infiles,
        mini: "TD",
        layout: "/admin",
      },
      {
        path: "/infile",
        name: "Crear Factura",
        component: InfilesCreator,
        mini: "TD",
        layout: "/admin",
      },
    ],
  },  
  
  
];
export default routes;
