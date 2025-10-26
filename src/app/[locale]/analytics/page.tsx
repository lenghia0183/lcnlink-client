"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Eye,
  CheckCircle,
  Users,
  Globe,
  Smartphone,
  Monitor,
  MapPin,
  Download,
  RefreshCw,
} from "lucide-react";
import { AppButton } from "@/components/AppButton";
import { AppCard } from "@/components/AppCard";
import {
  useGetLinkAnalytics,
  useGetLinkStatisticOverview,
} from "@/services/api/links";
import { SkeletonAnalyticsPage } from "@/components/skeleton/SkeletonAnalyticsPage";
import {
  LinkAnalyticsDeviceBreakdownResponse,
  LinkAnalyticsBrowserBreakdownResponse,
  LinkAnalyticsCountryBreakdownResponse,
} from "@/types/Link";
import { useSearchParams } from "next/navigation";
import { LineChartDots } from "@/components/analytics/LineChartDots";

export default function AnalyticsPage() {
  const t = useTranslations("Analytics");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // Hooks
  const {
    data: analyticsData,
    mutate: refreshAnalytics,
    isLoading: isLoadingAnalytics,
  } = useGetLinkAnalytics(id || "");

  const { data: linkStatisticOverview, isLoading: isLoadingOverview } =
    useGetLinkStatisticOverview(id || "");

  // Extract the data from the consolidated response
  const devices = analyticsData?.devices || [];
  const browsers = analyticsData?.browsers || [];
  const countries = analyticsData?.countries || [];
  const trendData = analyticsData?.trend || [];

  const isLoading = isLoadingAnalytics || isLoadingOverview;

  // Stats
  const stats = [
    {
      icon: <Eye className="h-6 w-6 text-blue-500" />,
      label: t("totalClicks"),
      value: linkStatisticOverview?.totalClicks ?? "0",
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      label: t("totalSuccessfulAccess"),
      value: linkStatisticOverview?.totalSuccessfulAccess ?? "0",
    },
    {
      icon: <Users className="h-6 w-6 text-purple-500" />,
      label: t("uniqueVisitors"),
      value: linkStatisticOverview?.totalUniqueVisitors ?? "0",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-orange-500" />,
      label: t("returningVisitorRate"),
      value: `${linkStatisticOverview?.returningVisitorRate ?? 0}%`,
    },
  ];

  const handleRefresh = () => {
    refreshAnalytics();
  };

  // Show skeleton while loading
  if (isLoading) {
    return <SkeletonAnalyticsPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {t("title")}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">{t("subtitle")}</p>
          </div>
          <div className="flex gap-2 mt-4 lg:mt-0">
            <AppButton
              iconLeft={<RefreshCw />}
              variant="outline"
              onClick={handleRefresh}
            >
              {t("refresh")}
            </AppButton>
            <AppButton variant="outline" iconLeft={<Download />}>
              {t("export")}
            </AppButton>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <AppCard
              key={index}
              className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all hover:shadow-lg"
              contentClassName="p-6"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                </div>
              </div>
            </AppCard>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Click Trends */}
          <LineChartDots
            data={trendData}
            isLoading={isLoadingAnalytics}
            title={t("clickTrends.title")}
            description={t("clickTrends.description")}
          />

          <AppCard
            className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            title={
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {t("geographic.title")}
              </div>
            }
            description={t("geographic.description")}
            contentClassName="space-y-3"
          >
            {countries.map(
              (
                country: LinkAnalyticsCountryBreakdownResponse,
                index: number
              ) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-4 bg-gray-200 dark:bg-gray-600 rounded-sm"></div>
                    <span className="font-medium">{country.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {country.count.toLocaleString()}
                    </span>
                    <Badge variant="outline">{country.percentage}%</Badge>
                  </div>
                </div>
              )
            )}
          </AppCard>
        </div>

        {/* Device & Browser Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Device Types */}
          <AppCard
            className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            title={
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                {t("devices.title")}
              </div>
            }
            description={t("devices.description")}
            contentClassName="space-y-4"
          >
            {devices.map(
              (device: LinkAnalyticsDeviceBreakdownResponse, index: number) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {device.device === "Desktop" && (
                        <Monitor className="h-4 w-4" />
                      )}
                      {device.device === "Mobile" && (
                        <Smartphone className="h-4 w-4" />
                      )}
                      {device.device === "Tablet" && (
                        <Monitor className="h-4 w-4" />
                      )}
                      <span className="font-medium">{device.device}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {device.count.toLocaleString()}
                      </span>
                      <Badge variant="outline">{device.percentage}%</Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${device.percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            )}
          </AppCard>

          {/* Browsers */}
          <AppCard
            className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            title={
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                {t("browsers.title")}
              </div>
            }
            description={t("browsers.description")}
            contentClassName="space-y-4"
          >
            {browsers.map(
              (
                browser: LinkAnalyticsBrowserBreakdownResponse,
                index: number
              ) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{browser.browser}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {browser.count.toLocaleString()}
                      </span>
                      <Badge variant="outline">{browser.percentage}%</Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${browser.percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            )}
          </AppCard>
        </div>
      </div>
    </div>
  );
}
