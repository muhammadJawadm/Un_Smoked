import { createContext, useCallback, useContext, useRef, useState } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";

const ToastContext = createContext(null);

const STYLES = {
  success: { icon: CheckCircle, className: "bg-green-50 text-green-700 border-green-200" },
  error:   { icon: AlertCircle, className: "bg-red-50 text-red-700 border-red-200" },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const show = useCallback((message, type = "success", duration = 3000) => {
    const id = ++idRef.current;
    setToasts((t) => [...t, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => dismiss(id), duration);
    }
    return id;
  }, [dismiss]);

  const toast = {
    success: (message, duration) => show(message, "success", duration),
    error:   (message, duration) => show(message, "error", duration),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm">
        {toasts.map(({ id, message, type }) => {
          const { icon: Icon, className } = STYLES[type] ?? STYLES.success;
          return (
            <div
              key={id}
              className={`flex items-start gap-2 px-4 py-3 rounded-lg shadow-lg border text-sm font-medium ${className}`}
              role="status"
            >
              <Icon className="size-4 shrink-0 mt-0.5" />
              <span className="flex-1">{message}</span>
              <button onClick={() => dismiss(id)} className="shrink-0 opacity-60 hover:opacity-100">
                <X className="size-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
