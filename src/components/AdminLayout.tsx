import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
