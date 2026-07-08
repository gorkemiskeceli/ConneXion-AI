import { useState } from "react";
import { Send, FlaskConical, Sparkles } from "lucide-react";

import StudioSection from "../StudioSection";
import EmptyState from "../../../../shared/components/ui/EmptyState";

/**
 * TestPlaygroundSection — a chat surface for trying the agent.
 *
 * Interface only: sent messages appear locally; no AI response is generated
 * (simulation stub). Available to any role with playground access.
 */
export default function TestPlaygroundSection({ enabled = true }) {
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}`, sender: "user", text },
    ]);
    setDraft("");
  };

  return (
    <StudioSection
      title="Test Alanı"
      description="Asistanı yayına almadan önce burada deneyin. (Simülasyon)"
    >
      <div className="flex h-full min-h-[360px] flex-col rounded-xl border border-slate-100 bg-slate-50/40">
        {/* Messages */}
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <EmptyState
              icon={FlaskConical}
              title="Test etmeye başlayın"
              description="Bir mesaj gönderin; asistanın yanıtı burada görünecek."
              className="h-full"
            />
          ) : (
            messages.map((m) => (
              <div key={m.id} className="flex justify-end">
                <div className="max-w-[78%] rounded-2xl bg-primary px-4 py-2.5 text-sm text-white">
                  {m.text}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Simulation hint */}
        {messages.length > 0 && (
          <p className="flex items-center gap-1.5 px-4 pb-1 font-mono text-[11px] text-slate-400">
            <Sparkles className="h-3 w-3" />
            Simülasyon modu — AI yanıtları veri kaynağı bağlandığında görünür.
          </p>
        )}

        {/* Composer */}
        <div className="flex items-center gap-2 border-t border-slate-100 p-3">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            disabled={!enabled}
            placeholder="Bir mesaj yazın..."
            className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-100 disabled:bg-slate-50"
          />
          <button
            type="button"
            onClick={send}
            disabled={!enabled}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            Gönder
          </button>
        </div>
      </div>
    </StudioSection>
  );
}
