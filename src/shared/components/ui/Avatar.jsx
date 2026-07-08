import { User } from "lucide-react";

const SIZES = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-11 w-11 text-sm",
};

/**
 * Avatar — shows an image, initials, or a neutral icon fallback.
 * Kept presentational; all data arrives via props.
 */
export default function Avatar({ name = "", src, size = "md", className = "" }) {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-100 font-heading font-semibold text-primary-700 ${SIZES[size]} ${className}`}
    >
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : initials ? (
        initials
      ) : (
        <User className="h-1/2 w-1/2 text-primary-600" strokeWidth={1.75} />
      )}
    </span>
  );
}
