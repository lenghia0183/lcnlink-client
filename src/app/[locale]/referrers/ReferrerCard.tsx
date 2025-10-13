import { ReferrerData } from "@/types/Referrer";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { vi, enUS } from "date-fns/locale";
import { useLocale } from "next-intl";

interface ReferrerCardProps {
  referrer: ReferrerData;
  onEdit: (referrer: ReferrerData) => void;
  onDelete: (referrer: ReferrerData) => void;
}

export const ReferrerCard = ({ referrer, onEdit, onDelete }: ReferrerCardProps) => {
  const t = useTranslations("Referrers");
  const locale = useLocale();
  const dateLocale = locale === "vi" ? vi : enUS;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {referrer.referrer}
          </h3>
          {referrer.alias && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t("alias")}: {referrer.alias}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(referrer)}
            className="h-9 px-3"
          >
            <Pencil className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">{t("edit")}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(referrer)}
            className="h-9 px-3 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">{t("delete")}</span>
          </Button>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t("createdAt")}: {format(new Date(referrer.createdAt), "PPP", { locale: dateLocale })}
        </p>
      </div>
    </div>
  );
};