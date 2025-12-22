import { useEffect } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await axios.post("/auth/logout", {}, { withCredentials: true });
      } catch (err) {
        console.error("Logout error:", err);
      } finally {
        navigate("/", { replace: true }); // Redirect to login
      }
    };

    doLogout();
  }, [navigate]);

  return <div>Logging out...</div>;
}
