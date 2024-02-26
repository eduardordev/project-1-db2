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
    setUser(data.user_name);
    setRol(data.role)
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
          <Toolbar  sx={(theme) => navbarContainer(theme)}>
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
              {user || "USER"} - ({rolLabel || "Rol"})
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
        { (rol === 'A') && <Link to="/users" ><MenuItem >Administrar Usuarios</MenuItem></Link> }
        <MenuItem onClick={logOut}>Cerrar Sesion</MenuItem>
      </MenuM>
      <>
        <Sidenav
          color={sidenavColor}
          brand={
            (transparentSidenav && !darkMode) || whiteSidenav
              ? consertec
              : consertec
          }
          //brandName="CONSERTEC ADMIN" 
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

          { [ "A"].includes(rol) &&
            <Route path="/users" element={<Users />} />
          }
          { ![ "A"].includes(rol) &&
            <Route path="/users" element={<Error />} />
          }

          { [ "A", "U", "I"].includes(rol) &&
              <>
                <Route path="/inventory/main" element={<MainInventory />} />
                <Route path="/inventory/main/add" element={<CreateInventoryItem action="add"/>} />
                <Route path="/inventory/main/update/:id" element={<CreateInventoryItem action="update"/>} />
                <Route path="/inventory/main/view/:id" element={<CreateInventoryItem action="view"/>} />
                <Route path="/inventory/detail/add/:part" element={<InventoryDetail action="add" inventory/>} />
                <Route path="/inventory/detail/update/:id" element={<InventoryDetail action="update"/>} />
                <Route path="/inventory/detail/view/:id" element={<InventoryDetail action="view"/>} />
                <Route path="/inventory/quarantine/add" element={<InventoryDetail action="add" quarentine/>} />
                <Route path="/inventory/quarantine/update/:id" element={<InventoryDetail action="update"/>} />
                <Route path="/inventory/quarantine/view/:id" element={<InventoryDetail action="view"/>} />
                <Route path="/inventory/quarantine" element={<QuerantineInventory />} /> 
                <Route path="/inventory/repair" element={<RepairInventory />} /> 
                <Route path="/inventory/scrap" element={<ScrapInventory />} />
                <Route path="/inventory/missing_expitarion" element={<MissingExpiration />} />
                <Route path="/inventory/missing_expitarion/update/:id" element={<InventoryDetail action="update"/>} />
                <Route path="/inventory/missing_expitarion/view/:id" element={<InventoryDetail action="view"/>} />
                <Route path="/inventory/history" element={<History />} />
                <Route path="/inventory/general_search" element={<GeneralSearch />} />
              </>
          }
          { ![ "A", "U", "I"].includes(rol) &&
            <Route path="/inventory/*" element={<Error />} />
          }
          
          
          { ![ "A", "U", "S"].includes(rol) &&
            <Route path="/ships/*" element={<Error />} />
          }

          {[ "A", "U"].includes(rol) &&
            <>
              <Route path="/clients/list" element={<Clients />} />
              <Route path="/clients/create" element={<CreateClients action="add" />} />
              <Route path="/clients/update/:id" element={<CreateClients action="update" />}/>
              <Route path="/clients/view/:id"  element={<CreateClients action="view" />}/>
              <Route path="/providers/list" element={<Suppliers action="add" />}/>
              <Route path="/providers/add" element={<CreateSupplier action="add" />}/>
              <Route path="/providers/update/:id" element={<CreateSupplier action="update" />}/>
              <Route  path="/providers/view/:id" element={<CreateSupplier action="view" />}/>

              <Route path="/purchase_order/list" element={<PurchaseOrder />} />
              <Route path="/purchase_order/create" element={<CreatePurchaseOrder action="add" />} />
              <Route path="/purchase_order/update/:id" element={<CreatePurchaseOrder action="update" />} />
              <Route path="/purchase_order/view/:id" element={<CreatePurchaseOrder action="view" />} />
              <Route path="/purchase_order/detail/pending" element={<ReceivedList />} />
              <Route path="/purchase_order/detail/create/:id" element={<CreatePurchaseOrderDetail action="add" />} />
              <Route path="/purchase_order/detail/update/:po/:id" element={<CreatePurchaseOrderDetail action="update" />} />

              <Route path="/personnel/list" element={<Personnel />} />
              <Route path="/personnel/create" element={<CreatePersonnel />} />

        
            </>
          }
          {![ "A", "U"].includes(rol) &&
            <>
              <Route path="/clandsu/*" element={<Error />} />
              <Route path="/clients/*" element={<Error />} />
              <Route path="/suppliers/*" element={<Error />}/>

              <Route path="/purchase_order/*" element={<Error />} />

              <Route path="/invoice/*" element={<Error />} />

              <Route path="/estimation/*" element={<Error />} />

              <Route path="/task/*" element={<Error />} />
            </>
          }

        </Routes>
      </MDBox>

    </div>
  );
};

export default MainLayout;
