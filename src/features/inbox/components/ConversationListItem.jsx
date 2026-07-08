import Avatar from "../../../shared/components/ui/Avatar";
import { CONVERSATION_STATUS, CHANNEL } from "../constants/inboxConfig";

/**
 * ConversationListItem — one conversation row.
 * item: { id, name, preview, time, unread, status, channel }
 */
export default function ConversationListItem({ item, active = false, onClick }) {
  const status = CONVERSATION_STATUS[item.status] ?? CONVERSATION_STATUS.open;
  const channel = CHANNEL[item.channel] ?? CHANNEL.web;
  const ChannelIcon = channel.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full gap-3 border-l-2 px-4 py-3 text-left transition-colors ${
        active
          ? "border-primary bg-primary-50/60"
          : "border-transparent hover:bg-slate-50"
      }`}
    >
      <Avatar name={item.name} size="md" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-semibold text-slate-900">
            {item.name}
          </span>
          <span className="shrink-0 font-mono text-[11px] text-slate-400">
            {item.time}
          </span>
        </div>
        <p className="mt-0.5 truncate text-xs text-slate-500">{item.preview}</p>
        <div className="mt-1.5 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
              status.variant === "primary"
                ? "bg-primary-50 text-primary-700"
                : status.variant === "warning"
                ? "bg-amber-50 text-amber-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {status.label}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] text-slate-400">
            <ChannelIcon className="h-3 w-3" strokeWidth={1.9} />
            {channel.label}
          </span>
        </div>
      </div>
      {item.unread > 0 && (
        <span className="mt-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-white">
          {item.unread}
        </span>
      )}
    </button>
  );
}
