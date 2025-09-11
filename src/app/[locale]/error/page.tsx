"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { AlertTriangle, Home, ArrowLeft, RefreshCw } from "lucide-react";
import { AppCard } from "@/components/AppCard";
import { AppButton } from "@/components/AppButton";
import { useEffect, useState } from "react";

export default function ErrorPage() {
  const t = useTranslations("Error");
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorCode, setErrorCode] = useState<string>("");

  useEffect(() => {
    // Lấy message từ URL parameters
    const message = searchParams.get("message");
    const code = searchParams.get("code");

    if (message) {
      setErrorMessage(decodeURIComponent(message));
    }

    if (code) {
      setErrorCode(decodeURIComponent(code));
    }
  }, [searchParams]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg">
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            {t("title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {t("subtitle")}
          </p>
        </div>

        <AppCard className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-center">
          <div className="py-8">
            <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-400" />
            </div>

            {errorCode && (
              <div className="mb-4">
                <span className="inline-block bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-3 py-1 rounded-full text-sm font-medium">
                  {t("errorCode")}: {errorCode}
                </span>
              </div>
            )}

            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {errorMessage || t("defaultMessage")}
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {t("description")}
            </p>

            <div className="space-y-3">
              <AppButton
                href="/"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                iconLeft={<Home className="h-4 w-4" />}
              >
                {t("backToHome")}
              </AppButton>

              <div className="grid grid-cols-2 gap-3">
                <AppButton
                  variant="outline"
                  className="w-full"
                  iconLeft={<ArrowLeft className="h-4 w-4" />}
                  onClick={handleGoBack}
                >
                  {t("goBack")}
                </AppButton>

                <AppButton
                  variant="outline"
                  className="w-full"
                  iconLeft={<RefreshCw className="h-4 w-4" />}
                  onClick={handleRefresh}
                >
                  {t("refresh")}
                </AppButton>
              </div>
            </div>
          </div>
        </AppCard>

        {/* Additional Help Section */}
        <div className="mt-8">
          <AppCard className="border-0 bg-yellow-50 dark:bg-yellow-900/20">
            <div className="p-4 text-center">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                {t("needHelp")}
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                {t("helpDescription")}
              </p>
            </div>
          </AppCard>
        </div>
      </div>
    </div>
  );
}
