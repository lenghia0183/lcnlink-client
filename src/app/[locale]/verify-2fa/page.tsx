"use client";
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
import { useLogin2FA } from "@/services/api/auth";
import validateResponseCode from "@/utils/validateResponseCode";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/context/userProvider";
import { handleSuccessfulAuth } from "@/services/auth-flow";

type FormValues = Verify2FAFormValues;

export default function Verify2FAPage() {
  const t = useTranslations("Auth");
  const tCommon = useTranslations("Common");
  const schema = getVerify2FASchema(t);
  const router = useRouter();
  const { loginUser } = useUser();

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: "",
    },
  });

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { trigger: triggerLogin2FA, isMutating: isLogin2FAMutating } =
    useLogin2FA();

  const onSubmit = async (data: FormValues) => {
    triggerLogin2FA(
      {
        otp: data?.code || "",
        otpToken: token || "",
      },
      {
        onSuccess: async (response) => {
          if (validateResponseCode(response.statusCode)) {
            console.log("response", response);

            // Handle successful 2FA verification
            const success = await handleSuccessfulAuth(
              response,
              undefined, // No remember me data for 2FA
              {
                onSuccess: () => {
                  loginUser(response.data);
                  router.push(PATH.HOME);
                },
              }
            );

            if (!success) {
              toast.error("Failed to set authentication cookies");
            }
          } else {
            toast.error(response.message);
          }
        },
        onError: (response) => {
          toast.error(response.message);
        },
      }
    );
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
                disabled={isLogin2FAMutating}
                iconLeft={<Shield className="h-4 w-4" />}
              >
                {isLogin2FAMutating
                  ? tCommon("loading")
                  : t("verify2FA.verify")}
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
