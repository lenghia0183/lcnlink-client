"use client";

import { useTranslations } from "next-intl";
import { AppCard } from "@/components/AppCard";
import { FileText, AlertTriangle, Check, X, Scale, Users } from "lucide-react";

export default function TermsOfServicePage() {
  const t = useTranslations("Terms");

  const sections = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: t("sections.acceptance.title"),
      content: t.raw("sections.acceptance.items") || [],
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t("sections.userAccount.title"),
      content: t.raw("sections.userAccount.items") || [],
    },
    {
      icon: <Check className="h-6 w-6" />,
      title: t("sections.acceptableUse.title"),
      content: t.raw("sections.acceptableUse.items") || [],
    },
    {
      icon: <X className="h-6 w-6" />,
      title: t("sections.prohibitedUse.title"),
      content: t.raw("sections.prohibitedUse.items") || [],
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: t("sections.liability.title"),
      content: t.raw("sections.liability.items") || [],
    },
    {
      icon: <Scale className="h-6 w-6" />,
      title: t("sections.intellectualProperty.title"),
      content: t.raw("sections.intellectualProperty.items") || [],
    },
  ];

  const pricing = [
    {
      feature: t("pricing.features.basicService.name"),
      description: t("pricing.features.basicService.description"),
      price: t("pricing.features.basicService.price"),
    },
    {
      feature: t("pricing.features.detailedStats.name"),
      description: t("pricing.features.detailedStats.description"),
      price: t("pricing.features.detailedStats.price"),
    },
    {
      feature: t("pricing.features.customLinks.name"),
      description: t("pricing.features.customLinks.description"),
      price: t("pricing.features.customLinks.price"),
    },
    {
      feature: t("pricing.features.passwordProtection.name"),
      description: t("pricing.features.passwordProtection.description"),
      price: t("pricing.features.passwordProtection.price"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Scale className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            {t("effectiveDate")}: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <AppCard key={index} className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <div className="text-blue-600 dark:text-blue-400">
                      {section.icon}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {section.title}
                    </h2>
                  </div>
                </div>

                <ul className="space-y-3">
                  {section.content.map((item: string, itemIndex: number) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <span className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </AppCard>
            ))}
          </div>

          {/* Pricing Information */}
          <AppCard className="p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              {t("pricing.title")}
            </h2>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-green-800 dark:text-green-400 mb-2">
                  {t("pricing.freeNotice")}
                </h3>
                <p className="text-green-700 dark:text-green-300">
                  {t("pricing.freeDescription")}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {pricing.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {item.feature}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {item.description}
                      </p>
                    </div>
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium ml-3">
                      {item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </AppCard>

          {/* Contact Info */}
          <AppCard className="p-8 mt-8 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="text-white text-center">
              <h3 className="text-xl font-bold mb-4">{t("support.title")}</h3>
              <p className="text-blue-100 mb-6">{t("support.description")}</p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
                <span className="text-blue-100">{t("support.email")}: </span>
                <a
                  href="mailto:legal@linkshortener.com"
                  className="text-white font-semibold hover:text-blue-200 transition-colors"
                >
                  legal@linkshortener.com
                </a>
              </div>
            </div>
          </AppCard>
        </div>
      </div>
    </div>
  );
}
