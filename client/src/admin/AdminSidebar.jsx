import {
  FiActivity,
  FiBookOpen,
  FiBriefcase,
  FiCode,
  FiFolder,
  FiGrid,
  FiLogOut,
  FiSettings,
  FiUser,
  FiX,
} from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";

import {
  getStoredAdmin,
  logoutAdmin,
} from "../services/authService";

import "./AdminSidebar.css";

function AdminSidebar({ open, onClose }) {
  const navigate = useNavigate();
  const admin = getStoredAdmin();

  const menuItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: <FiGrid /> },
    { label: "Profile", path: "/admin/profile", icon: <FiUser /> },
    { label: "Skills", path: "/admin/skills", icon: <FiCode /> },
    { label: "Projects", path: "/admin/projects", icon: <FiFolder /> },
    { label: "Experience", path: "/admin/experience", icon: <FiBriefcase /> },
    { label: "Career Journey", path: "/admin/career", icon: <FiActivity /> },
    { label: "Education", path: "/admin/education", icon: <FiBookOpen /> },
    { label: "Settings", path: "/admin/settings", icon: <FiSettings /> },
  ];

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login", { replace: true });
  };

  return (
    <aside className={`admin-sidebar ${open ? "admin-sidebar-open" : ""}`}>
      <div className="admin-sidebar-brand">
        <div className="admin-sidebar-logo">SP</div>

        <div className="admin-sidebar-brand-copy">
          <strong>Suriyaprakash</strong>
          <span>PORTFOLIO ADMIN</span>
        </div>

        <button
          type="button"
          className="admin-sidebar-close"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <FiX />
        </button>
      </div>

      <div className="admin-sidebar-status">
        <span />
        <div>
          <strong>Admin panel</strong>
          <small>Connected</small>
        </div>
      </div>

      <nav className="admin-sidebar-navigation">
        <span className="admin-sidebar-label">MANAGEMENT</span>

        <div className="admin-sidebar-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `admin-sidebar-link ${isActive ? "admin-sidebar-link-active" : ""}`
              }
            >
              <div className="admin-sidebar-link-icon">{item.icon}</div>
              <span>{item.label}</span>
              <i />
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="admin-sidebar-bottom">
        <div className="admin-sidebar-profile">
          <div>
            {(admin?.name || "SP")
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((part) => part[0])
              .join("")
              .toUpperCase()}
          </div>

          <section>
            <strong>{admin?.name || "Administrator"}</strong>
            <span>{String(admin?.role || "ADMIN").replaceAll("_", " ")}</span>
          </section>
        </div>

        <button
          type="button"
          className="admin-sidebar-logout"
          onClick={handleLogout}
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
