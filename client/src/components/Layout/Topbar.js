import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function Topbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/auth/me", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <nav className="navbar navbar-light bg-light px-4 shadow-sm">
      <span className="navbar-brand mb-0 h5">UIME CONNECT</span>

      <div>
        <span className="me-3">
          Welcome, {user ? user.name || user.email : "User"}
        </span>
      </div>
    </nav>
  );
}
