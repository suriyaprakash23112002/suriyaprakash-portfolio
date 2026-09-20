import { useEffect, useState } from "react";
import {
  FiArrowUpRight,
  FiBookOpen,
  FiBriefcase,
  FiCode,
  FiEye,
  FiFolder,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import {
  AdminAlert,
  AdminLoader,
  AdminPageHeader,
} from "./AdminUI";

import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get("/dashboard");
      setDashboard(response?.data?.dashboard || null);
    } catch (err) {
      console.error("Dashboard load error:", err);
      setError(err?.response?.data?.message || "Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return <AdminLoader label="Loading dashboard..." />;
  }

  const counts = dashboard?.counts || {};
  const profile = dashboard?.profile || {};

  const modules = [
    {
      label: "Skills",
      value: counts.skills ?? 0,
      text: `${counts.skillCategories ?? 0} categories`,
      icon: <FiCode />,
      path: "/admin/skills",
    },
    {
      label: "Projects",
      value: counts.projects ?? 0,
      text: `${counts.publishedProjects ?? 0} published`,
      icon: <FiFolder />,
      path: "/admin/projects",
    },
    {
      label: "Experience",
      value: counts.experiences ?? 0,
      text: "Professional records",
      icon: <FiBriefcase />,
      path: "/admin/experience",
    },
    {
      label: "Education",
      value: counts.education ?? 0,
      text: "Academic records",
      icon: <FiBookOpen />,
      path: "/admin/education",
    },
  ];

  return (
    <div className="admin-ui-page admin-dashboard">
      <AdminPageHeader
        eyebrow="OVERVIEW"
        title="Dashboard"
        description="Manage your portfolio content from one consistent workspace."
        actions={
          <button
            type="button"
            className="admin-ui-button"
            onClick={() => window.open("/", "_blank")}
          >
            <FiEye />
            View Portfolio
            <FiArrowUpRight />
          </button>
        }
      />

      <AdminAlert type="error">{error}</AdminAlert>

      <section className="admin-dashboard-welcome admin-ui-card">
        <div>
          <span className="admin-dashboard-online">
            <i />
            SYSTEM ONLINE
          </span>

          <h2>
            Welcome back,
            <span> {profile?.fullName || "Suriyaprakash"}.</span>
          </h2>

          <p>
            Your admin dashboard is connected to the portfolio API. Changes made
            here can be reflected in the public portfolio after saving.
          </p>
        </div>

        <div className="admin-dashboard-code">&lt;/&gt;</div>
      </section>

      <div className="admin-ui-section-title admin-dashboard-section-heading">
        <div>
          <span>CONTENT</span>
          <h2>Portfolio Management</h2>
        </div>
        <span>{modules.length.toString().padStart(2, "0")} MODULES</span>
      </div>

      <div className="admin-dashboard-grid">
        {modules.map((item) => (
          <button
            type="button"
            className="admin-dashboard-card admin-ui-card"
            key={item.path}
            onClick={() => navigate(item.path)}
          >
            <div className="admin-dashboard-card-top">
              <div className="admin-dashboard-card-icon">{item.icon}</div>
              <FiArrowUpRight className="admin-dashboard-card-arrow" />
            </div>

            <div className="admin-dashboard-card-content">
              <span>{item.value}</span>
              <h4>{item.label}</h4>
              <p>{item.text}</p>
            </div>
          </button>
        ))}
      </div>

      {dashboard?.recentProjects?.length > 0 && (
        <section className="admin-ui-panel admin-ui-section">
          <div className="admin-ui-section-title">
            <div>
              <span>RECENT</span>
              <h2>Recently updated projects</h2>
            </div>
          </div>

          <div className="admin-ui-list">
            {dashboard.recentProjects.map((project) => (
              <div className="admin-ui-list-card admin-ui-card" key={project.id}>
                <div className="admin-ui-list-icon">
                  <FiFolder />
                </div>

                <div className="admin-ui-list-content">
                  <span>{project.status}</span>
                  <h3>{project.title}</h3>
                  <div className="admin-ui-meta">
                    <span>{project.isFeatured ? "Featured" : "Standard"}</span>
                    <span>{project.isCurrent ? "Current" : "Completed"}</span>
                  </div>
                </div>

                <div className="admin-ui-actions">
                  <button
                    type="button"
                    className="admin-ui-button"
                    onClick={() => navigate("/admin/projects")}
                  >
                    Manage
                    <FiArrowUpRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default AdminDashboard;
