import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  LogOut,
} from "lucide-react";

import Avatar from "../../shared/components/ui/Avatar";
import { logoutUser } from "../../homepage/store/authSlice";

/**
 * Topbar — light, frosted-glass header above the workspace.
 * Features an interactive user profile dropdown with a functioning Logout button.
 */
export default function Topbar({
  onToggleSidebar,
  workspaceName = "",
  userName = "",
  userRoleLabel = "",
  notificationCount = 0,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/", { replace: true });
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-white/25 bg-white/20 backdrop-blur-md px-4 lg:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-white/40"
          aria-label="Menüyü aç/kapat"
        >
          <Menu className="h-5 w-5" />
        </button>

        <button
          type="button"
          className="hidden items-center gap-2 rounded-lg border border-white/40 bg-white/40 px-3 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-white/60 sm:flex shadow-sm"
        >
          {workspaceName || "Workspace seç"}
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-white/40 border border-transparent hover:border-white/40"
          aria-label="Ara"
        >
          <Search className="h-5 w-5" strokeWidth={1.9} />
        </button>

        <button
          type="button"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-white/40 border border-transparent hover:border-white/40"
          aria-label="Bildirimler"
        >
          <Bell className="h-5 w-5" strokeWidth={1.9} />
          {notificationCount > 0 && (
            <span className="absolute right-1.5 top-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-white">
              {notificationCount}
            </span>
          )}
        </button>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-white/40 border border-transparent hover:border-white/40"
          aria-label="Yardım"
        >
          <HelpCircle className="h-5 w-5" strokeWidth={1.9} />
        </button>

        <div className="mx-1 h-6 w-px bg-white/20" />

        {/* User Profile Dropdown Button */}
        <div className="relative font-sans">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 rounded-lg py-1 pl-1 pr-2 transition-all hover:bg-white/40 border border-transparent hover:border-white/20"
          >
            <Avatar name={userName} size="md" />
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-sm font-semibold text-slate-800">
                {userName || "Kullanıcı"}
              </span>
              <span className="block text-xs text-slate-500 font-medium">
                {userRoleLabel || "—"}
              </span>
            </span>
            <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
          </button>

          {dropdownOpen && (
            <>
              {/* Click outside backdrop */}
              <button
                type="button"
                className="fixed inset-0 z-30 cursor-default w-full h-full text-left focus:outline-none"
                onClick={() => setDropdownOpen(false)}
              >
                <span className="sr-only">Close user menu</span>
              </button>

              {/* Dropdown Menu Box */}
              <div className="absolute right-0 top-full mt-2 z-40 w-48 rounded-xl border border-slate-200/40 bg-white/95 p-1 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.15)] backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-slate-100/50">
                  <p className="text-xs font-bold text-slate-800">{userName || "Kullanıcı"}</p>
                  <p className="text-[9px] font-semibold text-slate-400 truncate">{userRoleLabel || "—"}</p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-red-650 hover:bg-red-50 hover:text-red-700 transition-colors"
                >
                  <LogOut className="h-4 w-4" strokeWidth={2} />
                  Çıkış Yap
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
