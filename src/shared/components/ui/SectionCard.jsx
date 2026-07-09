import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * SectionCard — primary layout container for dashboard panels.
 *
 * Implements the third design style:
 * - Frosted-glassmorphism treatment (bg-white/65 + backdrop-blur-xl)
 * - Subtle glass border (border-white/30)
 * - Soft diffused shadow (shadow-[0_8px_32px_rgba(15,23,42,0.08)])
 * - High corner radius (rounded-[24px])
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
      className={`flex flex-col rounded-[24px] border border-white/30 bg-white/65 backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.08)] hover:bg-white/75 hover:shadow-[0_12px_40px_rgba(15,23,42,0.1)] hover:scale-[1.002] transition-all duration-300 ${className}`}
    >
      {(title || headerRight) && (
        <header className="flex items-center justify-between gap-3 px-5 pt-5">
          {title && (
            <h3 className="font-heading text-sm font-extrabold text-slate-900">
              {title}
            </h3>
          )}
          {headerRight}
        </header>
      )}

      <div className={`flex-1 px-5 py-4 ${bodyClassName}`}>{children}</div>

      {footerLink && (
        <footer className="border-t border-slate-100/40 px-5 py-3 text-center">
          <Link
            to={footerLink.to}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-600"
          >
            {footerLink.label}
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </footer>
      )}
    </section>
  );
}
