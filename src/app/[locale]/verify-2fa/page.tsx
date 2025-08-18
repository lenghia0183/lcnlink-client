
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Shield, ArrowLeft, Smartphone } from "lucide-react";
import { AppCard } from "@/components/AppCard";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/components/FormFields/TextField";
import { AppButton } from "@/components/AppButton";
import { toast } from "@/components/AppToast";
import { getVerify2FASchema, Verify2FAFormValues } from "./validation";
import { useRouter } from "@/i18n/routing";
import { PATH } from "@/constants/path";

type FormValues = Verify2FAFormValues;

export default function Verify2FAPage() {
  const t = useTranslations("Auth");
  const tCommon = useTranslations("Common");
  const schema = getVerify2FASchema(t);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("2FA verification:", data);
      toast.success(tCommon("success"), t("verify2FA.successMessage"));
      router.push(PATH.HOME);
    } catch (error) {
      console.error("2FA verification error:", error);
      toast.error(tCommon("error"), t("verify2FA.invalidCode"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg">
                <Shield className="h-8 w-8 text-green-500" />
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            {t("verify2FA.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {t("verify2FA.subtitle")}
          </p>
        </div>

        <AppCard
          className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
          title={t("verify2FA.enterCode")}
          description={t("verify2FA.description")}
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t("verify2FA.instructionText")}
            </p>
          </div>

          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              noValidate
              className="space-y-6"
            >
              <TextField
                name="code"
                label={t("verify2FA.code")}
                placeholder={t("verify2FA.codePlaceholder")}
                className="text-center text-2xl tracking-widest"
                maxLength={6}
                autoComplete="one-time-code"
                autoFocus
              />

              <AppButton
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                disabled={isSubmitting}
                iconLeft={<Shield className="h-4 w-4" />}
              >
                {isSubmitting ? tCommon("loading") : t("verify2FA.verify")}
              </AppButton>
            </form>
          </FormProvider>

          <div className="mt-6 text-center space-y-3">
            <AppButton
              variant="link"
              className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              {t("verify2FA.resendCode")}
            </AppButton>

            <div>
              <AppButton
                href="/login"
                variant="link"
                className="text-sm text-gray-600 hover:text-gray-500 dark:text-gray-400"
                iconLeft={<ArrowLeft className="h-4 w-4" />}
              >
                {t("verify2FA.backToLogin")}
              </AppButton>
            </div>
          </div>
        </AppCard>
      </div>
    </div>
  );
}
