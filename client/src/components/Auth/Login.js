import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
        const res = await axios.post(
            "http://localhost:3001/auth/login",
            { email, password },
            { withCredentials: true }   // cookie auth
        );

      // Store token
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect after successful login
       if (
          res.data.user.role === "tenant" &&
          res.data.user.mustChangePassword
          ) {
          navigate("/change-password");
        } else {
          if (res.data.user.role === "admin") {
            navigate("/dashboard");
        } else {
            navigate("/tenant/dashboard");
          }
        }  

    }catch (err) {
        console.error(err);
        setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card shadow p-4">
          <header className="login-header">
            <h1>UIME Administrative Portal</h1>
            <p>Secure Clinic Administration System</p>
          </header>

        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

