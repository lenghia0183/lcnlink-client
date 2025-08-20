"use client";

import { AppAlertDialog } from "@/components/AppAlertDialog";
import { LinkData } from "@/types/Link";
import { useTranslations } from "next-intl";

interface DeleteLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleConfirmDelete: () => void;
  selectedLink?: LinkData;
}

export function DeleteLinkDialog({
  open,
  onOpenChange,
  selectedLink,
  handleConfirmDelete,
}: DeleteLinkDialogProps) {
  const t = useTranslations("Dashboard");

  return (
    <AppAlertDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t("deleteLinkTitle")}
      description={
        selectedLink
          ? t("deleteLinkDescription", {
              name: selectedLink?.alias || "",
            })
          : t("deleteLinkDefaultDescription")
      }
      confirmText={t("delete")}
      cancelText={t("cancel")}
      onConfirm={handleConfirmDelete}
      onCancel={() => onOpenChange(false)}
    />
  );
}
