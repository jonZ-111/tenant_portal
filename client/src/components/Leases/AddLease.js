import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Leases.css";

export default function AddLease({ onLeaseAdded }) {
  const [tenants, setTenants] = useState([]);
  const [form, setForm] = useState({
    tenantId: "",
    unitNumber: "",
    startDate: "",
    endDate: "",
    rentAmount: "",
    rentDueDay: "",
    depositAmount: "",
  });

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    const res = await api.get("/api/tenants");
    setTenants(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/api/leases", form);
    setForm({
      tenantId: "",
      unitNumber: "",
      startDate: "",
      endDate: "",
      rentAmount: "",
      rentDueDay: "",
      depositAmount: "",
    });
    onLeaseAdded();
  };

  return (
    <div className="card">
      <h3>Add Lease</h3>

      <form className="form-grid" onSubmit={handleSubmit}>
        <select
          name="tenantId"
          value={form.tenantId}
          onChange={handleChange}
          required
        >
          <option value="">Select Tenant</option>
          {tenants.map((t) => (
            <option key={t.id} value={t.id}>
              {t.firstName} {t.lastName}
            </option>
          ))}
        </select>

        <input
          name="unitNumber"
          placeholder="Unit"
          value={form.unitNumber}
          onChange={handleChange}
        />

        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          required
        />

        <input
          name="rentAmount"
          placeholder="Rent Amount"
          value={form.rentAmount}
          onChange={handleChange}
          required
        />

        <input
          name="rentDueDay"
          placeholder="Rent Due Day (1–28)"
          value={form.rentDueDay}
          onChange={handleChange}
          required
        />

        <input
          name="depositAmount"
          placeholder="Deposit Amount"
          value={form.depositAmount}
          onChange={handleChange}
        />

        <button type="submit" className="primary-btn">
          Add Lease
        </button>
      </form>
    </div>
  );
}
