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
    <div className="relative min-h-screen overflow-x-hidden bg-[#fafbfe]">
      {/* Background Gradient Blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Violet/Indigo Blob top-right */}
        <div className="absolute -right-24 -top-24 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-purple-400/20 to-indigo-600/20 blur-[100px]" />

        {/* Soft Pink Blob middle-left */}
        <div className="absolute -left-36 top-1/3 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-pink-400/15 to-violet-500/15 blur-[120px]" />

        {/* Warm Orange/Yellow Blob bottom-right */}
        <div className="absolute right-1/4 bottom-10 h-[450px] w-[450px] rounded-full bg-gradient-to-tr from-amber-300/10 to-pink-500/10 blur-[90px]" />

        {/* Light Blue Blob top-left */}
        <div className="absolute left-10 -top-10 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-sky-400/15 to-indigo-500/15 blur-[80px]" />
      </div>

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
