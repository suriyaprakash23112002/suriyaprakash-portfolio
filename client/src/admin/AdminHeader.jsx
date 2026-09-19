import {
  FiMenu,
  FiExternalLink,
  FiBell,
} from "react-icons/fi";

import "./AdminHeader.css";

function AdminHeader({
  onMenuClick,
}) {
  const openPortfolio = () => {
    window.open(
      "/",
      "_blank"
    );
  };

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <button
          type="button"
          className="admin-header-menu"
          onClick={
            onMenuClick
          }
          aria-label="Open menu"
        >
          <FiMenu />
        </button>

        <div className="admin-header-heading">
          <span>
            PORTFOLIO CMS
          </span>

          <strong>
            Management Console
          </strong>
        </div>
      </div>

      <div className="admin-header-actions">
        <button
          type="button"
          className="admin-header-notification"
          aria-label="Notifications"
        >
          <FiBell />

          <span />
        </button>

        <button
          type="button"
          className="admin-header-portfolio"
          onClick={
            openPortfolio
          }
        >
          <span>
            View Portfolio
          </span>

          <FiExternalLink />
        </button>

        <div className="admin-header-user">
          <div>
            SP
          </div>

          <section>
            <strong>
              Admin
            </strong>

            <span>
              Administrator
            </span>
          </section>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;