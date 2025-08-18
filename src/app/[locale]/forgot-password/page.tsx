
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { AppCard } from "@/components/AppCard";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/components/FormFields/TextField";
import { AppButton } from "@/components/AppButton";
import { toast } from "@/components/AppToast";
import { getForgotPasswordSchema, ForgotPasswordFormValues } from "./validation";

type FormValues = ForgotPasswordFormValues;

export default function ForgotPasswordPage() {
  const t = useTranslations("Auth");
  const tCommon = useTranslations("Common");
  const schema = getForgotPasswordSchema(t);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      console.log("Forgot password request:", data);
      setEmailSent(true);
      toast.success(
        "Email đã được gửi!",
        "Vui lòng kiểm tra email để đặt lại mật khẩu"
      );
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("Có lỗi xảy ra", "Vui lòng thử lại sau");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <AppCard className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Email đã được gửi!</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Chúng tôi đã gửi liên kết đặt lại mật khẩu đến email của bạn.
                Vui lòng kiểm tra hộp thư và làm theo hướng dẫn.
              </p>
            </div>
            
            <div className="space-y-4">
              <AppButton
                href="/login"
                variant="outline"
                className="w-full"
                iconLeft={<ArrowLeft className="h-4 w-4" />}
              >
                Quay lại đăng nhập
              </AppButton>
              
              <AppButton
                onClick={() => {
                  setEmailSent(false);
                  methods.reset();
                }}
                variant="link"
                className="w-full"
              >
                Gửi lại email
              </AppButton>
            </div>
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
            {t("forgotPassword.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {t("forgotPassword.subtitle")}
          </p>
        </div>

        <AppCard
          className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
          title={t("forgotPassword.resetPassword")}
          description={t("forgotPassword.description")}
        >
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              noValidate
              className="space-y-4"
            >
              <TextField
                name="email"
                label={t("forgotPassword.email")}
                placeholder={t("forgotPassword.emailPlaceholder")}
                leftIcon={<Mail className="w-4 h-4" />}
                disabled={isSubmitting}
              />

              <AppButton
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                disabled={isSubmitting}
                iconLeft={<Send className="h-4 w-4" />}
              >
                {isSubmitting ? tCommon("loading") : t("forgotPassword.sendEmail")}
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
              {t("forgotPassword.backToLogin")}
            </AppButton>
          </div>
        </AppCard>
      </div>
    </div>
  );
}
