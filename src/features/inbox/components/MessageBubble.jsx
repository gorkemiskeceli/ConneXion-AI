import { Play, Sparkles } from "lucide-react";

import { SENDER, MESSAGE_TYPE } from "../constants/inboxConfig";

/**
 * MessageBubble — one message in the thread.
 * message: { sender, type, text, duration, transcript, timestamp }
 * Customer messages align left; agent/AI align right.
 */
export default function MessageBubble({ message }) {
  const isCustomer = message.sender === SENDER.CUSTOMER;
  const isAi = message.sender === SENDER.AI;

  const bubbleStyle = isCustomer
    ? "bg-white border border-slate-200 text-slate-700"
    : isAi
    ? "bg-primary-50 text-slate-700"
    : "bg-primary text-white";

  return (
    <div className={`flex ${isCustomer ? "justify-start" : "justify-end"}`}>
      <div className="max-w-[78%]">
        {isAi && (
          <span className="mb-1 flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide text-primary-600">
            <Sparkles className="h-3 w-3" /> AI Asistan
          </span>
        )}

        <div className={`rounded-2xl px-4 py-2.5 text-sm ${bubbleStyle}`}>
          {message.type === MESSAGE_TYPE.VOICE ? (
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
                  isCustomer ? "bg-slate-100 text-slate-600" : "bg-white/20 text-current"
                }`}
              >
                <Play className="h-4 w-4" />
              </span>
              {/* Static waveform placeholder */}
              <span className="flex items-center gap-0.5">
                {[6, 12, 8, 16, 10, 14, 7, 12, 9].map((h, i) => (
                  <span
                    key={i}
                    className={`w-0.5 rounded-full ${
                      isCustomer ? "bg-slate-300" : "bg-white/60"
                    }`}
                    style={{ height: `${h}px` }}
                  />
                ))}
              </span>
              <span className="font-mono text-[11px] opacity-80">
                {message.duration ?? "0:00"}
              </span>
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{message.text}</p>
          )}
        </div>

        <span
          className={`mt-1 block font-mono text-[10px] text-slate-400 ${
            isCustomer ? "text-left" : "text-right"
          }`}
        >
          {message.timestamp}
        </span>
      </div>
    </div>
  );
}
