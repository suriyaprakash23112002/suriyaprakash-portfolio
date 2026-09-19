import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

import "./AdminLayout.css";
import "./AdminSystem.css";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="admin-layout-main">
        <AdminHeader
          onMenuClick={() => setSidebarOpen((previous) => !previous)}
        />

        <main className="admin-layout-content">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && (
        <button
          type="button"
          className="admin-layout-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}
    </div>
  );
}

export default AdminLayout;
