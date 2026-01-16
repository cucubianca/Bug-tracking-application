// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import MainPage from "./pages/MainPage.jsx";
import PMDashboard from "./pages/PMDashboard.jsx";
import TSTDashboard from "./pages/TSTDashboard.jsx";

import CreateProject from "./pages/CreateProject.jsx";
import EditProject from "./pages/EditProject.jsx";
import JoinProject from "./pages/JoinProject.jsx";
import CreateBug from "./pages/CreateBug.jsx";
import AssignBug from "./pages/AssignBug.jsx";
import UpdateBug from "./pages/UpdateBug.jsx";
import BugsList from "./pages/BugsList.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Main page: Login + Register */}
          <Route path="/" element={<MainPage />} />

          {/* PM routes */}
          <Route
            path="/pm"
            element={
              <ProtectedRoute role="PM">
                <PMDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/create"
            element={
              <ProtectedRoute role="PM">
                <CreateProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/edit"
            element={
              <ProtectedRoute role="PM">
                <EditProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bugs/assign"
            element={
              <ProtectedRoute role="PM">
                <AssignBug />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bugs/update"
            element={
              <ProtectedRoute role="PM">
                <UpdateBug />
              </ProtectedRoute>
            }
          />

          <Route
            path="/bugs/list"
            element={
              <ProtectedRoute role="PM">
                <BugsList />
              </ProtectedRoute>
            }
          />


          {/* TST routes */}
          <Route
            path="/tst"
            element={
              <ProtectedRoute role="TST">
                <TSTDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/join"
            element={
              <ProtectedRoute role="TST">
                <JoinProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bugs/create"
            element={
              <ProtectedRoute role="TST">
                <CreateBug />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider >
  );
}
