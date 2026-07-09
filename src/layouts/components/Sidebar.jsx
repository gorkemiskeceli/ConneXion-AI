import { NavLink } from "react-router-dom";
import { Bot, ChevronsUpDown } from "lucide-react";

import { getNavForRole } from "../../constants/navigation";

/**
 * Sidebar — light frosted-glass rail with brand logo, role-filtered navigation,
 * and a workspace switcher pinned to the bottom.
 *
 * Designed to match the soft transparent glassmorphism in the reference mockup.
 */
export default function Sidebar({
  role,
  workspaceName = "",
  workspacePlan = "",
  open = true,
}) {
  const items = getNavForRole(role);

  return (
    <aside
      className={`${open ? "flex" : "hidden"
        } fixed inset-y-0 left-0 z-30 w-64 flex-col border-r border-white/30 bg-white/30 backdrop-blur-xl lg:flex`}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/20">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/30">
          <Bot className="h-5 w-5" strokeWidth={2} />
        </span>
        <div className="leading-tight">
          <p className="font-heading text-[15px] font-bold text-slate-800">
            AI Chatbot
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wide text-slate-400">
            Müşteri Hizmetleri
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {items.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to.endsWith("/dashboard")}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${isActive
                ? "bg-white/80 text-primary shadow-sm border border-white/80"
                : "text-slate-600 hover:bg-white/30 hover:text-slate-900 border border-transparent"
              }`
            }
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Workspace card */}
      <div className="p-3">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl bg-white/40 hover:bg-white/60 border border-white/40 px-3 py-2.5 text-left transition-all"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-heading text-sm font-bold text-white">
            {workspaceName ? workspaceName.charAt(0).toUpperCase() : "W"}
          </span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-sm font-semibold text-slate-800">
              {workspaceName || "Workspace"}
            </span>
            <span className="block truncate font-mono text-[10px] uppercase tracking-wide text-slate-500">
              {workspacePlan || "Plan"}
            </span>
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 text-slate-500" />
        </button>
      </div>
    </aside>
  );
}
