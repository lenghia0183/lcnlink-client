import { useTranslations } from "next-intl";
import { BarChart2, QrCode } from "lucide-react";

interface ShortLinkCardProps {
  shortUrl: string;
  visits: number;
  qrScans: number;
}

export default function ShortLinkCard({
  shortUrl,
  visits,
  qrScans,
}: ShortLinkCardProps) {
  const t = useTranslations("ShortLinkCard");

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 w-full max-w-[90vw] sm:max-w-md mx-auto transform rotate-1 sm:rotate-3 animate-float">
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(1deg);
          }
          50% {
            transform: translateY(-4px) rotate(1deg);
          }
          100% {
            transform: translateY(0) rotate(1deg);
          }
        }
        @media (min-width: 640px) {
          @keyframes float {
            0% {
              transform: translateY(0) rotate(3deg);
            }
            50% {
              transform: translateY(-8px) rotate(3deg);
            }
            100% {
              transform: translateY(0) rotate(3deg);
            }
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-xs font-medium text-gray-500">{t("domain")}</span>
      </div>

      <div className="mb-4 sm:mb-6 space-y-2">
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4"></div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-1/2"></div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-1 mb-4 sm:mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 text-center">
          <p className="text-base sm:text-lg font-bold text-blue-500 break-all">
            {shortUrl}
          </p>
          <p className="text-xs text-gray-500 mt-1">{t("shortLinkLabel")}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <BarChart2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500">{t("visits")}</p>
            <p className="font-bold text-sm sm:text-base">
              {visits.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <QrCode className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500">{t("qrScans")}</p>
            <p className="font-bold text-sm sm:text-base">
              {qrScans.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
