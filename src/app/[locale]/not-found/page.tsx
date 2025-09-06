
"use client";

import { useTranslations } from "next-intl";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { AppCard } from "@/components/AppCard";
import { AppButton } from "@/components/AppButton";

export default function NotFoundPage() {
  const t = useTranslations("NotFound");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4">
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
            
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {t("linkNotFound")}
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

              <AppButton
                variant="outline"
                className="w-full"
                iconLeft={<ArrowLeft className="h-4 w-4" />}
                onClick={() => window.history.back()}
              >
                {t("goBack")}
              </AppButton>
            </div>
          </div>
        </AppCard>
      </div>
    </div>
  );
}
