import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";

export default function PMDashboard() {
  return (
    <Layout>
      <h2 className="mb-4">PM Dashboard</h2>
      <p>Manage your projects and bugs efficiently.</p>

      <div className="dashboard-grid">
        <Link to="/projects/create" className="dashboard-option">
          <span>Create Project</span>
        </Link>
        <Link to="/projects/edit" className="dashboard-option">
          <span>Modify Project</span>
        </Link>
        <Link to="/bugs/list" className="dashboard-option">
          <span>View Bugs</span>
        </Link>
        <Link to="/bugs/assign" className="dashboard-option">
          <span>Assign Bug</span>
        </Link>
        <Link to="/bugs/update" className="dashboard-option">
          <span>Update Status</span>
        </Link>
      </div>
    </Layout>
  );
}
