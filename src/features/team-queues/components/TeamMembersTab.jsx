import { Search, UserPlus, Pencil, Trash2, Users } from "lucide-react";

import Avatar from "../../../shared/components/ui/Avatar";
import EmptyState from "../../../shared/components/ui/EmptyState";
import AvailabilityBadge from "./AvailabilityBadge";
import { MEMBER_COLUMNS } from "../constants/teamQueuesConfig";
import { ROLE_LABELS } from "../../../constants/navigation";
import { canTeamQueues, TEAM_ACTION } from "../../../constants/permissions";

/**
 * TeamMembersTab — the team roster.
 * member: { id, name, email, role, availability, queue, activeCount }
 */
export default function TeamMembersTab({
  role,
  members = [],
  search = "",
  onSearch,
  onInvite,
  onEdit,
  onDelete,
}) {
  const canManageTeam = canTeamQueues(role, TEAM_ACTION.MANAGE_TEAM);
  const colSpan = MEMBER_COLUMNS.length + 1;

  return (
    <div className="rounded-2xl bg-white shadow-card">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch?.(e.target.value)}
            placeholder="Üye ara..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
        </div>
        {canManageTeam && (
          <button
            type="button"
            onClick={onInvite}
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600"
          >
            <UserPlus className="h-4 w-4" />
            Üye Davet Et
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left font-mono text-[11px] uppercase tracking-wide text-slate-400">
              {MEMBER_COLUMNS.map((col) => (
                <th key={col.id} className="px-5 py-3 font-medium">
                  {col.label}
                </th>
              ))}
              <th className="px-5 py-3 text-right font-medium">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {members.length === 0 ? (
              <tr>
                <td colSpan={colSpan}>
                  <EmptyState
                    icon={Users}
                    title="Ekip üyesi yok"
                    description="Davet ettiğiniz üyeler burada listelenir."
                  />
                </td>
              </tr>
            ) : (
              members.map((m) => (
                <tr key={m.id} className="text-slate-700">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={m.name} size="sm" />
                      <div className="min-w-0">
                        <p className="font-medium text-slate-900">{m.name}</p>
                        <p className="text-xs text-slate-400">{m.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-500">
                    {ROLE_LABELS[m.role] ?? "—"}
                  </td>
                  <td className="px-5 py-3">
                    <AvailabilityBadge status={m.availability} />
                  </td>
                  <td className="px-5 py-3 text-slate-500">{m.queue ?? "—"}</td>
                  <td className="px-5 py-3">{m.activeCount ?? 0}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {canManageTeam ? (
                        <>
                          <button
                            type="button"
                            onClick={() => onEdit?.(m)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                            aria-label="Düzenle"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDelete?.(m.id)}
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
    </div>
  );
}
