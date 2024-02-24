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
// nodejs library that concatenates classes
import classNames from "classnames";
import {Redirect} from "react-router-dom";
import './adminNav.css'

// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal
} from "reactstrap";

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      modalSearch: false,
      color: "navbar-transparent",
      logOut: false,
      name: '',
    };
  }

  role = localStorage.getItem('role') || '';
  user_name = localStorage.getItem('username') || '';
  
  _LogOutRedirect = <Redirect 
      to={{
        pathname: "/auth/login",
      }}
  />
  componentDidMount() {
    window.addEventListener("resize", this.updateColor);
    console.log(this.user_name)

    if (this.user_name !== '') {
      const name = this.user_name.split(' ');
      const first = name[0].split('')[0];
      const second = name[1].split('')[0];
      this.setState({
        name: first+second
      })
    } else if (this.role === ''){
      const name = []
      const first = name
      const second = name
      this.setState({
        name: first+second
      })
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateColor);
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: "bg-white"
      });
    } else {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };
  // this function opens and closes the collapse on small devices
  toggleCollapse = () => {
    if (this.state.collapseOpen) {
      this.setState({
        color: "navbar-transparent"
      });
    } else {
      this.setState({
        color: "bg-white"
      });
    }
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // this function is to open the Search modal
  toggleModalSearch = () => {
    this.setState({
      modalSearch: !this.state.modalSearch
    });
  };
  logOut = event => {
    event.preventDefault();
    localStorage.clear();
    this.setState({logOut: true});
  }
  render() {
    return (<>
      {this.state.logOut ? this._LogOutRedirect : ''}
      <Navbar
        className={classNames("navbar-absolute", {
          [this.state.color]:
            this.props.location.pathname.indexOf("full-screen-map") === -1
        })}
        expand="lg"
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-minimize d-inline">
              <Button
                className="minimize-sidebar btn-just-icon"
                color="link"
                onClick={this.props.handleMiniClick}
              >
                <i className="tim-icons icon-align-center visible-on-sidebar-regular" />
                <i className="tim-icons icon-bullet-list-67 visible-on-sidebar-mini" />
              </Button>
            </div>
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: this.props.sidebarOpened
              })}
            >
              <button
                className="navbar-toggler"
                type="button"
                onClick={this.props.toggleSidebar}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand href="#perry" onClick={e => e.preventDefault()}>
              {this.props.brandText}
            </NavbarBrand>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navigation"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </button>
          <Collapse navbar isOpen={this.state.collapseOpen}>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  nav
                  onClick={e => e.preventDefault()}
                >
                  <div className="photo">
                    <label htmlFor="">{this.state.name}</label>
                  </div>
                  <b className="caret d-none d-lg-block d-xl-block" />
                  <p className="d-lg-none">Log out</p>
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <NavLink tag="li">
                    <DropdownItem className="nav-item" onClick={this.logOut}>Log out</DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <Modal
        modalClassName="modal-search"
        isOpen={this.state.modalSearch}
        toggle={this.toggleModalSearch}
      >
        <div className="modal-header">
          <Input id="inlineFormInputGroup" placeholder="BUSCAR" type="text" />
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={this.toggleModalSearch}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </div>
      </Modal>
    </>);
  }
}

export default AdminNavbar;
