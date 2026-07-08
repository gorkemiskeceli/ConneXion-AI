import { Sparkles } from "lucide-react";

/**
 * AiSuggestions — AI-suggested replies shown above the composer.
 * Renders nothing when there are no suggestions.
 * suggestions: string[]
 */
export default function AiSuggestions({ suggestions = [], onPick }) {
  if (suggestions.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 px-4 py-2.5">
      <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide text-primary-600">
        <Sparkles className="h-3 w-3" /> Öneriler
      </span>
      {suggestions.map((text, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onPick?.(text)}
          className="rounded-full border border-primary-100 bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 transition-colors hover:bg-primary-100"
        >
          {text}
        </button>
      ))}
    </div>
  );
}
