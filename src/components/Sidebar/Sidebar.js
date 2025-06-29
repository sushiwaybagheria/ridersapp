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
import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";

import logo from "assets/img/logo.png";







function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")"
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start" style={{ height: "120px", padding: "5px" }}>

          <a
            href="#"
            className="simple-text logo mx-1"
          >
            <div className="logo-img">
              <img
                src={require("assets/img/logo.png")}
                alt="RidersApp"
                style={{ width: "250px", height: "120px" }}
              />
            </div>
          </a>
        </div>

        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect)
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>

        {/* 🔴 Pulsante Logout */}
        <div className="mt-4 px-3">
          <button
            className="btn btn-danger btn-block"
            onClick={() => {
              import("firebase/auth").then(({ getAuth, signOut }) => {
                const auth = getAuth();
                signOut(auth).then(() => {
                  window.location.href = "/login";
                });
              });
            }}
          >
            Esci
          </button>
        </div>

      </div>
    </div>
  );
}

export default Sidebar;