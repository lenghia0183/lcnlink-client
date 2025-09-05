"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Lock, Eye, EyeOff, Shield, ArrowLeft } from "lucide-react";
import { AppCard } from "@/components/AppCard";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/components/FormFields/TextField";
import { AppButton } from "@/components/AppButton";
import { toast } from "@/components/AppToast";
import { getUnlockSchema, UnlockFormValues } from "./validation";
import { useSearchParams, useRouter } from "next/navigation";
import { useVerifyPasswordLink } from "@/services/api/links";
import validateResponseCode from "@/utils/validateResponseCode";

type FormValues = UnlockFormValues;

export default function PasskeyPage() {
  const t = useTranslations("Unlock");
  const tCommon = useTranslations("Common");
  const schema = getUnlockSchema(t);
  const searchParams = useSearchParams();
  const router = useRouter();
  const alias = searchParams.get("alias");
  const shortedUrl = searchParams.get("shortedUrl");

  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    trigger: verifyPasswordLinkTrigger,
    isMutating: isVerifyPasswordLinkMutating,
  } = useVerifyPasswordLink();

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (formValues: FormValues) => {
    verifyPasswordLinkTrigger(
      {
        alias: alias || "",
        body: { password: formValues?.password || "" },
      },
      {
        onSuccess: (response) => {
          if (validateResponseCode(response.statusCode)) {
            toast.success(response.message);
            console.log("response", response);
            if (response.data?.originalUrl) {
              window.location.href = response.data?.originalUrl;
            } else {
              toast.error(response.message);
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

  if (!alias) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <AppCard className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-center">
            <h1 className="text-2xl font-bold mb-4 text-red-600">
              {t("invalidLinkTitle")}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t("invalidLinkDescription")}
            </p>
            <AppButton href="/" className="w-full">
              {t("backToHome")}
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
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg">
                <Shield className="h-8 w-8 text-orange-500" />
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {t("title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {t("subtitle")}
          </p>
        </div>

        <AppCard
          className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
          title={t("protectedLink")}
          description={t("description")}
        >
          <div className="mb-6 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">
                {t("protectedLinkLabel")}
              </span>
            </div>
            <code className="text-sm text-orange-800 dark:text-orange-200 break-all">
              {shortedUrl}
            </code>
          </div>

          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              noValidate
              className="space-y-4"
            >
              <TextField
                name="password"
                label={t("password")}
                type={isShowPassword ? "text" : "password"}
                placeholder={t("passwordPlaceholder")}
                leftIcon={<Lock className="h-4 w-4 text-gray-400" />}
                rightIcon={
                  isShowPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )
                }
                rightIconOnClick={() => setIsShowPassword(!isShowPassword)}
                disabled={isVerifyPasswordLinkMutating}
              />

              <AppButton
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                disabled={isVerifyPasswordLinkMutating}
              >
                {isVerifyPasswordLinkMutating
                  ? tCommon("loading")
                  : t("unlock")}
              </AppButton>
            </form>
          </FormProvider>

          <div className="mt-6 text-center">
            <AppButton
              href="/"
              variant="link"
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
              iconLeft={<ArrowLeft className="h-4 w-4" />}
            >
              {t("backToHome")}
            </AppButton>
          </div>
        </AppCard>
      </div>
    </div>
  );
}
