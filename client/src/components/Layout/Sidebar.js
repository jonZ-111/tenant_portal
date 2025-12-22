import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar bg-dark text-white p-3" style={{ height: "100vh", width: "250px" }}>
      <h4 className="mb-4">Administrative Bar </h4>

      <ul className="nav flex-column">
        <li className="nav-item"><Link className="nav-link text-white" to="/tenants">Tenants</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/leases">Leases</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/payments">Payments</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/maintenance">Maintenance</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/staff">Staff</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/announcements">Announcements</Link></li>
        <li className="nav-item mt-3"><Link className="nav-link text-danger" to="/logout">Logout</Link></li>
      </ul>
    </div>
  );
}
