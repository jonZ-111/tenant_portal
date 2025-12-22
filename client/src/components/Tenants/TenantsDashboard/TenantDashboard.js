import { useEffect, useState } from "react";
import api from "../../../api/axios";
import BackToDashboard from "../../BackToDashboard";

export default function TenantDashboard() {
  const [lease, setLease] = useState(null);
  const [loadingLease, setLoadingLease] = useState(true);
  const [message, setMessage] = useState("");
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchMyLease();
    fetchAnnouncements();
  }, []);

  const fetchMyLease = async () => {
    try {
      const res = await api.get("/api/leases/my");
      setLease(res.data);
    } catch (err) {
      setLease(null);
    } finally {
      setLoadingLease(false);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await api.get("/api/announcements");
      setAnnouncements(res.data);
    } catch (err) {
      console.error("Failed to load announcements");
    }
  };

  const acceptLease = async () => {
    try {
      await api.put("/api/leases/my/accept");
      fetchMyLease();
    } catch {
      alert("Failed to accept lease");
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    alert("Message sent (placeholder)");
    setMessage("");
  };

  const logout = async () => {
    await api.post("/auth/logout");
    window.location.href = "/";
  };

  return (
    <div className="page-wrapper">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <BackToDashboard />
        <button onClick={logout} className="danger">
          Logout
        </button>
      </div>

      <h1>Welcome Tenant</h1>

      {/* MY LEASE */}
      <div className="card">
        <h3>My Lease</h3>

        {loadingLease ? (
          <p>Loading lease...</p>
        ) : !lease ? (
          <p>No lease information available at this time.</p>
        ) : (
          <>
            <p><strong>Unit:</strong> {lease.unitNumber || lease.unit}</p>
            <p><strong>Start:</strong> {lease.startDate}</p>
            <p><strong>End:</strong> {lease.endDate}</p>
            <p><strong>Rent:</strong> ${lease.rentAmount}</p>
            <p><strong>Status:</strong> {lease.status}</p>

            {lease.status === "pending" && (
              <button onClick={acceptLease} className="primary">
                Accept Lease
              </button>
            )}
          </>
        )}
      </div>

      {/* MESSAGE ADMIN */}
      <div className="card">
        <h3>Message Administration</h3>
        <textarea
          placeholder="Write a message to the administration..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
        />
        <button onClick={sendMessage} className="primary">
          Send Message
        </button>
      </div>

      {/* ANNOUNCEMENTS */}
      <div className="card">
        <h3>Announcements</h3>

        {announcements.length === 0 ? (
          <p>No announcements</p>
        ) : (
          announcements.map((a) => (
            <div key={a.id} className="announcement">
              <strong>{a.title}</strong>
              <p>{a.content}</p>
              <small>{new Date(a.createdAt).toLocaleDateString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}




