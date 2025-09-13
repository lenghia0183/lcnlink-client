"use client";

import { useTranslations } from "next-intl";
import { AppCard } from "@/components/AppCard";
import { Shield, Eye, Lock, Users, Database, FileText } from "lucide-react";

export default function PrivacyPolicyPage() {
  const t = useTranslations("Privacy");

  const sections = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: t("sections.dataCollection.title"),
      content: t.raw("sections.dataCollection.items") || []
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: t("sections.dataUsage.title"),
      content: t.raw("sections.dataUsage.items") || []
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t("sections.dataSharing.title"),
      content: t.raw("sections.dataSharing.items") || []
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: t("sections.dataSecurity.title"),
      content: t.raw("sections.dataSecurity.items") || []
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: t("sections.dataStorage.title"),
      content: t.raw("sections.dataStorage.items") || []
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t("sections.userRights.title"),
      content: t.raw("sections.userRights.items") || []
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Shield className="h-12 w-12 text-blue-600 dark:text-blue-400" />
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
                  {section.content.map((item, itemIndex) => (
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

          {/* Contact Info */}
          <AppCard className="p-8 mt-8 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="text-white text-center">
              <h3 className="text-xl font-bold mb-4">{t("support.title")}</h3>
              <p className="text-blue-100 mb-6">
                {t("support.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
                <span className="text-blue-100">{t("support.email")}: </span>
                <a 
                  href="mailto:privacy@linkshortener.com" 
                  className="text-white font-semibold hover:text-blue-200 transition-colors"
                >
                  privacy@linkshortener.com
                </a>
              </div>
            </div>
          </AppCard>
        </div>
      </div>
    </div>
  );
}