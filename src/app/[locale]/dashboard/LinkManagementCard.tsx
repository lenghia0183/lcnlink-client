import { AppTabs, TabItem } from "@/components/AppTabs";
import { LinkData } from "@/types/Link";
import { useTranslations } from "next-intl";
import { LinkCard } from "./LinkCard";
import { AppCard } from "@/components/AppCard";
import { Link2 } from "lucide-react";
import { AppPagination } from "@/components/AppPagination";

interface LinkManagementCardProps {
  links?: LinkData[];
  searchTerm?: string;
  activeTab: string;
  onTabChange: (value: string) => void;
  onEdit: (link: LinkData) => void;
  onDelete: (id: string) => void;
  onCopy: (text: string, id: string) => void;
  copiedId?: string;
  page: number;
  setPage: (value: number) => void;
}

export const LinkManagementCard = ({
  links = [],
  searchTerm = "",
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
    let filtered = links ?? [];

    if (status !== "all") {
      filtered = filtered.filter((link) => link?.status === status);
    }

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (link) =>
          link?.originalUrl?.toLowerCase().includes(lower) ||
          link?.shortedUrl?.toLowerCase().includes(lower) ||
          link?.description?.toLowerCase().includes(lower)
      );
    }

    return filtered ?? [];
  };

  const tabConfig = [
    {
      value: "all",
      labelKey: "allLinks",
      count: links?.length ?? 0,
    },
    {
      value: "active",
      labelKey: "activeLinks",
      count: links?.filter((l) => l?.status === "active")?.length ?? 0,
      status: "active",
    },
    {
      value: "expired",
      labelKey: "expiredLinks",
      count: links?.filter((l) => l?.status === "expired")?.length ?? 0,
      status: "expired",
    },
    {
      value: "limit_reached",
      labelKey: "limitReachedLinks",
      count: links?.filter((l) => l?.status === "limit_reached")?.length ?? 0,
      status: "limit_reached",
    },
    {
      value: "disabled",
      labelKey: "disabledLinks",
      count: links?.filter((l) => l?.status === "disabled")?.length ?? 0,
      status: "disabled",
    },
  ];

  const tabs: TabItem[] = tabConfig.map((config) => ({
    value: config.value,
    label: `${t(config.labelKey)} (${config.count ?? 0})`,
    content: (
      <div className="space-y-4">
        {filterLinks(config.status || "all")?.map((link) => (
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
        totalPages={10}
      />
    </AppCard>
  );
};
