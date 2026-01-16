import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Layout from "../components/Layout";

export default function JoinProject() {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/projects/join", { projectName });

      setSuccess(true);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to join project.";
      setError(msg);
    }
  };

  return (
    <Layout>
      {success ? (
        <>
          <h2 className="text-success mb-4">Joined Project</h2>
          <p>You have successfully joined the project.</p>
          <div className="mt-4">
            <button onClick={() => navigate(-1)} className="secondary">
              &larr; Return to Dashboard
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2 className="mb-4">Join Project</h2>

          <label>Project Name</label>
          <input
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

          <button>Join</button>

          {error && <p className="text-danger mt-4">{error}</p>}

          <div className="mt-4">
            <button type="button" onClick={() => navigate(-1)} className="secondary">
              &larr; Return to Dashboard
            </button>
          </div>
        </form>
      )}
    </Layout>
  );
}
