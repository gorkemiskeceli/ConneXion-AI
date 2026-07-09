import { NavLink } from "react-router-dom";
import { ChevronsUpDown } from "lucide-react";

import { getNavForRole } from "../../constants/navigation";

/**
 * Sidebar — premium floating dark-glass rail:
 * - Collapsible state (when open is false, only icons are shown, width is w-20)
 * - Solid header background color (#1e293b) matching landing page navigation
 * - Active state highlighted with a bright blue pill shape
 */
export default function Sidebar({
  role,
  workspaceName = "",
  workspacePlan = "",
  open = false,
  onClose,
}) {
  const items = getNavForRole(role);

  return (
    <>
      {/* Mobile Backdrop */}
      {open && (
        <button
          type="button"
          onClick={onClose}
          className="fixed inset-0 z-20 bg-slate-950/30 backdrop-blur-xs lg:hidden w-full h-full text-left cursor-default focus:outline-none"
        >
          <span className="sr-only">Close Sidebar</span>
        </button>
      )}

      <aside
        className={`fixed inset-y-4 left-4 z-30 flex h-[calc(100vh-2rem)] flex-col bg-[#1e293b] border border-white/10 shadow-[0_8px_32px_rgba(30,41,59,0.15)] transition-all duration-300 rounded-[28px] ${
          open ? "w-60 translate-x-0" : "w-20 -translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand Logo */}
        <div className={`flex items-center gap-3 py-5 border-b border-white/5 transition-all duration-300 ${open ? "px-5" : "justify-center px-0"}`}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-sky-500 text-white font-bold text-base shadow-sm">
            S
          </div>
          {open && (
            <div className="leading-tight animate-in fade-in duration-300">
              <span className="font-sans text-sm font-semibold tracking-tight text-white">
                SaaS<span className="text-sky-400 font-mono text-[10px] ml-1">Precise v3.5</span>
              </span>
              <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400 mt-0.5">
                Müşteri Hizmetleri
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto py-4 px-3">
          {items.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              end={to.endsWith("/dashboard")}
              title={!open ? label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 py-2.5 transition-colors duration-200 rounded-full ${open ? "px-4" : "justify-center px-0"} ${
                  isActive
                    ? "bg-[#2F6FEE]/15 text-[#2F6FEE] font-semibold shadow-xs"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.9} />
              {open && <span className="animate-in fade-in duration-300 text-sm">{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Workspace switcher card */}
        <div className="p-3 border-t border-white/5">
          <button
            type="button"
            className={`flex items-center gap-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 py-2.5 text-left transition-all text-white ${
              open ? "w-full px-3" : "justify-center px-0 w-12 h-12 mx-auto"
            }`}
          >
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-500 font-sans text-sm font-bold text-white">
              {workspaceName ? workspaceName.charAt(0).toUpperCase() : "W"}
            </span>
            {open && (
              <>
                <span className="min-w-0 flex-1 leading-tight animate-in fade-in duration-300">
                  <span className="block truncate text-sm font-semibold text-white">
                    {workspaceName || "Workspace"}
                  </span>
                  <span className="block truncate font-mono text-[9px] uppercase tracking-wide text-slate-450">
                    {workspacePlan || "Plan"}
                  </span>
                </span>
                <ChevronsUpDown className="h-4 w-4 shrink-0 text-slate-450" />
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
