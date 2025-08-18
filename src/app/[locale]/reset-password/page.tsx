"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from "lucide-react";
import { AppCard } from "@/components/AppCard";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/components/FormFields/TextField";
import { AppButton } from "@/components/AppButton";
import { toast } from "@/components/AppToast";
import { getResetPasswordSchema, ResetPasswordFormValues } from "./validation";
import { useSearchParams } from "next/navigation";

type FormValues = ResetPasswordFormValues;

export default function ResetPasswordPage() {
  const t = useTranslations("Auth");
  const tCommon = useTranslations("Common");
  const schema = getResetPasswordSchema(t);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Reset password request:", { ...data, token });
      setIsSuccess(true);
      toast.success(tCommon("success"), t("resetPassword.successDescription"));
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error(tCommon("error"), tCommon("tryAgainLater"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <AppCard className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-center">
            <h1 className="text-2xl font-bold mb-4 text-red-600">
              {t("resetPassword.invalidLinkTitle")}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t("resetPassword.invalidLinkDescription")}
            </p>
            <AppButton href="/forgot-password" className="w-full">
              {t("resetPassword.requestNewLink")}
            </AppButton>
          </AppCard>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <AppCard className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-2xl font-bold mb-2">{tCommon("success")}</h1>
              <p className="text-gray-600 dark:text-gray-300">
                {t("resetPassword.successDescription")}
              </p>
            </div>

            <AppButton
              href="/login"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {t("resetPassword.backToLogin")}
            </AppButton>
          </AppCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t("resetPassword.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {t("resetPassword.subtitle")}
          </p>
        </div>

        <AppCard
          className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
          title={t("resetPassword.newPassword")}
          description={t("resetPassword.description")}
        >
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              noValidate
              className="space-y-4"
            >
              <TextField
                name="password"
                label={t("resetPassword.password")}
                type={isShowPassword ? "text" : "password"}
                placeholder={t("resetPassword.passwordPlaceholder")}
                leftIcon={<Lock className="h-4 w-4 text-gray-400" />}
                rightIcon={
                  isShowPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )
                }
                rightIconOnClick={() => setIsShowPassword(!isShowPassword)}
                disabled={isSubmitting}
              />

              <TextField
                name="confirmPassword"
                label={t("resetPassword.confirmPassword")}
                type={isShowConfirmPassword ? "text" : "password"}
                placeholder={t("resetPassword.confirmPasswordPlaceholder")}
                leftIcon={<Lock className="h-4 w-4 text-gray-400" />}
                rightIcon={
                  isShowConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )
                }
                rightIconOnClick={() =>
                  setIsShowConfirmPassword(!isShowConfirmPassword)
                }
                disabled={isSubmitting}
              />

              <AppButton
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? tCommon("loading")
                  : t("resetPassword.resetPassword")}
              </AppButton>
            </form>
          </FormProvider>

          <div className="mt-6 text-center">
            <AppButton
              href="/login"
              variant="link"
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
              iconLeft={<ArrowLeft className="h-4 w-4" />}
            >
              {t("resetPassword.backToLogin")}
            </AppButton>
          </div>
        </AppCard>
      </div>
    </div>
  );
}
