import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Layout from "../components/Layout";

export default function CreateBug() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        description: "",
        projectName: "",
        severity: "",
        commitLink: "",
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await api.post("/bugs/create", {
                projectName: form.projectName,
                title: form.title,
                severity: form.severity,
                description: form.description,
                commitLink: form.commitLink,
            });
            setSuccess(true);
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to create bug.";
            setError(msg);
        }
    };

    return (
        <Layout>
            {success ? (
                <>
                    <h2 className="text-success mb-4">Bug Created</h2>
                    <p>Your bug has been successfully reported.</p>
                    <div className="mt-4">
                        <button onClick={() => navigate(-1)} className="secondary">
                            &larr; Return to Dashboard
                        </button>
                    </div>
                </>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2 className="mb-4">Report Bug</h2>

                    <label>Title</label>
                    <input
                        placeholder="Bug title"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />

                    <label>Description</label>
                    <textarea
                        style={{ height: "100px" }}
                        placeholder="Describe the bug"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />

                    <label>Project Name</label>
                    <input
                        placeholder="Project Name"
                        value={form.projectName}
                        onChange={(e) => setForm({ ...form, projectName: e.target.value })}
                    />

                    <label>Severity</label>
                    <select
                        value={form.severity}
                        onChange={(e) => setForm({ ...form, severity: e.target.value })}
                    >
                        <option value="">Select Severity</option>
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                        <option value="CRITICAL">Critical</option>
                    </select>

                    <label>Commit Link</label>
                    <input
                        placeholder="Git commit URL"
                        value={form.commitLink}
                        onChange={(e) => setForm({ ...form, commitLink: e.target.value })}
                    />

                    <button>Submit Bug</button>

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
