import { NavLink } from "react-router-dom";
import { ChevronsUpDown } from "lucide-react";
import Logo from "../../components/Logo";

import { getNavForRole } from "../../constants/navigation";

/**
 * Sidebar — dark navy rail with the product mark, role-filtered navigation,
 * and a workspace switcher pinned to the bottom.
 *
 * All identity data (workspace name/plan) arrives via props and defaults to
 * empty — no mock data baked in.
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
      className={`${
        open ? "flex" : "hidden"
      } fixed inset-y-0 left-0 z-30 w-64 flex-col bg-gradient-to-b from-navy-900 to-navy-950 lg:flex`}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5">
        <Logo className="h-8 w-auto" />
        <div className="leading-tight">
          <p className="font-heading text-[15px] font-bold text-white">
            ConneXion-AI
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wide text-slate-400">
            Müşteri Hizmetleri
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {items.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to.endsWith("/dashboard")}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
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
          className="flex w-full items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5 text-left transition-colors hover:bg-white/10"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-heading text-sm font-bold text-white">
            {workspaceName ? workspaceName.charAt(0).toUpperCase() : "W"}
          </span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-sm font-semibold text-white">
              {workspaceName || "Workspace"}
            </span>
            <span className="block truncate font-mono text-[10px] uppercase tracking-wide text-slate-400">
              {workspacePlan || "Plan"}
            </span>
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 text-slate-400" />
        </button>
      </div>
    </aside>
  );
}
