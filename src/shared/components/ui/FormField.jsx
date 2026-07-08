/**
 * FormField — wraps a control with a label (always above) and optional hint.
 */
export default function FormField({
  label,
  hint,
  htmlFor,
  className = "",
  children,
}) {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}
      {children}
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}
