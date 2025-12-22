import React, { useState } from "react";
import api from "../../../api/axios";

function AddTenant({ onTenantAdded }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    unitNumber: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/api/users/create-profile", {
        role: "tenant",
        email: form.email,
        password: form.password || null,
        profile: {
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          unitNumber: form.unitNumber,
        },
      });

      if (onTenantAdded) {
        onTenantAdded(res.data.profile);
      }

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        unitNumber: "",
        password: "",
      });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create tenant");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Tenant</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
      <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
      <input name="unitNumber" placeholder="Unit Number" value={form.unitNumber} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password (leave blank to auto-generate)" value={form.password} onChange={handleChange} />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Add Tenant"}
      </button>
    </form>
  );
}

export default AddTenant;
