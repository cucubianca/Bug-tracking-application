import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Layout from "../components/Layout";

export default function BugsList() {
  const navigate = useNavigate();
  const [bugs, setBugs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const res = await api.get("/bugs/pm");
        setBugs(res.data);
      } catch (err) {
        const msg = err.response?.data?.message || "Failed to load bugs.";
        setError(msg);
      }
    };

    fetchBugs();
  }, []);

  return (
    <Layout>
      <h2 className="mb-4">Bugs for My Projects</h2>

      {error && <p className="text-danger">{error}</p>}

      {bugs.length === 0 ? (
        <p>No bugs found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Project</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bugs.map((bug) => (
              <tr key={bug.id}>
                <td>{bug.title}</td>
                <td>{bug.Project?.name}</td>
                <td>{bug.description}</td>
                <td>
                  <span className={`status-badge status-${bug.status}`}>
                    {bug.status.replace("_", " ")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="mt-4">
        <button onClick={() => navigate(-1)} className="secondary">
          &larr; Return to Dashboard
        </button>
      </div>
    </Layout>
  );
}
