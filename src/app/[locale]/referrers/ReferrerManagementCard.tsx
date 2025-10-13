import { ReferrerData } from "@/types/Referrer";
import { useTranslations } from "next-intl";
import { ReferrerCard } from "./ReferrerCard";
import { AppCard } from "@/components/AppCard";
import { Link2, Inbox } from "lucide-react";
import { AppPagination } from "@/components/AppPagination";
import { SkeletonReferrerCard } from "@/components/skeleton/SkeletonReferrerCard";

interface ReferrerManagementCardProps {
  referrers?: ReferrerData[];
  searchTerm?: string;
  page: number;
  totalPages: number;
  setPage: (value: number) => void;
  loading?: boolean;
  onEdit: (referrer: ReferrerData) => void;
  onDelete: (referrer: ReferrerData) => void;
}

export const ReferrerManagementCard = ({
  referrers = [],
  searchTerm,
  page,
  totalPages,
  setPage,
  loading: isLoading = false,
  onEdit,
  onDelete,
}: ReferrerManagementCardProps) => {
  const t = useTranslations("Referrers");

  if (isLoading) {
    return (
      <AppCard
        className="border-gray-200 dark:border-gray-700"
        headerClassName="p-4 sm:p-6"
        title={
          <div className="flex items-center gap-2">
            <Link2 className="h-5 w-5" />
            {t("referrerManagement")}
          </div>
        }
        description={t("subtitle")}
      >
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonReferrerCard key={index} />
          ))}
        </div>
      </AppCard>
    );
  }

  return (
    <AppCard
      className="border-gray-200 dark:border-gray-700"
      headerClassName="p-4 sm:p-6"
      title={
        <div className="flex items-center gap-2">
          <Link2 className="h-5 w-5" />
          {t("referrerManagement")}
        </div>
      }
      description={t("subtitle")}
    >
      <div className="space-y-4">
        {referrers && referrers.length > 0 ? (
          referrers.map((referrer) => (
            <ReferrerCard
              key={referrer.id}
              referrer={referrer}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Inbox className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
              {t("noReferrersFound")}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm ? t("noReferrersMatchSearch") : t("noReferrers")}
            </p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <AppPagination
          className="mt-6 sm:mt-10 px-4 sm:px-6 pb-4 sm:pb-6"
          currentPage={page}
          onPageChange={setPage}
          totalPages={totalPages}
        />
      )}
    </AppCard>
  );
};
