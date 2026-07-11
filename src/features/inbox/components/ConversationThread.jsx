import { useState } from "react";
import { UserPlus, ArrowLeftRight, UserCog, CheckCircle2 } from "lucide-react";

import Avatar from "../../../shared/components/ui/Avatar";
import Badge from "../../../shared/components/ui/Badge";
import EmptyState from "../../../shared/components/ui/EmptyState";
import MessageBubble from "./MessageBubble";
import AiSuggestions from "./AiSuggestions";
import MessageComposer from "./MessageComposer";
import { CONVERSATION_STATUS } from "../constants/inboxConfig";
import { canInbox, INBOX_ACTION } from "../../../constants/permissions";

/**
 * ConversationThread — Column 2.
 * Header (customer + status + permission-gated actions) · messages · AI
 * suggestions · composer.
 *
 * Action buttons appear only when the active role permits them — visibility
 * comes from the centralized permission map, not inline role checks.
 */
export default function ConversationThread({
  role,
  conversation,
  messages = [],
  aiSuggestions = [],
  onSend,
  onResolveTicket,
}) {
  const [draft, setDraft] = useState("");
  const [toast, setToast] = useState("");
  const status = CONVERSATION_STATUS[conversation.status] ?? CONVERSATION_STATUS.open;

  const actions = [
    { key: INBOX_ACTION.ASSIGN, label: "Ata", icon: UserPlus },
    { key: INBOX_ACTION.REASSIGN, label: "Yeniden Ata", icon: ArrowLeftRight },
    { key: INBOX_ACTION.HANDOFF, label: "Temsilciye Aktar", icon: UserCog },
    { key: INBOX_ACTION.CLOSE, label: "Kapat", icon: CheckCircle2 },
  ].filter((a) => canInbox(role, a.key));

  const handleResolve = () => {
    onResolveTicket?.(conversation.id);
    setToast("Destek talebi düzeltildi olarak işaretlendi!");
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="relative flex h-full flex-col">
      {/* Toast Alert Notification inside Thread */}
      {toast && (
        <div className="absolute right-6 top-16 z-50 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-800 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar name={conversation.name} size="md" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {conversation.name}
            </p>
            <Badge variant={status.variant} className="mt-0.5">
              {status.label}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {conversation.channel === "ticket" && conversation.status !== "closed" && (
            <button
              type="button"
              onClick={handleResolve}
              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-250 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer mr-1"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2.2} />
              Düzeltildi
            </button>
          )}

          {actions.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={1.9} />
              <span className="hidden xl:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto bg-surface/50 px-5 py-5">
        {messages.length === 0 ? (
          <EmptyState
            title="Mesaj yok"
            description="Bu konuşmadaki mesajlar burada görünecek."
            className="h-full"
          />
        ) : (
          messages.map((m) => {
            const selfSender = role === "support_agent" ? "agent" : "customer";
            return (
              <MessageBubble 
                key={m.id} 
                message={m} 
                self={m.sender === selfSender} 
              />
            );
          })
        )}
      </div>

      {/* AI suggestions + composer */}
      <div className="bg-white">
        <AiSuggestions suggestions={aiSuggestions} onPick={setDraft} />
        <MessageComposer
          canReply={canInbox(role, INBOX_ACTION.REPLY)}
          canAddNote={canInbox(role, INBOX_ACTION.ADD_NOTE)}
          value={draft}
          onChange={setDraft}
          onSend={() => {
            if (draft.trim()) {
              onSend?.(draft);
              setDraft("");
            }
          }}
        />
      </div>
    </div>
  );
}
