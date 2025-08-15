import { AppTabs, TabItem } from "@/components/AppTabs";
import { LinkData } from "@/types/Link";
import { useTranslations } from "next-intl";
import { LinkCard } from "./LinkCard";
import { AppCard } from "@/components/AppCard";
import { Link2 } from "lucide-react";
import { AppPagination } from "@/components/AppPagination";

interface LinkManagementCardProps {
  links: LinkData[];
  searchTerm: string;
  activeTab: string;
  onTabChange: (value: string) => void;
  onEdit: (link: LinkData) => void;
  onDelete: (id: string) => void;
  onCopy: (text: string, id: string) => void;
  copiedId: string;
  page: number;
  setPage: (value: number) => void;
}

export const LinkManagementCard = ({
  links,
  searchTerm,
  activeTab,
  onTabChange,
  onEdit,
  onDelete,
  onCopy,
  copiedId,
  page,
  setPage,
}: LinkManagementCardProps) => {
  const t = useTranslations("Dashboard");

  const filterLinks = (status: string) => {
    let filtered = links;

    if (status !== "all") {
      filtered = links.filter((link) => link.status === status);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (link) =>
          link.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
          link.shortUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (link.description &&
            link.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filtered;
  };

  const tabConfig = [
    {
      value: "all",
      labelKey: "allLinks",
      count: links.length,
    },
    {
      value: "active",
      labelKey: "activeLinks",
      count: links.filter((l) => l.status === "active").length,
      status: "active",
    },
    {
      value: "expired",
      labelKey: "expiredLinks",
      count: links.filter((l) => l.status === "expired").length,
      status: "expired",
    },
    {
      value: "limit_reached",
      labelKey: "limitReachedLinks",
      count: links.filter((l) => l.status === "limit_reached").length,
      status: "limit_reached",
    },
    {
      value: "disabled",
      labelKey: "disabledLinks",
      count: links.filter((l) => l.status === "disabled").length,
      status: "disabled",
    },
  ];

  const tabs: TabItem[] = tabConfig.map((config) => ({
    value: config.value,
    label: `${t(config.labelKey)} (${config.count})`,
    content: (
      <div className="space-y-4">
        {filterLinks(config.status || "all").map((link) => (
          <LinkCard
            key={link.id}
            link={link}
            onEdit={onEdit}
            onDelete={onDelete}
            onCopy={onCopy}
            copiedId={copiedId}
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
        tabs={tabs}
        defaultValue={activeTab}
        onValueChange={onTabChange}
        className="w-full"
      />
      <AppPagination
        className="mt-10"
        currentPage={page}
        onPageChange={setPage}
        totalPages={10}
      />
    </AppCard>
  );
};
