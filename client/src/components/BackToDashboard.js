import { useNavigate, useLocation } from "react-router-dom";

export default function BackToDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide button on main dashboard
  if (location.pathname === "/dashboard") return null;

  return (
    <button
      className="btn btn-outline-secondary mb-3"
      onClick={() => navigate("/dashboard")}
    >
      ← Back to Dashboard
    </button>
  );
}
