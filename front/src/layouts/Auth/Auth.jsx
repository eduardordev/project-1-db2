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
import { Route, Switch } from "react-router-dom";

import Footer from "../../components/Footer/Footer.jsx";

import routes from "../../routes.js";

class Pages extends React.Component {
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  componentDidMount() {
    document.documentElement.classList.remove("nav-open");
  }

  render() {
    return (
      <>
        <div className="wrapper wrapper-full-page" ref="fullPages">
          <div className="full-page ">
            <Switch>{this.getRoutes(routes)}</Switch>
            <Footer fluid />
          </div>
        </div>
      </>
    );
  }
}

export default Pages;
