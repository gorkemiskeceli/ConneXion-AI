import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { ROLES } from "../constants/navigation";

/**
 * DashboardLayout — the shared frame for the whole admin area.
 * Renders the navy sidebar, the top bar, and a scrollable content region
 * where each page mounts via <Outlet />.
 *
 * Identity props (role, user, workspace) are passed here in a real app from
 * the auth/session layer. For this template they default to empty; swap the
 * `role` below to preview a different role's navigation.
 */
export default function DashboardLayout({
  role = ROLES.PLATFORM_ADMIN,
  userName = "",
  userRoleLabel = "",
  workspaceName = "",
  workspacePlan = "",
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F8FAFC]">
      {/* Background Gradient Blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Soft Blue Blob behind sidebar/top-left */}
        <div className="absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-[#2F6FEE]/10 blur-[130px]" />

        {/* Soft Navy/Slate Blob behind top-right header */}
        <div className="absolute right-1/4 -top-40 h-[600px] w-[600px] rounded-full bg-slate-500/5 blur-[150px]" />
      </div>

      <Sidebar
        role={role}
        workspaceName={workspaceName}
        workspacePlan={workspacePlan}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className={`transition-all duration-300 ${sidebarOpen ? "lg:pl-64" : "lg:pl-24"}`}>
        <Topbar
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
          workspaceName={workspaceName}
          userName={userName}
          userRoleLabel={userRoleLabel}
        />

        <main className="min-h-[calc(100vh-4rem)] px-4 py-6 lg:px-8">
          <Outlet />
        </main>

        <footer className="flex items-center justify-between border-t border-slate-200/40 px-4 py-4 text-xs text-slate-400 lg:px-8">
          <span>© {new Date().getFullYear()} AI Chatbot — Müşteri Hizmetleri</span>
          <span className="font-mono">v1.0.0</span>
        </footer>
      </div>
    </div>
  );
}
