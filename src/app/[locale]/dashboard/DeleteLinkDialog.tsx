"use client";

import { AppAlertDialog } from "@/components/AppAlertDialog";
import { LinkData } from "@/types/Link";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface DeleteLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLink?: LinkData;
}

export function DeleteLinkDialog({
  open,
  onOpenChange,
  selectedLink,
}: DeleteLinkDialogProps) {
  const t = useTranslations("Dashboard");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      console.log("selectedLink", selectedLink);
      setLoading(true);
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppAlertDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t("deleteLinkTitle")}
      description={
        selectedLink
          ? t("deleteLinkDescription", {
              name: selectedLink?.customAlias || "",
            })
          : t("deleteLinkDefaultDescription")
      }
      confirmText={t("delete")}
      cancelText={t("cancel")}
      onConfirm={handleConfirm}
      onCancel={() => onOpenChange(false)}
      loading={loading}
    />
  );
}
