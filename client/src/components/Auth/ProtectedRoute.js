import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "../../api/axios";

export default function ProtectedRoute({ children, role }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const validate = async () => {
      try {
        const res = await axios.get("/auth/validate", {
          withCredentials: true,
        });

        setAuthenticated(true);
        setUser(res.data.user);

      } catch (err) {
        setAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    validate();
  }, []);

  if (loading) return <div>Loading...</div>;

  // Not logged in
  if (!authenticated) return <Navigate to="/" replace />;

  // Tenant must change password
  if (
    user?.role === "tenant" &&
    user?.mustChangePassword
  ) {
    return <Navigate to="/change-password" replace />;
  }

  // Role-based access
  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
