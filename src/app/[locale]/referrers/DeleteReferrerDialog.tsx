"use client";

import { useTranslations } from "next-intl";
import { AppAlertDialog } from "@/components/AppAlertDialog";
import { ReferrerData } from "@/types/Referrer";

interface DeleteReferrerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedReferrer?: ReferrerData;
  handleConfirmDelete: () => void;
}

export const DeleteReferrerDialog = ({
  open,
  onOpenChange,
  selectedReferrer,
  handleConfirmDelete,
}: DeleteReferrerDialogProps) => {
  const t = useTranslations("Referrers");

  return (
    <AppAlertDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t("deleteReferrerTitle")}
      description={t("deleteReferrerDescription", {
        referrer: selectedReferrer?.referrer || "",
      })}
      confirmText={t("delete")}
      cancelText={t("cancel")}
      onConfirm={handleConfirmDelete}
    />
  );
};