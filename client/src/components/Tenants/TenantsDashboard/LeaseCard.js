import axios from "axios";

export default function LeaseCard({ lease }) {
  const handleAccept = async () => {
    try {
      await axios.put(
        "http://localhost:3001/api/leases/my/accept",
        {},
        { withCredentials: true }
      );

      window.location.reload(); // simple + reliable for now
    } catch (err) {
      console.error("Failed to accept lease", err);
    }
  };

  return (
    <div className="card">
      <h2>Lease Details</h2>

      <p><strong>Unit:</strong> {lease.unitNumber}</p>
      <p><strong>Start Date:</strong> {new Date(lease.startDate).toLocaleDateString()}</p>
      <p><strong>End Date:</strong> {new Date(lease.endDate).toLocaleDateString()}</p>
      <p><strong>Rent Amount:</strong> ${lease.rentAmount}</p>
      <p><strong>Rent Due Day:</strong> {lease.rentDueDay}</p>

      <p>
        <strong>Status:</strong>{" "}
        <span className={`status ${lease.status}`}>
          {lease.status}
        </span>
      </p>

      {lease.status === "pending" && (
        <>
          <p style={{ color: "orange" }}>
            Your lease is pending acceptance.
          </p>
          <button onClick={handleAccept}>
            Accept Lease
          </button>
        </>
      )}
    </div>
  );
}

