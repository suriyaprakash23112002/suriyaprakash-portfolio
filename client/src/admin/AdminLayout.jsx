import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

import "./AdminLayout.css";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(
      (previous) => !previous
    );
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar
        open={sidebarOpen}
        onClose={closeSidebar}
      />

      <div className="admin-layout-main">
        <AdminHeader
          onMenuClick={toggleSidebar}
        />

        <main className="admin-layout-content">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && (
        <button
          type="button"
          className="admin-layout-overlay"
          onClick={closeSidebar}
          aria-label="Close sidebar"
        />
      )}
    </div>
  );
}

export default AdminLayout;