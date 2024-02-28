import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";


import CreateClients from "../Clients/Create/";
import Menu from "../Menu";

import CreateSupplier from "../suppliers/Create";
import Clients from "../ClientsAndSuppliers";
import Personnel from "../Personnel";
import Users from "../Users";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import MenuM from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";


// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
} from "./styles";

// Material Dashboard 2 PRO React components
import MDBox from "../../components/MDBox";

import {
  useMaterialUIController,
  setMiniSidenav,
} from "../../context";

import Sidenav from "../../module/common/Sidenav";
import routes from "../../module/common/routes/routes";

import brandWhite from "../../assets/images/logo-ct.png";
import brandDark from "../../assets/images/logo-ct-dark.png";
import consertec from "../../assets/images/consertec.png";

import { getSessionData, signOut, getRolLabel } from "../../Services/authService";
import MainInventory from "../Inventory/MainInventory";
import CreateInventoryItem from "../Inventory/MainInventory/CreateInventoryItem"
import QuerantineInventory from "../Inventory/QuerantineInventory";
import RepairInventory from "../Inventory/RepairInventory";
import ScrapInventory from "../Inventory/ScrapInventory";
import MissingExpiration from "../Inventory/MissingExpiration/MissingExpiration";
import InventoryDetail from "../Inventory/MainInventory/InventoryDetail";
import GeneralSearch from "../GeneralSearch";

import History from "../History";

import PurchaseOrder from "../PurchaseOrder"
import CreatePurchaseOrder from "../PurchaseOrder/CreatePurchaseOrder";
import CreatePurchaseOrderDetail from "../PurchaseOrder/CreatePurchaseOrderDetail";
import ReceivedList from "../PurchaseOrder/ReceivedList";

import Error from "../Error"

import StaffManager from "../Staff/ListStaff/StaffManager";

import Suppliers from "../ClientsAndSuppliers/index1";
import CreatePersonnel from "../Personnel/Create/index";
import Charts from "../Charts/Charts";
import Invoice from "../Invoices/InvoiceUpdate";
import InvoiceUpdate from "../Invoices/InvoiceUpdate";
import InvoiceDelete from "../Invoices/InvoiceDelete";

const MainLayout = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState("");
  const [rol, setRol] = useState()
  const [rolLabel, setRolLabel] = useState()
  const [controller, dispatch] = useMaterialUIController();
  const [onMouseEnter, setOnMouseEnter] = useState(false);

  const {
    miniSidenav,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
    transparentNavbar,
  } = controller;

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    signOut();
    setAnchorEl(null);
    window.location.replace("/");
  };


  const getUserData = () => {
    let data = getSessionData();
    setUser(data.username);
    
    setRolLabel(getRolLabel(data.role))
    console.log(data)
  };

  useEffect(() => {
    getUserData();
  });

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  return (
    <div className="main-layout">
      <AppBar position="absolute" color="inherit"
        sx={(theme) => navbar(theme, { transparentNavbar, darkMode })}>
        <Toolbar sx={(theme) => navbarContainer(theme)}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

          </Typography>
          <Button
            startIcon={<AccountCircleIcon />}
            color="inherit"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {user || "USER"}
          </Button>
        </Toolbar>
      </AppBar>

      <MenuM
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {(rol === 'A') && <Link to="/users" ><MenuItem >Administrar Usuarios</MenuItem></Link>}
        <MenuItem onClick={logOut}>Cerrar Sesion</MenuItem>
      </MenuM>
      <>
        <Sidenav
          color={sidenavColor}
          // brand={
          //   (transparentSidenav && !darkMode) || whiteSidenav
          //     ? consertec
          //     : consertec
          // }
          brandName="Facturacion App"
          routes={routes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
      </>
      <MDBox sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,
        position: "relative",

        [breakpoints.up("xl")]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}>
        <Routes>
          <Route path="/*" element={<Menu />} />

          
            <Route path="/users" element={<Users />} />
            <Route path="/invoices/list/VIG" element={<Clients sts="VIG" />}  />
            <Route path="/invoices/list/ANU" element={<Clients sts="ANU" />} />
            <Route path="/invoice/create/" element={<CreateClients action="add" />} />
            <Route path="/charts/view/" element={<Charts action="view" />} />
            <Route path="/invoices/update/:id" element={<InvoiceUpdate action="update" />} />
            <Route path="/invoices/delete/:id" element={<InvoiceDelete action="delete" />} />
            <Route path="/invoices/view/:id" element={<InvoiceUpdate action="view" />} />
            


        </Routes>
      </MDBox>

    </div>
  );
};

export default MainLayout;
