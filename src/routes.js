/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import Dashboard from "views/Dashboard.js";
import Orders from "views/Orders.js";
import TableList from "views/TableList.js";
import Notifications from "views/Notifications.js";
import Maps from "views/Maps.js";
import RiderForm from "views/RiderForm.js";
import OrderForm from "views/OrderForm.js";
import SetupPage from "views/SetupPage";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
    navbarType: "dashboard"
  },
  {
    path: "/table",
    name: "Gestione Riders",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin",
    navbarType: "riders"
  },
  {
    path: "/orders",
    name: "Ordini",
    icon: "nc-icon nc-delivery-fast",
    component: Orders,
    layout: "/admin",
    navbarType: "orders"
  },
  {
    path: "/notifications",
    name: "Notifiche",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Statistiche Consegne",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/rider-form",
    name: "Nuovo Rider",
    icon: "nc-icon nc-simple-add",
    component: RiderForm,
    layout: "/admin",
    invisible: true
  },

{
  path: "/rider-form/:id",
  name: "Modifica Rider",
  icon: "nc-icon nc-ruler-pencil",
  component: RiderForm,
  layout: "/admin",
  invisible: true
},

{
  path: "/order-form",
  name: "Nuovo Ordine",
  icon: "nc-icon nc-simple-add",
  component: OrderForm,
  layout: "/admin",
  invisible: true, // Non compare nel menu
  navbarType: "order-form"
},


{
  path: "/setup",
  name: "Setup",
  icon: "nc-icon nc-settings-gear-65",
  component: SetupPage,
  layout: "/admin",
  navbarType: "setup"
}


];

export default dashboardRoutes;
