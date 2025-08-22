// components/dashboard/StatsCards.tsx
import { AppCard } from "@/components/AppCard";
import { GetLinkStatisticOverviewResponse } from "@/types/Link";

import { Link2, MousePointer, Shield, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { TotalLinksPerStatus } from "./page";

interface StatsCardsProps {
  dataTotalLinkPerStatus?: TotalLinksPerStatus;
  linkStatisticOverview?: GetLinkStatisticOverviewResponse;
}

export const StatsCards = ({
  linkStatisticOverview,
  dataTotalLinkPerStatus,
}: StatsCardsProps) => {
  const t = useTranslations("Dashboard");

  const stats = [
    {
      title: t("totalLinks"),
      value: linkStatisticOverview?.totalLink ?? 0,
      description: `${dataTotalLinkPerStatus?.active} ${t("active")}`,
      icon: <Link2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      iconBg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: t("totalClicks"),
      value: linkStatisticOverview?.totalClicks ?? "0",
      description: `+12.5% ${t("comparedToLastMonth")}`,
      icon: (
        <MousePointer className="h-6 w-6 text-green-600 dark:text-green-400" />
      ),
      iconBg: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: t("protectedLinks"),
      value: linkStatisticOverview?.totalProtectedLink ?? 0,
      description: `${(
        ((linkStatisticOverview?.totalProtectedLink || 0) /
          (linkStatisticOverview?.totalLink || 1)) *
        100
      ).toFixed(1)}% ${t("ofTotalLinks")}`,
      icon: <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      iconBg: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      title: t("limitedLinks"),
      value: linkStatisticOverview?.totalLimitedLink ?? 0,
      description: `${(
        ((linkStatisticOverview?.totalLimitedLink || 0) /
          (linkStatisticOverview?.totalLink || 1)) *
        100
      ).toFixed(1)}% ${t("ofTotalLinks")}`,
      icon: <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400" />,
      iconBg: "bg-orange-50 dark:bg-orange-900/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-flow-dense gap-6 mb-8">
      {stats?.map((stat, index) => (
        <AppCard
          key={index}
          className="border-gray-200 dark:border-gray-700"
          contentClassName="p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat?.title}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat?.value}
              </p>
              <p className="text-xs text-gray-500 mt-1">{stat?.description}</p>
            </div>
            <div className={stat?.iconBg}>
              <div className="p-3 rounded-lg">{stat?.icon}</div>
            </div>
          </div>
        </AppCard>
      ))}
    </div>
  );
};
