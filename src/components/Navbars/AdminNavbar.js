import React from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Container, Button } from "react-bootstrap";
import routes from "routes.js";

function Header() {
  const location = useLocation();

  const getCurrentRoute = () => {
    return routes.find((route) =>
      location.pathname.indexOf(route.layout + route.path) !== -1
    );
  };

  const handleLogout = () => {
    import("firebase/auth").then(({ getAuth, signOut }) => {
      const auth = getAuth();
      signOut(auth).then(() => {
        window.location.href = "/login";
      });
    });
  };

  const route = getCurrentRoute();
  const navbarType = route?.navbarType || "default";

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid className="justify-content-between align-items-center">
        <Navbar.Brand href="#home" onClick={(e) => e.preventDefault()}>
          {route?.name || "RidersApp"}
        </Navbar.Brand>

        {navbarType === "dashboard" && (
          <span className="text-muted">Benvenuto nella dashboard</span>
        )}

        {navbarType === "riders" && (
          <Button variant="success" size="sm">
            Aggiungi Rider
          </Button>
        )}

        <Button variant="outline-danger" onClick={handleLogout}>
          Logout
        </Button>
      </Container>
    </Navbar>
  );
}

export default Header;
