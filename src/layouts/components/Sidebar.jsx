import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../components/Logo";
import { getNavForRole, ROLES } from "../../constants/navigation";
import { logoutUser } from "../../homepage/store/authSlice";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.user);
  const userName = currentUser?.name || "Ahmet Yılmaz";
  
  const roleLabels = {
    [ROLES.PLATFORM_ADMIN]: "Platform Admin",
    [ROLES.WORKSPACE_ADMIN]: "Workspace Admin",
    [ROLES.MANAGER]: "Manager",
    [ROLES.SUPPORT_AGENT]: "Support Agent",
  };
  const userRoleLabel = roleLabels[role] || "User";

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

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
          <Logo className="h-8 w-auto shrink-0" />
          {open && (
            <div className="leading-tight animate-in fade-in duration-300">
              <span className="font-sans text-sm font-semibold tracking-tight text-white">
                ConneXion-AI
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

        {/* Profile and Logout Section */}
        <div className="p-3 border-t border-white/5 bg-slate-900/30">
          {open ? (
            <div className="flex items-center justify-between gap-2.5 rounded-2xl bg-white/5 border border-white/5 p-2 text-white">
              <div className="min-w-0 flex-1 leading-tight px-1">
                <span className="block truncate text-sm font-semibold text-white">
                  {userName}
                </span>
                <span className="block truncate text-[10px] text-slate-400 mt-0.5">
                  {userRoleLabel}
                </span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg p-2 text-slate-450 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                title="Çıkış Yap"
              >
                <LogOut className="h-4.5 w-4.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-12 w-12 mx-auto items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              title="Çıkış Yap"
            >
              <LogOut className="h-5 w-5" />
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
