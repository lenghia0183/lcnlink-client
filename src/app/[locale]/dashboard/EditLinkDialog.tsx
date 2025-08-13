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

const editSchema = z.object({
  description: z.string().optional(),
  password: z.string().optional(),
  maxClicks: z.string().optional(),
});

type EditFormValues = z.infer<typeof editSchema>;

interface EditLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLink?: LinkData;
}

export const EditLinkDialog = ({
  open,
  onOpenChange,
  selectedLink,
}: EditLinkDialogProps) => {
  const t = useTranslations("Dashboard");
  console.log("selectedLink", selectedLink);

  const initialData: EditFormValues = {
    description: selectedLink?.description,
    password: selectedLink?.password,
    maxClicks: "",
  };

  const methods = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
    defaultValues: initialData,
    mode: "onChange",
  });

  const handleSubmit = (data: EditFormValues) => {
    console.log("data", data);

    onOpenChange(false);
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
        </form>
      </FormProvider>
    </AppDialog>
  );
};
