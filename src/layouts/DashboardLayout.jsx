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
    <div className="min-h-screen bg-surface">
      <Sidebar
        role={role}
        workspaceName={workspaceName}
        workspacePlan={workspacePlan}
        open={sidebarOpen}
      />

      <div className="lg:pl-64">
        <Topbar
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
          workspaceName={workspaceName}
          userName={userName}
          userRoleLabel={userRoleLabel}
        />

        <main className="min-h-[calc(100vh-4rem)] px-4 py-6 lg:px-8">
          <Outlet />
        </main>

        <footer className="flex items-center justify-between border-t border-slate-200 px-4 py-4 text-xs text-slate-400 lg:px-8">
          <span>© {new Date().getFullYear()} AI Chatbot — Müşteri Hizmetleri</span>
          <span className="font-mono">v1.0.0</span>
        </footer>
      </div>
    </div>
  );
}
