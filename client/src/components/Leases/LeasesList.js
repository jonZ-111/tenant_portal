import { useEffect, useState } from "react";
import api from "../../api/axios";
import AddLease from "./AddLease";
import "./Leases.css";
import BackToDashboard from "../BackToDashboard";

export default function LeasesList() {
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeases();
  }, []);

  const fetchLeases = async () => {
    try {
      const res = await api.get("/api/leases");
      setLeases(res.data);
    } catch (err) {
      console.error("Failed to load leases", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <BackToDashboard />
      <h2>Leases List</h2>

      <AddLease onLeaseAdded={fetchLeases} />

      <div className="table-wrapper">
        {loading ? (
          <p>Loading leases...</p>
        ) : leases.length === 0 ? (
          <div className="empty-card">No leases found</div>
        ) : (
          <table className="leases-table">
            <thead>
              <tr>
                <th>Tenant</th>
                <th>Unit</th>
                <th>Start</th>
                <th>End</th>
                <th>Rent</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leases.map((lease) => (
                <tr key={lease.id}>
                  <td>
                    {lease.tenant
                      ? `${lease.tenant.firstName} ${lease.tenant.lastName}`
                      : "—"}
                  </td>
                  <td>{lease.unitNumber || "—"}</td>
                  <td>{lease.startDate}</td>
                  <td>{lease.endDate}</td>
                  <td>${lease.rentAmount}</td>
                  <td>
                    <span className={`status ${lease.status}`}>
                      {lease.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

