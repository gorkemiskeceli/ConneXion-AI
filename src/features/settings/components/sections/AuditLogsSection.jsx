import { ScrollText } from "lucide-react";

import SettingsSection from "../SettingsSection";
import EmptyState from "../../../../shared/components/ui/EmptyState";
import { AUDIT_COLUMNS } from "../../constants/settingsConfig";

/**
 * AuditLogsSection — record of actions taken in the workspace.
 * log: { id, time, user, action, detail }
 */
export default function AuditLogsSection({ logs = [] }) {
  return (
    <SettingsSection
      title="Denetim Kayıtları"
      description="Workspace içinde yapılan işlemlerin kaydı."
    >
      {logs.length === 0 ? (
        <EmptyState
          icon={ScrollText}
          title="Kayıt bulunmuyor"
          description="Yapılan değişiklikler ve işlemler burada listelenir."
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left font-mono text-[11px] uppercase tracking-wide text-slate-400">
                {AUDIT_COLUMNS.map((col) => (
                  <th key={col} className="px-4 py-3 font-medium">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {logs.map((log) => (
                <tr key={log.id} className="text-slate-700">
                  <td className="px-4 py-3 font-mono text-xs text-slate-400">
                    {log.time}
                  </td>
                  <td className="px-4 py-3">{log.user}</td>
                  <td className="px-4 py-3">{log.action}</td>
                  <td className="px-4 py-3 text-slate-500">{log.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </SettingsSection>
  );
}
