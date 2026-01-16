import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Layout from "../components/Layout";

export default function AssignBug() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    bugTitle: "",
    assigneeName: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/bugs/assign", form);
      setSuccess(true);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to assign bug.";
      setError(msg);
    }
  };

  return (
    <Layout>
      {
        success ? (
          <>
            <h2 className="text-success mb-4">Bug Assigned</h2>
            <p>The bug has been successfully assigned.</p>
            <div className="mt-4">
              <button onClick={() => navigate(-1)} className="secondary">
                &larr; Return to Dashboard
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="mb-4">Assign Bug</h2>

            <label>Bug Title</label>
            <input
              placeholder="Bug Title (e.g. Fix Login)"
              value={form.bugTitle}
              onChange={(e) => setForm({ ...form, bugTitle: e.target.value })}
            />

            <label>Assignee Full Name</label>
            <input
              placeholder="Full Name (e.g. John Doe)"
              value={form.assigneeName}
              onChange={(e) => setForm({ ...form, assigneeName: e.target.value })}
            />

            <button>Assign</button>

            {error && <p className="text-danger mt-4">{error}</p>}

            <div className="mt-4">
              <button type="button" onClick={() => navigate(-1)} className="secondary">
                &larr; Return to Dashboard
              </button>
            </div>
          </form>
        )
      }
    </Layout>
  );
}
