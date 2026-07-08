import { ScrollText } from "lucide-react";

import StudioSection from "../StudioSection";
import EmptyState from "../../../../shared/components/ui/EmptyState";
import Badge from "../../../../shared/components/ui/Badge";
import { LOG_COLUMNS } from "../../constants/aiStudioConfig";

/**
 * AiLogsSection — read-only log of AI activity.
 * log: { id, time, event, confidence, action }
 */
export default function AiLogsSection({ logs = [] }) {
  return (
    <StudioSection
      title="AI Kayıtları"
      description="Asistanın ürettiği yanıtları ve aldığı aksiyonları inceleyin."
    >
      {logs.length === 0 ? (
        <EmptyState
          icon={ScrollText}
          title="Kayıt bulunmuyor"
          description="Asistan çalışmaya başladığında etkinlik kayıtları burada görünür."
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left font-mono text-[11px] uppercase tracking-wide text-slate-400">
                {LOG_COLUMNS.map((col) => (
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
                  <td className="px-4 py-3">{log.event}</td>
                  <td className="px-4 py-3">%{log.confidence}</td>
                  <td className="px-4 py-3">
                    <Badge variant="neutral">{log.action}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </StudioSection>
  );
}
