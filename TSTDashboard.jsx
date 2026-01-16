// src/pages/TSTDashboard.jsx
import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";

export default function TSTDashboard() {
  return (
    <Layout>
      <h2 className="mb-4">Tester Dashboard</h2>
      <p>Join projects and contribute to quality assurance.</p>

      <div className="dashboard-grid">
        <Link to="/projects/join" className="dashboard-option">
          <span>Join Project</span>
        </Link>
        <Link to="/bugs/create" className="dashboard-option">
          <span>Report Bug</span>
        </Link>
      </div>
    </Layout>
  );
}
