import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Layout from "../components/Layout";

export default function EditProject() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [repoUrl, setRepoUrl] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await api.post("/projects/update", { name, description, repoUrl });
            setSuccess(true);
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to update project.";
            setError(msg);
        }
    };

    return (
        <Layout>
            {success ? (
                <>
                    <h2 className="text-success mb-4">Project Updated</h2>
                    <p>The project details have been updated.</p>
                    <div className="mt-4">
                        <button onClick={() => navigate(-1)} className="secondary">
                            &larr; Return to Dashboard
                        </button>
                    </div>
                </>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2 className="mb-4">Modify Project</h2>
                    <p className="text-sm mb-4">Enter the name of the project you want to modify.</p>

                    <label>Project Name (Existing)</label>
                    <input
                        placeholder="Exact Project Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label>New Description</label>
                    <textarea
                        placeholder="New Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <label>New Repository URL</label>
                    <input
                        placeholder="https://github.com/..."
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                    />

                    <button>Update Project</button>

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
