import {
  CheckCircle,
  Clock,
  Shield,
  MousePointer,
  Calendar,
  ExternalLink,
  Globe,
  Settings,
  Copy,
  QrCode,
  Edit,
  Share2,
  Mail,
  Twitter,
  Facebook,
  Trash2,
  MoreHorizontal,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { format } from "date-fns";
import { AppButton } from "@/components/AppButton";
import { AppProgress } from "@/components/AppProgress";
import { AppDropdown } from "@/components/AppDropDown";
import { AppCard } from "@/components/AppCard";
import { LinkData } from "@/types/Link";
import { useTranslations } from "next-intl";
import { LINK_STATUS } from "@/constants/common";
import { useState } from "react";
import { AppDialog } from "@/components/AppDialog";
import Image from "@/components/Image";
import { shareOnFacebook, shareOnTwitter } from "@/utils/socialShare";
import { toast } from "@/components/AppToast";

interface LinkCardProps {
  link?: LinkData;
  onEdit?: (link: LinkData) => void;
  onDelete: (link: LinkData) => void;
  onCopy: (text: string, id: string) => void;
  copiedId?: string;
}

export const LinkCard = ({
  link,
  onEdit,
  onDelete,
  onCopy,
  copiedId,
}: LinkCardProps) => {
  const t = useTranslations("Dashboard");
  const [isShowQrCode, setIsShowQrCode] = useState(false);
  if (!link) return null;

  const getStatusBadge = () => {
    const statusConfig = {
      [LINK_STATUS.ACTIVE]: {
        variant: "default" as const,
        label: t("active"),
        icon: <CheckCircle className="h-3 w-3" />,
      },
      [LINK_STATUS.EXPIRED]: {
        variant: "destructive" as const,
        label: t("expired"),
        icon: <Clock className="h-3 w-3" />,
      },
      [LINK_STATUS.DISABLED]: {
        variant: "secondary" as const,
        label: t("disabled"),
        icon: <AlertCircle className="h-3 w-3" />,
      },
      [LINK_STATUS.LIMIT_REACHED]: {
        variant: "outline" as const,
        label: t("limitReached"),
        icon: <MousePointer className="h-3 w-3" />,
      },
    };

    const config = statusConfig[link?.status];

    if (!config) return null;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const getProgressPercentage = (clicks?: number, maxClicks?: number) => {
    if (!maxClicks || !clicks) return 0;
    return Math.min((clicks / maxClicks) * 100, 100);
  };

  const handleTwitterShare = () => {
    if (!link?.shortedUrl) return;

    shareOnTwitter({
      url: link.shortedUrl,
      title: link.description || "Check out this link",
    });
  };

  const handleFacebookShare = () => {
    if (!link?.shortedUrl) return;

    shareOnFacebook({
      url: link.shortedUrl,
    });
  };

  return (
    <AppCard
      className="border-gray-200 dark:border-gray-700 hover:shadow-sm transition-shadow"
      contentClassName="p-6"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <code className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2">
              <Globe className="h-4 w-4" />
              {link?.shortedUrl ?? ""}
            </code>
            <AppButton
              variant="ghost"
              size="icon"
              onClick={() => onCopy(link?.shortedUrl ?? "", link?.id ?? "")}
              iconLeft={
                copiedId === link?.id ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )
              }
            />
            {getStatusBadge()}
            {link?.isUsePassword && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                {t("protected")}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 mb-3">
            <ExternalLink className="h-4 w-4 text-gray-400" />
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {link?.originalUrl ?? ""}
            </p>
          </div>
          {link?.description && (
            <p className="text-sm text-gray-500 mb-3 italic">
              {link.description}
            </p>
          )}
          {Boolean(link?.maxClicks) && (
            <AppProgress
              leftLabel={`${t("clicks")}: ${link?.clicksCount ?? 0}/${
                link.maxClicks
              }`}
              rightLabel={`${getProgressPercentage(
                link?.clicksCount,
                link.maxClicks
              ).toFixed(1)}%`}
              value={getProgressPercentage(link?.clicksCount, link.maxClicks)}
              indicatorClassName={
                link?.status === LINK_STATUS.LIMIT_REACHED
                  ? "bg-red-500"
                  : "bg-blue-500"
              }
            />
          )}
          <div className="flex items-center gap-6 text-xs text-gray-500">
            {link?.clicksCount !== undefined && (
              <span className="flex items-center gap-1">
                <MousePointer className="h-3 w-3" />
                {link?.clicksCount ?? 0} {t("clicks")}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {link?.createdAt ? format(link.createdAt, "dd/MM/yyyy") : "--"}
            </span>
            {link?.expireAt && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {t("expires")} {format(link.expireAt, "dd/MM/yyyy")}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <AppButton
            variant="outline"
            size="icon"
            iconLeft={<QrCode />}
            onClick={() => {
              setIsShowQrCode(true);
            }}
          />
          {onEdit && (
            <AppButton
              variant="outline"
              size="icon"
              iconLeft={<Settings />}
              onClick={() => onEdit(link)}
            />
          )}
          <AppDropdown
            items={[
              ...(onEdit
                ? [
                    {
                      label: t("edit"),
                      icon: <Edit className="h-4 w-4" />,
                      onClick: () => onEdit(link),
                    },
                  ]
                : []),
              {
                label: t("share"),
                icon: <Share2 className="h-4 w-4" />,
                submenu: [
                  {
                    label: t("copyLink"),
                    icon: <Copy className="h-4 w-4" />,
                    onClick: () =>
                      link?.shortedUrl &&
                      onCopy(link.shortedUrl, link?.id ?? ""),
                  },
                  {
                    label: t("socialMedia"),
                    submenu: [
                      {
                        label: "Twitter",
                        icon: <Twitter className="h-4 w-4" />,
                        onClick: handleTwitterShare,
                      },
                      {
                        label: "Facebook",
                        icon: <Facebook className="h-4 w-4" />,
                        onClick: handleFacebookShare,
                      },
                    ],
                  },
                ],
              },
              {
                label: t("delete"),
                icon: <Trash2 className="h-4 w-4" />,
                onClick: () => link?.id && onDelete(link),
                className:
                  "text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20",
              },
            ]}
            trigger={
              <AppButton
                variant="outline"
                size="icon"
                iconLeft={<MoreHorizontal />}
              />
            }
            withChevron={false}
          />
        </div>
      </div>
      <AppDialog
        open={isShowQrCode}
        onOpenChange={setIsShowQrCode}
        title={t("")}
        classNameContent=""
      >
        <div className="flex flex-col items-center gap-4">
          <Image
            src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${link?.shortedUrl}`}
            alt="QR Code"
            width={300}
            height={300}
          ></Image>
        </div>
      </AppDialog>
    </AppCard>
  );
};
