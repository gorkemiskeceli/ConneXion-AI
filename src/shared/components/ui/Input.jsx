/**
 * Input — styled text input used across all forms.
 * Forwards native props (type, value, onChange, disabled, placeholder, …).
 */
export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 transition-colors focus:border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 ${className}`}
      {...props}
    />
  );
}
