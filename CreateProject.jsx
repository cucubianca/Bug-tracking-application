import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Layout from "../components/Layout";

export default function CreateProject() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [teamEmails, setTeamEmails] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const teamList = teamEmails.split(",").map(email => email.trim()).filter(e => e);
      await api.post("/projects/create", { name, description, repoUrl, teamEmails: teamList });
      setSuccess(true);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create project.";
      setError(msg);
    }
  };

  // Styles removed in favor of CSS classes

  return (
    <Layout>
      {success ? (
        <>
          <h2 className="text-success mb-4">Project Created</h2>
          <p>Your project has been successfully created.</p>
          <div className="mt-4">
            <button onClick={() => navigate(-1)} className="secondary">
              &larr; Return to Dashboard
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2 className="mb-4">Create Project</h2>

          <label>Project Name</label>
          <input
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Description</label>
          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Repository URL</label>
          <input
            placeholder="https://github.com/..."
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
          />

          <label>Team Members (comma separated emails)</label>
          <textarea
            placeholder="tester1@example.com, tester2@example.com"
            value={teamEmails}
            onChange={(e) => setTeamEmails(e.target.value)}
          />

          <button>Create</button>

          {error && (
            <p className="text-danger mt-4">{error}</p>
          )}

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
