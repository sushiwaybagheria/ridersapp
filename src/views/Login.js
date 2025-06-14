import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // <-- cambia qui
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory(); // <-- cambia qui
  const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      history.push("/admin/dashboard"); // <-- cambia qui
    } catch (error) {
      alert("Login fallito: " + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Login Admin</h3>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="form-control mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Accedi</button>
      </form>
    </div>
  );
}

export default Login;
