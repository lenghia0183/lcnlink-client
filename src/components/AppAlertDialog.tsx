// components/ui/app-alert-dialog.tsx
"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

type AlertDialogProps = ComponentPropsWithoutRef<typeof AlertDialog>;

type AppAlertDialogProps = AlertDialogProps & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  trigger?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  loading?: boolean;
  className?: string;
};

export function AppAlertDialog({
  open,
  onOpenChange,
  title = "Are you sure?",
  description,
  trigger,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
  className,
  ...props
}: AppAlertDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange} {...props}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}

      <AlertDialogContent className={cn("", className)}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>

          <AlertDialogAction onClick={onConfirm} disabled={loading}>
            {loading ? "Loading..." : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
