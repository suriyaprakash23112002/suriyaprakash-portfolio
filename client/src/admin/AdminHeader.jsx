import {
  FiExternalLink,
  FiMenu,
} from "react-icons/fi";

import { getStoredAdmin } from "../services/authService";
import "./AdminHeader.css";

function AdminHeader({ onMenuClick }) {
  const admin = getStoredAdmin();

  const name = admin?.name || "Administrator";
  const role = String(admin?.role || "ADMIN").replaceAll("_", " ");
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "SP";

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <button
          type="button"
          className="admin-header-menu"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <FiMenu />
        </button>

        <div className="admin-header-heading">
          <span>PORTFOLIO CMS</span>
          <strong>Management Console</strong>
        </div>
      </div>

      <div className="admin-header-actions">
        <button
          type="button"
          className="admin-header-portfolio"
          onClick={() => window.open("/", "_blank")}
        >
          <span>View Portfolio</span>
          <FiExternalLink />
        </button>

        <div className="admin-header-user">
          <div>{initials}</div>
          <section>
            <strong>{name}</strong>
            <span>{role}</span>
          </section>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
