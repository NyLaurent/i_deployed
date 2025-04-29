import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { AppHeader } from "./AppHeader";
import { useState, useEffect } from "react";

const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Listen for sidebar collapse state
  useEffect(() => {
    const handleSidebarChange = (e) => {
      if (e.detail && typeof e.detail.collapsed === "boolean") {
        setSidebarCollapsed(e.detail.collapsed);
      }
    };

    window.addEventListener("sidebarStateChange", handleSidebarChange);
    return () =>
      window.removeEventListener("sidebarStateChange", handleSidebarChange);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        onCollapseChange={(collapsed) => setSidebarCollapsed(collapsed)}
      />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        <AppHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout; 