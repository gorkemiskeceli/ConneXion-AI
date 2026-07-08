import { MessageSquare, Send } from "lucide-react";

/**
 * WidgetPreview — a static preview of the embedded chat widget that reflects
 * the current widget configuration (brand color, welcome message, questions).
 */
export default function WidgetPreview({
  brandColor = "#5B63F0",
  welcomeMessage = "",
  suggestedQuestions = [],
  logoText = "AI",
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-wide text-slate-400">
        Önizleme
      </p>

      {/* Widget window */}
      <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div
          className="flex items-center gap-3 px-4 py-3 text-white"
          style={{ backgroundColor: brandColor }}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 font-heading text-xs font-bold">
            {logoText}
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold">Destek Asistanı</p>
            <p className="text-[11px] text-white/80">Çevrimiçi</p>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-3 px-4 py-4">
          <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-slate-100 px-3 py-2 text-sm text-slate-700">
            {welcomeMessage || "Merhaba! Size nasıl yardımcı olabilirim?"}
          </div>

          {suggestedQuestions.filter(Boolean).length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {suggestedQuestions.filter(Boolean).map((q, i) => (
                <span
                  key={i}
                  className="rounded-full border px-2.5 py-1 text-xs"
                  style={{ borderColor: brandColor, color: brandColor }}
                >
                  {q}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Composer */}
        <div className="flex items-center gap-2 border-t border-slate-100 px-3 py-2">
          <div className="flex-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-400">
            Mesaj yazın...
          </div>
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: brandColor }}
          >
            <Send className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      {/* Launcher */}
      <div className="mt-4 flex justify-end">
        <span
          className="inline-flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg"
          style={{ backgroundColor: brandColor }}
        >
          <MessageSquare className="h-5 w-5" />
        </span>
      </div>
    </div>
  );
}
