import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * SectionCard — primary layout container for dashboard panels.
 *
 * White surface, rounded corners, soft shadow, generous padding.
 * Optional header title, a right-aligned slot (e.g. a filter/count),
 * and a footer "see all" link that routes via React Router.
 */
export default function SectionCard({
  title,
  headerRight,
  footerLink, // { label, to }
  bodyClassName = "",
  className = "",
  children,
}) {
  return (
    <section
      className={`flex flex-col rounded-2xl bg-white shadow-card ${className}`}
    >
      {(title || headerRight) && (
        <header className="flex items-center justify-between gap-3 px-5 pt-5">
          {title && (
            <h3 className="font-heading text-base font-bold text-slate-900">
              {title}
            </h3>
          )}
          {headerRight}
        </header>
      )}

      <div className={`flex-1 px-5 py-4 ${bodyClassName}`}>{children}</div>

      {footerLink && (
        <footer className="border-t border-slate-100 px-5 py-3 text-center">
          <Link
            to={footerLink.to}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
          >
            {footerLink.label}
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </footer>
      )}
    </section>
  );
}
