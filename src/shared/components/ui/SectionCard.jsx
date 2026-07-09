import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * SectionCard — primary layout container for dashboard panels.
 *
 * Glassmorphic surface, rounded corners, soft shadow, generous padding.
 * Designed to look like a frosted glass panel floating over the background.
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
      className={`flex flex-col rounded-[24px] border border-white/45 bg-white/45 backdrop-blur-lg shadow-card hover:shadow-card-hover hover:scale-[1.005] transition-all duration-300 ${className}`}
    >
      {(title || headerRight) && (
        <header className="flex items-center justify-between gap-3 px-5 pt-5">
          {title && (
            <h3 className="font-heading text-base font-extrabold text-slate-800">
              {title}
            </h3>
          )}
          {headerRight}
        </header>
      )}

      <div className={`flex-1 px-5 py-4 ${bodyClassName}`}>{children}</div>

      {footerLink && (
        <footer className="border-t border-white/20 px-5 py-3 text-center">
          <Link
            to={footerLink.to}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
          >
            {footerLink.label}
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </footer>
      )}
    </section>
  );
}
