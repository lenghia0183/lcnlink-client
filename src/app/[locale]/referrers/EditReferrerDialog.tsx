"use client";

import { useTranslations } from "next-intl";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TextField } from "@/components/FormFields/TextField";
import { AppDialog } from "@/components/AppDialog";
import { 
  getEditReferrerSchema, 
  EditReferrerFormValues 
} from "./validation";
import { ReferrerData } from "@/types/Referrer";
import { useEffect } from "react";

type FormValues = EditReferrerFormValues;

interface EditReferrerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedReferrer?: ReferrerData;
  handleConfirmEdit: (formValue: EditReferrerFormValues) => void;
}

export const EditReferrerDialog = ({
  open,
  onOpenChange,
  selectedReferrer,
  handleConfirmEdit,
}: EditReferrerDialogProps) => {
  const t = useTranslations("Referrers");

  const initialData: FormValues = {
    referrer: "",
    alias: "",
  };

  const schema = getEditReferrerSchema(t);
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
    mode: "onChange",
  });

  useEffect(() => {
    if (selectedReferrer) {
      methods.reset({
        referrer: selectedReferrer.referrer,
        alias: selectedReferrer.alias,
      });
    }
  }, [selectedReferrer, methods]);

  const handleSubmit = (data: FormValues) => {
    handleConfirmEdit(data);
    onOpenChange(false);
    methods.reset();
  };

  const footerActions = [
    {
      label: t("cancel"),
      onClick: () => onOpenChange(false),
      variant: "outline" as const,
      disabled: false,
    },
    {
      label: t("update"),
      onClick: methods.handleSubmit(handleSubmit),
      disabled: !methods.formState.isValid,
    },
  ];

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t("editReferrerTitle")}
      description={t("editReferrerDescription")}
      footerActions={footerActions}
      closeOnOverlayClick={false}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="space-y-4"
          noValidate
        >
          <TextField
            name="referrer"
            label={t("referrerLabel")}
            placeholder={t("referrerPlaceholder")}
            required
          />
          <TextField
            name="alias"
            label={t("aliasLabel")}
            placeholder={t("aliasPlaceholder")}
          />
        </form>
      </FormProvider>
    </AppDialog>
  );
};