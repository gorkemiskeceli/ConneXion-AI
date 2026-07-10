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
}) {
  const [draft, setDraft] = useState("");
  const status = CONVERSATION_STATUS[conversation.status] ?? CONVERSATION_STATUS.open;

  const actions = [
    { key: INBOX_ACTION.ASSIGN, label: "Ata", icon: UserPlus },
    { key: INBOX_ACTION.REASSIGN, label: "Yeniden Ata", icon: ArrowLeftRight },
    { key: INBOX_ACTION.HANDOFF, label: "Temsilciye Aktar", icon: UserCog },
    { key: INBOX_ACTION.CLOSE, label: "Kapat", icon: CheckCircle2 },
  ].filter((a) => canInbox(role, a.key));

  return (
    <div className="flex h-full flex-col">
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
          {actions.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50"
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
          messages.map((m) => <MessageBubble key={m.id} message={m} />)
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
