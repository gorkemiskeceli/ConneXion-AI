import { Search, MessagesSquare } from "lucide-react";

import EmptyState from "../../../shared/components/ui/EmptyState";
import ConversationListItem from "./ConversationListItem";
import InboxFilters from "./InboxFilters";

/**
 * ConversationList — Column 1 of the Inbox.
 * Header (title + count) · search · filters · scrollable list.
 */
export default function ConversationList({
  conversations = [],
  activeId,
  onSelect,
  search = "",
  onSearch,
  filter = "all",
  onFilter,
  className = "",
}) {
  return (
    <div className={`flex h-full flex-col ${className}`}>
      {/* Header */}
      <div className="space-y-3 border-b border-slate-200 px-4 pb-3 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-slate-900">Inbox</h2>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-500">
            {conversations.length}
          </span>
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch?.(e.target.value)}
            placeholder="Konuşma ara..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
        </div>

        <InboxFilters active={filter} onChange={onFilter} />
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <EmptyState
            icon={MessagesSquare}
            title="Konuşma yok"
            description="Yeni müşteri konuşmaları burada listelenir."
            className="h-full"
          />
        ) : (
          <ul className="divide-y divide-slate-100">
            {conversations.map((item) => (
              <li key={item.id}>
                <ConversationListItem
                  item={item}
                  active={item.id === activeId}
                  onClick={() => onSelect?.(item.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
