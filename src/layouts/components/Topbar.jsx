import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../homepage/store/authSlice";
import {
  Menu,
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  LogOut,
} from "lucide-react";

import Avatar from "../../shared/components/ui/Avatar";

/**
 * Topbar — fixed header above the workspace.
 * Left: sidebar toggle + workspace selector.
 * Right: search, notifications, help, and the active user.
 *
 * User / workspace identity comes via props (empty by default).
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
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 lg:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 lg:hidden"
          aria-label="Menüyü aç/kapat"
        >
          <Menu className="h-5 w-5" />
        </button>

        <button
          type="button"
          className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 sm:flex"
        >
          {workspaceName || "Workspace seç"}
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
          aria-label="Ara"
        >
          <Search className="h-5 w-5" strokeWidth={1.9} />
        </button>

        <button
          type="button"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
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
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
          aria-label="Yardım"
        >
          <HelpCircle className="h-5 w-5" strokeWidth={1.9} />
        </button>

        <div className="mx-1 h-6 w-px bg-slate-200" />

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 rounded-lg py-1 pl-1 pr-2 transition-colors hover:bg-slate-100 cursor-pointer"
            id="user-profile-menu-btn"
          >
            <Avatar name={userName} size="md" />
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-sm font-semibold text-slate-800">
                {userName || "Kullanıcı"}
              </span>
              <span className="block text-xs text-slate-400">
                {userRoleLabel || "—"}
              </span>
            </span>
            <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-2xl animate-in fade-in slide-in-from-top-1 z-50">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-red-650 hover:bg-red-50 transition-colors cursor-pointer"
                id="logout-btn"
              >
                <LogOut className="h-4 w-4 text-red-500" />
                Çıkış Yap
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
