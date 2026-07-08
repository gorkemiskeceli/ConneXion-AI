import { Save } from "lucide-react";

/**
 * StudioSection — consistent wrapper for each studio section.
 * Header (title + description) · body · optional Save footer.
 * The Save button appears only when `canEdit` and `onSave` are provided —
 * view-only roles (Manager) never see it.
 */
export default function StudioSection({
  title,
  description,
  canEdit = false,
  onSave,
  children,
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-slate-100 px-6 py-4">
        <h3 className="font-heading text-base font-bold text-slate-900">
          {title}
        </h3>
        {description && (
          <p className="mt-0.5 text-sm text-slate-500">{description}</p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

      {canEdit && onSave && (
        <div className="flex justify-end border-t border-slate-100 px-6 py-3">
          <button
            type="button"
            onClick={onSave}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600"
          >
            <Save className="h-4 w-4" />
            Kaydet
          </button>
        </div>
      )}
    </div>
  );
}
