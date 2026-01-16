// src/pages/Register.jsx
import { useState } from "react";
import api from "../api/axios.js";
import Layout from "../components/Layout.jsx";
import { Link } from "react-router-dom";

export default function Register({ embedded = false }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", form);
      setSuccess(true);
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed.";
      setError(msg);
    }
  };

  const content = (
    <>
      {success ? (
        <>
          <h2 className="text-success mb-4">✅ Account Created</h2>
          <p>Your account has been successfully registered.</p>
          {!embedded && (
            <div className="mt-4">
              <Link to="/">Go to Main Page</Link>
            </div>
          )}
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2 className="mb-4">Register</h2>

          <label>Full Name</label>
          <input
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />

          <label>Email</label>
          <input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <label>Password</label>
          <input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <label>Role</label>
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="">Select Role</option>
            <option value="PM">Project Manager</option>
            <option value="TST">Tester</option>
          </select>

          <button>Register</button>

          {error && (
            <p className="text-danger mt-4">{error}</p>
          )}
        </form>
      )}
    </>
  );

  if (embedded) return content;
  return <Layout>{content}</Layout>;
}
