import { createContext, useContext, useState, useCallback } from "react";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success", duration = 3000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container overlay */}
      <div className="fixed bottom-6 left-1/2 z-[9999] flex -translate-x-1/2 flex-col gap-2 max-w-md w-full px-4 pointer-events-none">
        {toasts.map((toast) => {
          const Icon = toast.type === "error" ? AlertCircle : toast.type === "info" ? Info : CheckCircle2;
          
          let colors = "bg-emerald-500/10 border-emerald-500/35 text-emerald-800";
          if (toast.type === "error") {
            colors = "bg-red-500/10 border-red-500/35 text-red-800";
          } else if (toast.type === "info") {
            colors = "bg-blue-500/10 border-blue-500/35 text-blue-800";
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-center justify-between gap-3 rounded-full border px-4 py-2.5 backdrop-blur-md shadow-lg transition-all animate-in fade-in slide-in-from-bottom-4 duration-300 ${colors}`}
            >
              <div className="flex items-center gap-2">
                <Icon className="h-4.5 w-4.5 shrink-0" />
                <span className="text-xs font-semibold">{toast.message}</span>
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="rounded-full p-0.5 hover:bg-black/5 text-current opacity-70 hover:opacity-100 transition-opacity"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
