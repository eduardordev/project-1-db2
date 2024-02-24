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
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import AdminNavbar from "../../components/Navbars/AdminNavbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import FixedPlugin from "../../components/FixedPlugin/FixedPlugin.jsx";

import routes from "../../routes.js";

import logo from "../../assets/img/default-avatar.png";

//import Roles from "../../helpers/localRoles.json";
//import {GetlocalAccesses} from "../../helpers/Access.js";
var ps;

class Admin extends React.Component {

  _isMounted = false;
  _Routes = [];

  constructor(props) {
    super(props);
    this.state = {
      activeColor: "primary",
      sidebarMini: true,
      opacity: 0,
      sidebarOpened: false
    };
  }
  role = localStorage.getItem('role') || '';
  access = JSON.parse(localStorage.getItem('permissions')) || ''; 
  views = localStorage.getItem('views') || ''; 
  viewsArray = [];
  _id = localStorage.getItem('_id') || '0';
  username = localStorage.getItem('username') || '';
 
  

  /*checkRoutePremision = routes  => {
    const newRoutes = routes.filter(prop => prop.layout === "/admin" && this.viewsArray.includes(prop.path)) 
    return newRoutes
  }*/

  assembleNewRoutes = (routes) => {
    let newRoutes = [];
    routes.map((prop) => {
      if (prop.collapse) {
        let subRoutes = this.assembleNewRoutes(prop.views);
        let collapse = prop;
        if(subRoutes.length>0) {
          collapse.views=subRoutes;
          newRoutes.push(collapse);
        }
      }
      if (prop.layout === "/admin" && this.viewsArray.includes(prop.path)) {
        if(prop.collapse){
          if(prop.views.length>0){
            newRoutes.push(prop);
          }
        }else{
          newRoutes.push(prop)
        }
      }
      return 1;
    });
    return newRoutes;
  }

  componentDidMount() {
    this._isMounted = true;
    localStorage.setItem('Access', JSON.stringify(this.access));
    this.viewsArray = this.views.split(',');
    this._Routes = this.assembleNewRoutes (routes);
    console.log('rutas', routes)


    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel);
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    window.addEventListener("scroll", this.showNavbarButton);
  }
  componentWillUnmount() {
    this._isMounted = false;
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
    window.removeEventListener("scroll", this.showNavbarButton);
  }
  componentDidUpdate(e) {
    localStorage.setItem('Access', JSON.stringify(this.access));
    this.viewsArray = this.views.split(',');
    if (e.location.pathname !== e.history.location.pathname) {
      if (navigator.platform.indexOf("Win") > -1) {
        let tables = document.querySelectorAll(".table-responsive");
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  showNavbarButton = () => {
    if (
      document.documentElement.scrollTop > 50 ||
      document.scrollingElement.scrollTop > 50 ||
      this.refs.mainPanel.scrollTop > 50
    ) {
      this._isMounted && this.setState({ opacity: 1 });
    } else if (
      document.documentElement.scrollTop <= 50 ||
      document.scrollingElement.scrollTop <= 50 ||
      this.refs.mainPanel.scrollTop <= 50
    ) {
      this._isMounted && this.setState({ opacity: 0 });
    }
  };
  getRoutes = routes => {
    let newRoutes=[];
    routes.map((prop, key) => {
      if (prop.collapse) {
        if(prop.views.length>0){
          newRoutes=[...newRoutes,this.getRoutes(prop.views)];
        }
      }
      if (prop.layout === "/admin" && this.viewsArray.includes(prop.path)) {
        if('views' in prop){
          if(prop.views.length>0){
            newRoutes.push(
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          }
        }else{
          newRoutes.push(
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        }
      }
      return prop;
    });
    return newRoutes;
  };
  getActiveRoute = routes => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = this.getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.pathname.indexOf (
            routes[i].layout + routes[i].path
          ) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  handleActiveClick = color => {
    this._isMounted && this.setState({ activeColor: color });
  };
  handleMiniClick = () => {
    if (document.body.classList.contains("sidebar-mini")) {
      this._isMounted && this.setState({ sidebarMini: false });
    } else {
      this._isMounted && this.setState({ sidebarMini: true });
    }
    document.body.classList.toggle("sidebar-mini");
  };
  toggleSidebar = () => {
    this._isMounted && this.setState({
      sidebarOpened: !this.state.sidebarOpened
    });
    document.documentElement.classList.toggle("nav-open");
  };
  closeSidebar = () => {
    this._isMounted && this.setState({
      sidebarOpened: false
    });
    document.documentElement.classList.remove("nav-open");
  };
  render() {
    return (
      <div className="wrapper">
        <div
          className="navbar-minimize-fixed"
          style={{ opacity: this.state.opacity }}
        >
          <button
            className="minimize-sidebar btn btn-link btn-just-icon"
            onClick={this.handleMiniClick}
          >
            <i className="tim-icons icon-align-center visible-on-sidebar-regular text-muted" />
            <i className="tim-icons icon-bullet-list-67 visible-on-sidebar-mini text-muted" />
          </button>
        </div>
        <Sidebar
          {...this.props}
          routes={this._Routes}
          activeViews={this.viewsArray}
          activeColor={this.state.activeColor}
          logo={{
            outterLink: "/admin/home",
            text: this.user_name,
            imgSrc: logo
          }}
          closeSidebar={this.closeSidebar}
          className="sideb"
        />
        <div
          className="main-panel"
          ref="mainPanel"
          data={this.state.activeColor}
        >
          <AdminNavbar
            {...this.props}
            handleMiniClick={this.handleMiniClick}
            brandText={this.getActiveRoute(this._Routes)}
            sidebarOpened={this.state.sidebarOpened}
            toggleSidebar={this.toggleSidebar}
            className="adminNav"
          />
          <Switch>{this.getRoutes(this._Routes)}</Switch>
          {// we don't want the Footer to be rendered on full screen maps page
          this.props.location.pathname.indexOf("full-screen-map") !==
          -1 ? null : (
            <Footer fluid />
          )}
        </div>
        <FixedPlugin
          activeColor={this.state.activeColor}
          sidebarMini={this.state.sidebarMini}
          handleActiveClick={this.handleActiveClick}
          handleMiniClick={this.handleMiniClick}
        />
      </div>
    );
  }
}

export default Admin;
