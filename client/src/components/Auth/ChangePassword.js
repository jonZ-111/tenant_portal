import { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.put(
        "/auth/change-password",
        { newPassword },
        { withCredentials: true }
      );

      // Clear cached user info
      localStorage.removeItem("user");

      // Force fresh login
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Failed to update password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Change Your Password</h2>

        {error && <p className="text-danger">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>New Password</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
