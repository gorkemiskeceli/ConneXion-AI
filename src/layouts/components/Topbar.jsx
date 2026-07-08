import {
  Menu,
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
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

        <button
          type="button"
          className="flex items-center gap-2.5 rounded-lg py-1 pl-1 pr-2 transition-colors hover:bg-slate-100"
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
      </div>
    </header>
  );
}
