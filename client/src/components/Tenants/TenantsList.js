import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./TenantsList.css";
import BackToDashboard from "../BackToDashboard";

export default function TenantsList() {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    unitNumber: "",
    password: "",
  });

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const res = await api.get("/api/tenants");
      setTenants(res.data);
    } catch (err) {
      console.error("Failed to fetch tenants", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTenant = async (e) => {
    e.preventDefault();
    setGeneratedPassword(null);

    try {
      const res = await api.post("/api/users/create-profile", {
        role: "tenant",
        email: formData.email,
        password: formData.password || null,
        profile: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          unitNumber: formData.unitNumber,
        },
      });

      // SHOW TEMP PASSWORD ONCE
      if (res.data.tempPassword) {
        setGeneratedPassword(res.data.tempPassword);
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        unitNumber: "",
        password: "",
      });

      fetchTenants();
    } catch (err) {
      console.error("Failed to add tenant", err);
      alert(err.response?.data?.message || "Failed to add tenant");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this tenant?")) return;

    try {
      await api.delete(`/api/tenants/${id}`);
      fetchTenants();
    } catch (err) {
      console.error("Failed to delete tenant", err);
    }
  };

  return (
    <div className="tenants-page">
      <BackToDashboard />
      <h1>Tenants</h1>

      {/* TEMP PASSWORD DISPLAY */}
      {generatedPassword && (
        <div
          style={{
            margin: "16px 0",
            padding: "12px",
            border: "1px solid #28a745",
            background: "#eafaf1",
            borderRadius: "6px",
          }}
        >
          <strong>Temporary Password:</strong>{" "}
          <code>{generatedPassword}</code>
          <p style={{ marginTop: "6px", fontSize: "14px" }}>
            This password is shown only once. Share it securely with the tenant.
          </p>
        </div>
      )}

      {/* ADD TENANT FORM */}
      <form className="add-tenant-form" onSubmit={handleAddTenant}>
        <h2>Add Tenant</h2>

        <input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          name="unitNumber"
          placeholder="Unit Number"
          value={formData.unitNumber}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password (leave blank to auto-generate)"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Add Tenant</button>
      </form>

      {/* TENANTS TABLE */}
      {loading ? (
        <p>Loading...</p>
      ) : tenants.length === 0 ? (
        <p>No tenants found</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Unit</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {tenants.map((tenant) => (
                <tr key={tenant.id}>
                  <td>
                    {tenant.firstName} {tenant.lastName}
                  </td>
                  <td>{tenant.email}</td>
                  <td>{tenant.phone || "-"}</td>
                  <td>{tenant.unitNumber || "-"}</td>
                  <td>{tenant.status}</td>
                  <td>
                    <button
                      className="danger"
                      onClick={() => handleDelete(tenant.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}






