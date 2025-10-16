"use client";

import { useTranslations } from "next-intl";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { TextField } from "@/components/FormFields/TextField";
import { TextAreaField } from "@/components/FormFields/TextAreaField";
import { TEXTFIELD_ALLOW } from "@/constants/regexes";
import { AppDialog } from "@/components/AppDialog";
import { LinkData } from "@/types/Link";
import { DatePickerField } from "@/components/FormFields/DatePickerField";
import { useEffect } from "react";
import { addDays } from "date-fns";
import { safeDate } from "@/utils/date";
import { AutoCompleteField } from "@/components/FormFields/AutoCompleteField";
import { searchReferrers } from "@/services/api/referrers";
import { ReferrerData } from "@/types/Referrer";

const editSchema = z.object({
  description: z.string().optional(),
  password: z.string().optional(),
  maxClicks: z.string().optional(),
  expirationDate: z.date().nullable().optional(),
  alias: z.string().optional(),
  referrer: z
    .object({
      id: z.string(),
      referrer: z.string(),
      alias: z.string().optional(),
    })
    .optional()
    .nullable(),
});

export type EditFormValues = z.infer<typeof editSchema>;

interface EditLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLink?: LinkData;
  handleConfirmEdit: (formValue: EditFormValues) => void;
}

export const EditLinkDialog = ({
  open,
  onOpenChange,
  selectedLink,
  handleConfirmEdit,
}: EditLinkDialogProps) => {
  const t = useTranslations("Dashboard");

  const initialData: EditFormValues = {
    description: "",
    alias: "",
    expirationDate: null,
    password: "",
    maxClicks: "",
    referrer: null,
  };

  const methods = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
    defaultValues: initialData,
    mode: "onChange",
  });
  console.log("selectedLink", selectedLink);
  useEffect(() => {
    methods.reset({
      description: selectedLink?.description,
      alias: selectedLink?.alias,
      expirationDate: safeDate(selectedLink?.expireAt),
      password: selectedLink?.password,
      maxClicks: selectedLink?.maxClicks?.toString(),
      referrer: {
        id: selectedLink?.referrer?.id || "",
        referrer: selectedLink?.referrer?.referrer || "",
        alias: selectedLink?.referrer?.alias || "",
      },
    });
  }, [selectedLink, methods]);

  const handleSubmit = (data: EditFormValues) => {
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
      title={t("editDialogTitle")}
      description={t("editDialogDescription")}
      footerActions={footerActions}
      closeOnOverlayClick={false}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="space-y-4"
          noValidate
        >
          <TextAreaField
            name="alias"
            label={t("customAlias")}
            placeholder={t("aliasPlaceholder")}
          />
          <AutoCompleteField<ReferrerData>
            name="referrer"
            label={t("referrer")}
            placeholder={t("selectReferrer")}
            asyncRequest={searchReferrers}
            asyncRequestHelper={(data) => {
              return data;
            }}
            getOptionLabel={(option) => {
              return option.referrer;
            }}
            isOptionEqualToValue={(option, value) => {
              return option?.id === value?.id;
            }}
            autoFetch={true}
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
            placeholder={t("passwordPlaceholderEdit")}
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
