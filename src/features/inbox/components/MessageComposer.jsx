import { useState } from "react";
import { Paperclip, Mic, Send, Lock } from "lucide-react";

import { COMPOSER_MODE } from "../constants/inboxConfig";

/**
 * MessageComposer — the reply box.
 * Switches between a customer reply and an internal note. Each mode is gated
 * by permissions; when neither is allowed the composer is locked.
 *
 * Props: canReply, canAddNote, value, onChange, onSend
 */
export default function MessageComposer({
  canReply = false,
  canAddNote = false,
  value = "",
  onChange,
  onSend,
}) {
  const firstAllowed = canReply ? COMPOSER_MODE.REPLY : COMPOSER_MODE.NOTE;
  const [mode, setMode] = useState(firstAllowed);

  const locked = !canReply && !canAddNote;
  const isNote = mode === COMPOSER_MODE.NOTE;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend?.();
    }
  };

  if (locked) {
    return (
      <div className="flex items-center justify-center gap-2 border-t border-slate-200 px-4 py-4 text-sm text-slate-400">
        <Lock className="h-4 w-4" />
        Bu konuşmaya yanıt verme izniniz yok.
      </div>
    );
  }

  return (
    <div className="border-t border-slate-200 px-4 py-3">
      {/* Mode toggle */}
      <div className="mb-2 flex gap-1">
        {canReply && (
          <button
            type="button"
            onClick={() => setMode(COMPOSER_MODE.REPLY)}
            className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
              !isNote
                ? "bg-primary-50 text-primary-700"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            Yanıtla
          </button>
        )}
        {canAddNote && (
          <button
            type="button"
            onClick={() => setMode(COMPOSER_MODE.NOTE)}
            className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
              isNote
                ? "bg-amber-50 text-amber-700"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            Dahili Not
          </button>
        )}
      </div>

      <div
        className={`rounded-xl border px-3 py-2 transition-colors ${
          isNote ? "border-amber-200 bg-amber-50/50" : "border-slate-200 bg-white"
        }`}
      >
        <textarea
          rows={1}
          value={value}
          onChange={(e) => {
            onChange?.(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
          }}
          onKeyDown={handleKeyDown}
          placeholder={isNote ? "Dahili not ekle..." : "Bir yanıt yaz..."}
          className="w-full min-h-[44px] max-h-[120px] resize-none overflow-y-auto bg-transparent px-1 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none break-words"
        />

        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              aria-label="Dosya ekle"
            >
              <Paperclip className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              aria-label="Sesli mesaj"
            >
              <Mic className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => onSend?.()}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-medium text-white transition-colors ${
              isNote
                ? "bg-amber-500 hover:bg-amber-600"
                : "bg-primary hover:bg-primary-600"
            }`}
          >
            <Send className="h-4 w-4" />
            {isNote ? "Not Ekle" : "Gönder"}
          </button>
        </div>
      </div>
    </div>
  );
}
