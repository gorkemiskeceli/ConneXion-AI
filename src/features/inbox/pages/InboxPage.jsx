import { MessagesSquare } from "lucide-react";

import useInbox from "../hooks/useInbox";
import ConversationList from "../components/ConversationList";
import ConversationThread from "../components/ConversationThread";
import CustomerPanel from "../components/CustomerPanel";
import EmptyState from "../../../shared/components/ui/EmptyState";
import { ROLES } from "../../../constants/navigation";

/**
 * InboxPage — the most important page in the app.
 *
 * Fixed three-column layout (never changes):
 *   1. Conversation List   2. Conversation Thread   3. Customer Information
 *
 * The whole workspace is one tall card that fills the viewport; each column
 * scrolls independently. With no data (template), the list and customer panel
 * show empty states and the center prompts to select a conversation.
 *
 * `role` drives which thread actions and composer modes appear — passed from
 * the session in a real app; defaults to Platform Admin here.
 */
export default function InboxPage({ role = ROLES.PLATFORM_ADMIN }) {
  const {
    conversations,
    activeConversation,
    activeConversationId,
    setActiveConversationId,
    messages,
    customer,
    notes,
    aiSummary,
    aiSuggestions,
    filter,
    setFilter,
    search,
    setSearch,
  } = useInbox();

  return (
    <div className="h-[calc(100vh-10rem)] min-h-[560px] overflow-hidden rounded-2xl bg-white shadow-card">
      <div className="flex h-full">
        {/* Column 1 — Conversation List */}
        <ConversationList
          className="w-full shrink-0 border-r border-slate-200 md:w-[340px]"
          conversations={conversations}
          activeId={activeConversationId}
          onSelect={setActiveConversationId}
          search={search}
          onSearch={setSearch}
          filter={filter}
          onFilter={setFilter}
        />

        {/* Column 2 — Conversation Thread */}
        <div className="hidden min-w-0 flex-1 md:flex">
          {activeConversation ? (
            <ConversationThread
              role={role}
              conversation={activeConversation}
              messages={messages}
              aiSuggestions={aiSuggestions}
            />
          ) : (
            <EmptyState
              icon={MessagesSquare}
              title="Bir konuşma seçin"
              description="Görüntülemek ve yanıtlamak için soldan bir konuşma seçin."
              className="h-full w-full"
            />
          )}
        </div>

        {/* Column 3 — Customer Information */}
        <CustomerPanel
          className="hidden w-[330px] shrink-0 border-l border-slate-200 xl:flex"
          customer={activeConversation ? customer : null}
          notes={notes}
          aiSummary={aiSummary}
        />
      </div>
    </div>
  );
}
