"use client";

import { toast as sonnerToast } from "sonner";
import { ReactNode } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Info,
  XCircle,
  Loader2,
  X,
  Calendar,
  Copy,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"
  | "event";

export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

interface ToastOptions {
  duration?: number;
  position?: ToastPosition;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: ReactNode;
  closeButton?: boolean;
  className?: string;
  showCopyButton?: boolean;
  date?: Date;
}

export const toast = (
  type: ToastType,
  title: ReactNode,
  description?: ReactNode,
  options?: ToastOptions
) => {
  const {
    duration = 3000,
    position = "top-center",
    action,
    icon,
    closeButton = true,
    className,
    showCopyButton = false,
    date,
  } = options || {};

  const defaultIcon = {
    success: <CheckCircle2 className="w-4 h-4 text-green-500" />,
    error: <XCircle className="w-4 h-4 text-red-500" />,
    warning: <AlertCircle className="w-4 h-4 text-yellow-500" />,
    info: <Info className="w-4 h-4 text-blue-500" />,
    loading: <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />,
    event: <Calendar className="w-4 h-4 text-purple-500" />,
  }[type];

  const toastId = sonnerToast.custom(
    (id) => {
      return (
        <div
          className={cn(
            "w-[360px] p-4 rounded-lg shadow-md flex gap-3",
            "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700",
            "transition-all duration-300 ease-in-out",
            className
          )}
        >
          {/* Icon */}
          <div className="flex-shrink-0 pt-1">{icon || defaultIcon}</div>

          {/* Content */}
          <div className="flex-1">
            {/* Title + Close */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white break-words">
                {title}
              </h3>

              {closeButton && (
                <button
                  onClick={() => {
                    sonnerToast.dismiss(id);
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Description */}
            {description && (
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 break-words">
                {description}
              </p>
            )}

            {/* Date */}
            {date && (
              <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="w-3 h-3 mr-1.5" />
                {date.toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
                <span className="mx-1.5">•</span>
                {date.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </div>
            )}

            {/* Actions */}
            {(action || showCopyButton) && (
              <div className="flex gap-2 mt-3">
                {action && (
                  <button
                    onClick={action.onClick}
                    className="text-xs font-medium px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors"
                  >
                    {action.label}
                  </button>
                )}

                {showCopyButton && typeof description === "string" && (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(description);
                      sonnerToast.success("Copied to clipboard");
                    }}
                    className="text-xs font-medium px-3 py-1 rounded flex items-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors"
                  >
                    <Copy className="w-3 h-3 mr-1.5" /> Copy
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      );
    },
    {
      duration,
      position,
    }
  );

  return toastId;
};

// Shortcut helpers
toast.success = (
  title: ReactNode,
  description?: ReactNode,
  options?: ToastOptions
) => toast("success", title, description, options);

toast.error = (
  title: ReactNode,
  description?: ReactNode,
  options?: ToastOptions
) => toast("error", title, description, options);

toast.warning = (
  title: ReactNode,
  description?: ReactNode,
  options?: ToastOptions
) => toast("warning", title, description, options);

toast.info = (
  title: ReactNode,
  description?: ReactNode,
  options?: ToastOptions
) => toast("info", title, description, options);

toast.loading = (
  title: ReactNode,
  description?: ReactNode,
  options?: ToastOptions
) => toast("loading", title, description, options);

toast.event = (
  title: ReactNode,
  description?: ReactNode,
  options?: ToastOptions & { date: Date }
) => toast("event", title, description, options);

toast.dismiss = (id?: number | string) => {
  sonnerToast.dismiss(id);
};
