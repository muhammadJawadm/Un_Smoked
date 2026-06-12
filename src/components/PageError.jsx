import { AlertTriangle, RefreshCw } from "lucide-react";

export default function PageError({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center px-4">
      <AlertTriangle className="size-12 text-red-400 mb-4" />
      <h3 className="text-lg font-semibold text-gray-700 mb-1">Failed to load data</h3>
      <p className="text-sm text-gray-400 mb-6 max-w-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white rounded-lg hover:opacity-80"
          style={{ backgroundColor: "#836852" }}
        >
          <RefreshCw className="size-4" />
          Retry
        </button>
      )}
    </div>
  );
}
