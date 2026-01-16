// src/pages/Login.jsx
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios.js";
import Layout from "../components/Layout.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Login({ embedded = false }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", form);

      // Save token in AuthContext
      login(res.data.token);

      // Redirect based on role
      const role = res.data.role;
      if (role === "PM") navigate("/pm");
      else if (role === "TST") navigate("/tst");
      else navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed.";
      setError(msg);
    }
  };

  const content = (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-4">Login</h2>

      <label>Email</label>
      <input
        placeholder="Enter your email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <label>Password</label>
      <input
        placeholder="Enter your password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button>Login</button>

      {error && (
        <p className="text-danger mt-4">{error}</p>
      )}

      {!embedded && (
        <div className="mt-4 text-center">
          <Link to="/">Return to Main Page</Link>
        </div>
      )}
    </form>
  );

  if (embedded) return content;
  return <Layout>{content}</Layout>;
}
