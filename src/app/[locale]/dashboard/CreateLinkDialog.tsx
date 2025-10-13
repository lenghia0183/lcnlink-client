"use client";

import { useTranslations } from "next-intl";
import { useForm, FormProvider } from "react-hook-form";
import { getCreateLinkSchema, CreateLinkFormValues } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";

import { TextField } from "@/components/FormFields/TextField";
import { TextAreaField } from "@/components/FormFields/TextAreaField";
import { DatePickerField } from "@/components/FormFields/DatePickerField";
import { ReferrerSelectField } from "@/components/FormFields/ReferrerSelectField";
import { TEXTFIELD_ALLOW } from "@/constants/regexes";
import { AppDialog } from "@/components/AppDialog";

import { useRef } from "react";
import { addDays } from "date-fns";

type FormValues = CreateLinkFormValues;

interface CreateLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleConfirmCreate: (formValue: CreateLinkFormValues) => void;
}

export const CreateLinkDialog = ({
  open,
  onOpenChange,
  handleConfirmCreate,
}: CreateLinkDialogProps) => {
  const t = useTranslations("Dashboard");
  const formRef = useRef<HTMLFormElement>(null);
  const schema = getCreateLinkSchema(t);

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      originUrl: "",
      alias: "",
      expirationDate: null,
      password: "",
      description: "",
      maxClicks: "",
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
      title={t("createDialogTitle")}
      description={t("createDialogDescription")}
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
            name="originUrl"
            label={t("originalUrl")}
            placeholder={t("urlPlaceholder")}
            required
          />
          <TextField
            name="alias"
            label={t("customAlias")}
            placeholder={t("aliasPlaceholder")}
          />
          <ReferrerSelectField
            name="referrer"
            label={t("referrer")}
            placeholder={t("selectReferrer")}
          />
          <TextAreaField
            name="description"
            label={t("description")}
            placeholder={t("descriptionPlaceholder")}
          />
          <TextField
            name="password"
            label={t("password")}
            type="password"
            placeholder={t("passwordPlaceholder")}
          />
          <TextField
            name="maxClicks"
            label={t("maxClicks")}
            placeholder={t("maxClicksPlaceholder")}
            allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
          />
          <DatePickerField
            name="expirationDate"
            label={t("expirationDate")}
            placeholder={t("expirationDate")}
            disabled={{ before: addDays(new Date(), 1) }}
          />
        </form>
      </FormProvider>
    </AppDialog>
  );
};
