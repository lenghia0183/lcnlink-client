"use client";

import { useTranslations } from "next-intl";
import { AppCard } from "@/components/AppCard";
import { Cookie, Settings, Eye, Shield, Trash2, CheckCircle } from "lucide-react";

export default function CookiePolicyPage() {
  const t = useTranslations("Cookies");

  const cookieTypes = [
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: t("cookieTypes.essential.title"),
      description: t("cookieTypes.essential.description"),
      required: true,
      examples: t.raw("cookieTypes.essential.examples") || []
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: t("cookieTypes.analytics.title"),
      description: t("cookieTypes.analytics.description"),
      required: false,
      examples: t.raw("cookieTypes.analytics.examples") || []
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: t("cookieTypes.functional.title"),
      description: t("cookieTypes.functional.description"),
      required: false,
      examples: t.raw("cookieTypes.functional.examples") || []
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t("cookieTypes.security.title"),
      description: t("cookieTypes.security.description"),
      required: true,
      examples: t.raw("cookieTypes.security.examples") || []
    }
  ];

  const managementOptions = [
    {
      browser: t("management.browsers.chrome.name"),
      steps: t.raw("management.browsers.chrome.steps") || []
    },
    {
      browser: t("management.browsers.firefox.name"),
      steps: t.raw("management.browsers.firefox.steps") || []
    },
    {
      browser: t("management.browsers.safari.name"),
      steps: t.raw("management.browsers.safari.steps") || []
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Cookie className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            {t("lastUpdated")}: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* What are cookies */}
        <div className="max-w-4xl mx-auto mb-12">
          <AppCard className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t("whatAreCookies.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {t("whatAreCookies.description1")}
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t("whatAreCookies.description2")}
            </p>
          </AppCard>
        </div>

        {/* Types of cookies */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {t("typesTitle")}
          </h2>
          
          <div className="grid gap-6">
            {cookieTypes.map((type, index) => (
              <AppCard key={index} className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`flex-shrink-0 p-3 rounded-lg ${
                    type.required 
                      ? 'bg-red-100 dark:bg-red-900' 
                      : 'bg-green-100 dark:bg-green-900'
                  }`}>
                    <div className={`${
                      type.required 
                        ? 'text-red-600 dark:text-red-400' 
                        : 'text-green-600 dark:text-green-400'
                    }`}>
                      {type.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {type.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        type.required
                          ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
                          : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
                      }`}>
                        {type.required ? t("required") : t("optional")}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {type.description}
                    </p>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        {t("examples")}:
                      </h4>
                      <ul className="space-y-1">
                        {type.examples.map((example, exampleIndex) => (
                          <li key={exampleIndex} className="flex items-start gap-2">
                            <div className="flex-shrink-0 w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {example}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AppCard>
            ))}
          </div>
        </div>

        {/* Cookie Management */}
        <div className="max-w-4xl mx-auto mb-12">
          <AppCard className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t("management.title")}
            </h2>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t("management.browserManagement")}
              </h3>
              <div className="space-y-6">
                {managementOptions.map((option, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      {option.browser}
                    </h4>
                    <ol className="space-y-2">
                      {option.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-medium">
                            {stepIndex + 1}
                          </span>
                          <span className="text-gray-600 dark:text-gray-300 text-sm">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <Trash2 className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">
                    {t("management.warning.title")}
                  </h4>
                  <p className="text-amber-700 dark:text-amber-400 text-sm">
                    {t("management.warning.description")}
                  </p>
                </div>
              </div>
            </div>
          </AppCard>
        </div>

        {/* Contact Info */}
        <div className="max-w-4xl mx-auto">
          <AppCard className="p-8 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="text-white text-center">
              <h3 className="text-xl font-bold mb-4">{t("support.title")}</h3>
              <p className="text-blue-100 mb-6">
                {t("support.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
                <span className="text-blue-100">{t("support.email")}: </span>
                <a 
                  href="mailto:support@linkshortener.com" 
                  className="text-white font-semibold hover:text-blue-200 transition-colors"
                >
                  support@linkshortener.com
                </a>
              </div>
            </div>
          </AppCard>
        </div>
      </div>
    </div>
  );
}