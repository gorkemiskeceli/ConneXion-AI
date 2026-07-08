import { Layers, FolderCog } from "lucide-react";

import { KB_CATEGORIES } from "../constants/knowledgeBaseConfig";

/**
 * CategorySidebar — left panel of the Knowledge Base.
 * Lists "Tüm İçerikler" plus each content category with its count.
 * The manage-categories button is gated by `canOrganize`.
 */
export default function CategorySidebar({
  active = "all",
  onSelect,
  counts = {},
  canOrganize = false,
}) {
  const Item = ({ id, label, icon: Icon, count }) => {
    const isActive = id === active;
    return (
      <button
        type="button"
        onClick={() => onSelect?.(id)}
        className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          isActive
            ? "bg-primary-50 text-primary-700"
            : "text-slate-600 hover:bg-slate-50"
        }`}
      >
        <Icon className="h-4 w-4" strokeWidth={1.9} />
        <span className="flex-1 text-left">{label}</span>
        <span className="font-mono text-[11px] text-slate-400">
          {count ?? "—"}
        </span>
      </button>
    );
  };

  return (
    <div className="rounded-2xl bg-white p-3 shadow-card md:w-64 md:shrink-0">
      <div className="mb-1 flex items-center justify-between px-2 py-1">
        <h3 className="font-mono text-[11px] font-medium uppercase tracking-wide text-slate-400">
          Kategoriler
        </h3>
        {canOrganize && (
          <button
            type="button"
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Kategorileri yönet"
          >
            <FolderCog className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="space-y-0.5">
        <Item id="all" label="Tüm İçerikler" icon={Layers} count={counts.all} />
        {KB_CATEGORIES.map((cat) => (
          <Item key={cat.id} {...cat} count={counts[cat.id]} />
        ))}
      </div>
    </div>
  );
}
