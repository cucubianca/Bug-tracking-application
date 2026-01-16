// src/pages/MainPage.jsx
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Layout from "../components/Layout.jsx";
import { useState } from "react";

export default function MainPage() {
  const [mode, setMode] = useState("login");

  return (
    <Layout>
      <h1 className="app-title">Bug Tracker</h1>
      <div className="tab-group">
        <button
          onClick={() => setMode("login")}
          className={`tab-button ${mode === "login" ? "active" : ""}`}
        >
          Login
        </button>
        <button
          onClick={() => setMode("register")}
          className={`tab-button ${mode === "register" ? "active" : ""}`}
        >
          Register
        </button>
      </div>

      {mode === "login" ? <Login embedded /> : <Register embedded />}
    </Layout>
  );
}
