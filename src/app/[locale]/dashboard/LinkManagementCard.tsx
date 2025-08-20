import { AppTabs, TabItem } from "@/components/AppTabs";
import { LinkData } from "@/types/Link";
import { useTranslations } from "next-intl";
import { LinkCard } from "./LinkCard";
import { AppCard } from "@/components/AppCard";
import { Link2 } from "lucide-react";
import { AppPagination } from "@/components/AppPagination";
import { LINK_STATUS, LinkStatus } from "@/constants/common";
import { TotalLinksPerStatus } from "./page";
import { get } from "http";

interface LinkManagementCardProps {
  links?: LinkData[];
  searchTerm?: string;
  activeTab: string;
  onTabChange: (value: string) => void;
  onEdit: (link: LinkData) => void;
  onDelete: (id: LinkData) => void;
  onCopy: (text: string, id: string) => void;
  copiedId?: string;
  totalLinksPerStatus?: TotalLinksPerStatus[];
  page: number;
  totalPages: number;
  setPage: (value: number) => void;
}

export const LinkManagementCard = ({
  links = [],
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
}: LinkManagementCardProps) => {
  const t = useTranslations("Dashboard");

  const getCountByStatus = (status: LinkStatus) => {
    return totalLinksPerStatus?.find((l) => l.status === status)?.count || 0;
  };

  const tabConfig = [
    {
      value: "",
      labelKey: "allLinks",
      count: getCountByStatus("all"),
    },
    {
      value: LINK_STATUS.ACTIVE,
      labelKey: "activeLinks",
      count: getCountByStatus(LINK_STATUS.ACTIVE),
      status: LINK_STATUS.ACTIVE,
    },
    {
      value: LINK_STATUS.EXPIRED,
      labelKey: "expiredLinks",
      count: getCountByStatus(LINK_STATUS.EXPIRED),
      status: LINK_STATUS.EXPIRED,
    },
    {
      value: LINK_STATUS.LIMIT_REACHED,
      labelKey: "limitReachedLinks",
      count: getCountByStatus(LINK_STATUS.LIMIT_REACHED),
      status: LINK_STATUS.LIMIT_REACHED,
    },
    {
      value: LINK_STATUS.DISABLED,
      labelKey: "disabledLinks",
      count: getCountByStatus(LINK_STATUS.DISABLED),
      status: LINK_STATUS.DISABLED,
    },
  ];

  const tabs: TabItem[] = tabConfig.map((config) => ({
    value: config.value,
    label: `${t(config.labelKey)} (${config.count ?? 0})`,
    content: (
      <div className="space-y-4">
        {links?.map((link) => (
          <LinkCard
            key={link?.id ?? Math.random().toString()}
            link={link}
            onEdit={onEdit}
            onDelete={onDelete}
            onCopy={onCopy}
            copiedId={copiedId ?? ""}
          />
        ))}
      </div>
    ),
  }));

  return (
    <AppCard
      className="border-gray-200 dark:border-gray-700"
      headerClassName=""
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
        className="w-full"
      />
      <AppPagination
        className="mt-10"
        currentPage={page ?? 1}
        onPageChange={setPage}
        totalPages={totalPages ?? 1}
      />
    </AppCard>
  );
};
