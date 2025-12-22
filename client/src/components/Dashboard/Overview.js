import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "./overview.css";

export default function Overview() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalTenants: 0,
    activeLeases: 0,
    paymentsThisMonth: 0,
    openTickets: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/dashboard/stats", {
          withCredentials: true,
        });
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-4">Loading dashboard...</div>;
  }

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Dashboard Overview</h2>

      {/* STATS CARDS */}
      <div className="row g-4">
        <div className="col-md-3">
          <div className="card p-3 shadow-sm text-center h-100">
            <h6 className="text-muted">👥 Total Tenants</h6>
            <h2 className="fw-bold mt-2">{stats.totalTenants}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm text-center h-100">
            <h6 className="text-muted">📄 Active Leases</h6>
            <h2 className="fw-bold mt-2">{stats.activeLeases}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm text-center h-100">
            <h6 className="text-muted">💰 Payments This Month</h6>
            <h2 className="fw-bold mt-2 text-success">
              ${stats.paymentsThisMonth.toLocaleString()}
            </h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm text-center h-100">
            <h6 className="text-muted">🛠 Open Tickets</h6>
            <h2 className="fw-bold mt-2">{stats.openTickets}</h2>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <hr className="my-4" />

      <h5 className="mb-3">Quick Actions</h5>

      <div className="d-flex flex-wrap gap-2">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/tenants")}
        >
          Manage Tenants
        </button>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/leases")}
        >
          Manage Leases
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/payments")}
        >
          View Payments
        </button>
      </div>
    </div>
  );
}

