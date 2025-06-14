import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/Admin.js";
import Login from "views/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const root = ReactDOM.createRoot(document.getElementById("root"));

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="text-center mt-5">Caricamento...</div>;

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        {user ? (
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        ) : (
          <Redirect to="/login" />
        )}
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </BrowserRouter>
  );
}

root.render(<App />);
