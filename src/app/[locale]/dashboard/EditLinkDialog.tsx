"use client";

import { useTranslations } from "next-intl";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Link, Shield } from "lucide-react";

import { TextField } from "@/components/FormFields/TextField";
import { TextAreaField } from "@/components/FormFields/TextAreaField";
import { TEXTFIELD_ALLOW } from "@/constants/regexes";
import { AppDialog } from "@/components/AppDialog";
import { LinkData } from "@/types/Link";
import { DatePickerField } from "@/components/FormFields/DatePickerField";
import { useEffect, useState } from "react";
import { addDays } from "date-fns";
import { safeDate } from "@/utils/date";
import { AutoCompleteField } from "@/components/FormFields/AutoCompleteField";
import { searchReferrers } from "@/services/api/referrers";
import { ReferrerData } from "@/types/Referrer";
import { AppTabs } from "@/components/AppTabs";

const editSchema = z
  .object({
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

    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmNewPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      const { currentPassword, newPassword, confirmNewPassword } = data;
      if (newPassword || confirmNewPassword) {
        return !!currentPassword && !!newPassword && !!confirmNewPassword;
      }
      return true;
    },
    {
      message: "All password fields are required when changing password",
      path: ["confirmNewPassword"],
    }
  )
  .refine(
    (data) => {
      const { newPassword, confirmNewPassword } = data;
      if (newPassword && confirmNewPassword) {
        return newPassword === confirmNewPassword;
      }
      return true;
    },
    {
      message: "New password and confirm password must match",
      path: ["confirmNewPassword"],
    }
  );

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

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialData: EditFormValues = {
    description: "",
    alias: "",
    expirationDate: null,
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    maxClicks: "",
    referrer: null,
  };

  const methods = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
    defaultValues: initialData,
    mode: "onChange",
  });

  useEffect(() => {
    methods.reset({
      description: selectedLink?.description,
      alias: selectedLink?.alias,
      expirationDate: safeDate(selectedLink?.expireAt),
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
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

  // General tab content
  const generalTab = (
    <div className="space-y-4">
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
    </div>
  );

  // Security tab content
  const securityTab = (
    <div className="space-y-4">
      <TextField
        name="currentPassword"
        label={t("currentPassword")}
        type={showCurrentPassword ? "text" : "password"}
        placeholder={t("currentPasswordPlaceholder")}
        rightIcon={
          showCurrentPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )
        }
        rightIconOnClick={() => setShowCurrentPassword(!showCurrentPassword)}
      />

      <TextField
        name="newPassword"
        label={t("newPassword")}
        type={showNewPassword ? "text" : "password"}
        placeholder={t("newPasswordPlaceholder")}
        rightIcon={
          showNewPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )
        }
        rightIconOnClick={() => setShowNewPassword(!showNewPassword)}
      />

      <TextField
        name="confirmNewPassword"
        label={t("confirmPassword")}
        type={showConfirmPassword ? "text" : "password"}
        placeholder={t("confirmPasswordPlaceholder")}
        rightIcon={
          showConfirmPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )
        }
        rightIconOnClick={() => setShowConfirmPassword(!showConfirmPassword)}
      />
    </div>
  );

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
          <AppTabs
            tabs={[
              {
                value: "general",
                label: t("general"),
                icon: <Link className="w-4 h-4 mr-2" />,
                content: generalTab,
              },
              {
                value: "security",
                label: t("security"),
                icon: <Shield className="w-4 h-4 mr-2" />,
                content: securityTab,
              },
            ]}
          />
        </form>
      </FormProvider>
    </AppDialog>
  );
};
