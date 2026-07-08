import { Plus, Layers, Users, Clock, Pencil, Trash2, UserPlus } from "lucide-react";

import Avatar from "../../../shared/components/ui/Avatar";
import Badge from "../../../shared/components/ui/Badge";
import EmptyState from "../../../shared/components/ui/EmptyState";
import { QUEUE_STATUS } from "../constants/teamQueuesConfig";
import { canTeamQueues, TEAM_ACTION } from "../../../constants/permissions";

/**
 * AgentStack — overlapping avatars of agents assigned to a queue.
 */
function AgentStack({ agents = [] }) {
  if (!agents.length) return <span className="text-sm text-slate-300">Atanmadı</span>;
  const shown = agents.slice(0, 4);
  const rest = agents.length - shown.length;
  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {shown.map((a) => (
          <Avatar
            key={a.id}
            name={a.name}
            size="sm"
            className="ring-2 ring-white"
          />
        ))}
      </div>
      {rest > 0 && (
        <span className="ml-2 text-xs font-medium text-slate-400">+{rest}</span>
      )}
    </div>
  );
}

/**
 * QueuesTab — support queues.
 * queue: { id, name, description, status, waiting, agents: [{ id, name }] }
 */
export default function QueuesTab({ role, queues = [] }) {
  const canManageQueue = canTeamQueues(role, TEAM_ACTION.MANAGE_QUEUE);
  const canAssign = canTeamQueues(role, TEAM_ACTION.MANAGE_ASSIGNMENT);

  return (
    <div>
      {canManageQueue && (
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600"
          >
            <Plus className="h-4 w-4" />
            Yeni Kuyruk
          </button>
        </div>
      )}

      {queues.length === 0 ? (
        <div className="rounded-2xl bg-white shadow-card">
          <EmptyState
            icon={Layers}
            title="Kuyruk yok"
            description="Oluşturduğunuz destek kuyrukları burada görünür."
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {queues.map((q) => {
            const status = QUEUE_STATUS[q.status] ?? QUEUE_STATUS.active;
            return (
              <div key={q.id} className="rounded-2xl bg-white p-5 shadow-card">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate font-heading text-base font-bold text-slate-900">
                      {q.name}
                    </h3>
                    {q.description && (
                      <p className="mt-0.5 truncate text-sm text-slate-500">
                        {q.description}
                      </p>
                    )}
                  </div>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>

                <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-slate-400" />
                    {q.agents?.length ?? 0} temsilci
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-slate-400" />
                    {q.waiting ?? 0} bekleyen
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                  <AgentStack agents={q.agents} />
                  <div className="flex items-center gap-1">
                    {canAssign && (
                      <button
                        type="button"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        aria-label="Temsilci ata"
                      >
                        <UserPlus className="h-4 w-4" />
                      </button>
                    )}
                    {canManageQueue && (
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
                          aria-label="Sil"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
