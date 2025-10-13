"use client";

import { useTranslations } from "next-intl";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TextField } from "@/components/FormFields/TextField";
import { AppDialog } from "@/components/AppDialog";
import { getCreateReferrerSchema, CreateReferrerFormValues } from "./validation";

import { useRef } from "react";

type FormValues = CreateReferrerFormValues;

interface CreateReferrerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleConfirmCreate: (formValue: CreateReferrerFormValues) => void;
}

export const CreateReferrerDialog = ({
  open,
  onOpenChange,
  handleConfirmCreate,
}: CreateReferrerDialogProps) => {
  const t = useTranslations("Referrers");
  const formRef = useRef<HTMLFormElement>(null);
  const schema = getCreateReferrerSchema(t);

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      referrer: "",
      alias: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (data: FormValues) => {
    handleConfirmCreate(data);
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
      label: t("create"),
      onClick: () => {
        formRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
      },
      disabled: false,
    },
  ];

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t("createReferrerTitle")}
      description={t("createReferrerDescription")}
      footerActions={footerActions}
      closeOnOverlayClick={false}
    >
      <FormProvider {...methods}>
        <form
          ref={formRef}
          onSubmit={methods.handleSubmit(onSubmit)}
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