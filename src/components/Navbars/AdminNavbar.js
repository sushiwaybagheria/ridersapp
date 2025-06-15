import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Navbar, Container, Button } from "react-bootstrap";
import routes from "routes.js";


function Header() {
  const location = useLocation();

  const getCurrentRoute = () => {
    return routes.find((route) =>
      location.pathname.indexOf(route.layout + route.path) !== -1
    );
  };

  const route = getCurrentRoute();
  const navbarType = route?.navbarType || "default";
const history = useHistory();

  const handleLogout = () => {
    import("firebase/auth").then(({ getAuth, signOut }) => {
      const auth = getAuth();
      signOut(auth).then(() => {
        window.location.href = "/login";
      });
    });
  };

  const handleAddRider = () => {
history.push("/admin/rider-form");
};

const handleAddOrder = () => {
  history.push("/admin/order-form");
};


  return (
    <Navbar bg="light" expand="lg">
      <Container fluid className="d-flex justify-content-between align-items-center">
        <Navbar.Brand href="#" onClick={(e) => e.preventDefault()}>
          {route?.name || "RidersApp"}
        </Navbar.Brand>

        {navbarType === "riders" && (
          <Button variant="success" size="sm" onClick={handleAddRider}>
            + Aggiungi Rider
          </Button>
        )}

{navbarType === "orders" && (
  <Button variant="primary" size="sm" onClick={handleAddOrder}>
    + Aggiungi Ordine
  </Button>
)}


        <Button variant="outline-danger" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </Container>
    </Navbar>
  );
}

export default Header;
