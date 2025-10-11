import { AppTabs, TabItem } from "@/components/AppTabs";
import { LinkData } from "@/types/Link";
import { useTranslations } from "next-intl";
import { LinkCard } from "./LinkCard";
import { AppCard } from "@/components/AppCard";
import { Link2, Inbox } from "lucide-react";
import { AppPagination } from "@/components/AppPagination";
import { LINK_STATUS, LinkStatus } from "@/constants/common";
import { TotalLinksPerStatus } from "./page";
import { SkeletonLinkCard } from "@/components/skeleton/SkeletonLinkCard";
import { SkeletonTabs } from "@/components/skeleton/SkeletonTabs";
import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader";

interface LinkManagementCardProps {
  links?: LinkData[];
  searchTerm?: string;
  activeTab: string;
  onTabChange: (value: string) => void;
  onEdit: (link: LinkData) => void;
  onDelete: (id: LinkData) => void;
  onCopy: (text: string, id: string) => void;
  copiedId?: string;
  totalLinksPerStatus?: TotalLinksPerStatus;
  page: number;
  totalPages: number;
  setPage: (value: number) => void;
  loading?: boolean;
}

export const LinkManagementCard = ({
  links = [],
  searchTerm,
  activeTab,
  onTabChange,
  onEdit,
  onDelete,
  onCopy,
  copiedId,
  page,
  totalLinksPerStatus,
  totalPages,
  setPage,
  loading: isLoading = false,
}: LinkManagementCardProps) => {
  const t = useTranslations("Dashboard");
  console.log("totalLinksPerStatus", totalLinksPerStatus);
  const tabConfig = [
    {
      value: "",
      labelKey: "allLinks",
      count: totalLinksPerStatus?.all,
    },
    {
      value: LINK_STATUS.ACTIVE,
      labelKey: "activeLinks",
      count: totalLinksPerStatus?.active,
      status: LINK_STATUS.ACTIVE,
    },
    {
      value: LINK_STATUS.EXPIRED,
      labelKey: "expiredLinks",
      count: totalLinksPerStatus?.expired,
      status: LINK_STATUS.EXPIRED,
    },
    {
      value: LINK_STATUS.LIMIT_REACHED,
      labelKey: "limitReachedLinks",
      count: totalLinksPerStatus?.limitReached,
      status: LINK_STATUS.LIMIT_REACHED,
    },
    {
      value: LINK_STATUS.DISABLED,
      labelKey: "disabledLinks",
      count: totalLinksPerStatus?.disabled,
      status: LINK_STATUS.DISABLED,
    },
  ];

  // Show skeleton for the entire card only when we don't have the tab counts yet
  const showFullSkeleton = isLoading && !totalLinksPerStatus;

  if (showFullSkeleton) {
    return (
      <AppCard
        className="border-gray-200 dark:border-gray-700"
        headerClassName="p-4 sm:p-6"
        title={
          <div className="flex items-center gap-2">
            <Link2 className="h-5 w-5" />
            {t("linkManagement")}
          </div>
        }
        description={t("subtitle")}
      >
        <SkeletonTabs tabCount={tabConfig.length} />
        <div className="mt-6 sm:mt-10 flex justify-center px-4 sm:px-6 pb-4 sm:pb-6">
          <SkeletonLoader
            width="100%"
            height="2.5rem"
            borderRadius="0.375rem"
          />
        </div>
      </AppCard>
    );
  }

  const tabs: TabItem[] = tabConfig.map((config) => ({
    value: config.value,
    label: `${t(config.labelKey)} (${config.count ?? 0})`,
    content: (
      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <SkeletonLinkCard key={index} />
          ))
        ) : links && links.length > 0 ? (
          links.map((link) => (
            <LinkCard
              key={link?.id ?? Math.random().toString()}
              link={link}
              onEdit={onEdit}
              onDelete={onDelete}
              onCopy={onCopy}
              copiedId={copiedId ?? ""}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Inbox className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
              {t("noLinksFound")}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm
                ? t("noLinksMatchSearch")
                : t("noLinksInThisCategory")}
            </p>
          </div>
        )}
      </div>
    ),
  }));

  return (
    <AppCard
      className="border-gray-200 dark:border-gray-700"
      headerClassName="p-4 sm:p-6"
      title={
        <div className="flex items-center gap-2">
          <Link2 className="h-5 w-5" />
          {t("linkManagement")}
        </div>
      }
      description={t("subtitle")}
    >
      <AppTabs
        tabs={tabs ?? []}
        defaultValue={activeTab}
        onValueChange={onTabChange}
        tabsListClassName="flex-wrap h-fit"
      />
      {totalPages > 1 && (
        <AppPagination
          className="mt-6 sm:mt-10 px-4 sm:px-6 pb-4 sm:pb-6"
          currentPage={page ?? 1}
          onPageChange={setPage}
          totalPages={totalPages ?? 1}
        />
      )}
    </AppCard>
  );
};
