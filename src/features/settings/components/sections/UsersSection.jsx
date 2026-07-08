import { Search, UserPlus, Pencil, Trash2, Users } from "lucide-react";

import SettingsSection from "../SettingsSection";
import Avatar from "../../../../shared/components/ui/Avatar";
import Badge from "../../../../shared/components/ui/Badge";
import EmptyState from "../../../../shared/components/ui/EmptyState";
import { USER_COLUMNS } from "../../constants/settingsConfig";
import { ROLE_LABELS } from "../../../../constants/navigation";

/**
 * UsersSection — workspace user accounts.
 * user: { id, name, email, role, status, lastLogin }
 */
export default function UsersSection({ canEdit, users = [] }) {
  const colSpan = USER_COLUMNS.length + 1;

  return (
    <SettingsSection
      title="Kullanıcılar"
      description="Workspace kullanıcılarını ve erişimlerini yönetin."
      headerRight={
        canEdit ? (
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600"
          >
            <UserPlus className="h-4 w-4" />
            Kullanıcı Davet Et
          </button>
        ) : null
      }
    >
      <div className="relative mb-4 max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Kullanıcı ara..."
          className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-100"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left font-mono text-[11px] uppercase tracking-wide text-slate-400">
              {USER_COLUMNS.map((col) => (
                <th key={col.id} className="px-4 py-3 font-medium">
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right font-medium">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.length === 0 ? (
              <tr>
                <td colSpan={colSpan}>
                  <EmptyState
                    icon={Users}
                    title="Kullanıcı yok"
                    description="Davet ettiğiniz kullanıcılar burada listelenir."
                  />
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="text-slate-700">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={u.name} size="sm" />
                      <div className="min-w-0">
                        <p className="font-medium text-slate-900">{u.name}</p>
                        <p className="text-xs text-slate-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {ROLE_LABELS[u.role] ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={u.status === "active" ? "success" : "neutral"}>
                      {u.status === "active" ? "Aktif" : "Beklemede"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-400">
                    {u.lastLogin ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {canEdit ? (
                        <>
                          <button
                            type="button"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                            aria-label="Düzenle"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
                            aria-label="Kaldır"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </SettingsSection>
  );
}
