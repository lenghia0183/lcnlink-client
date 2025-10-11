import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader";
import { AppCard } from "@/components/AppCard";
import { useTranslations } from "next-intl";

export const SkeletonAnalyticsPage = () => {
  const t = useTranslations("Analytics");
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <SkeletonLoader width="12rem" height="2rem" className="mb-2" />
            <SkeletonLoader width="16rem" height="1rem" />
          </div>
          <div className="flex gap-2 mt-4 lg:mt-0">
            <div className="flex h-9 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium border bg-background shadow-xs">
              <SkeletonLoader width="1rem" height="1rem" borderRadius="0.25rem" />
              <SkeletonLoader width="3rem" height="1rem" />
            </div>
            <div className="flex h-9 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium border bg-background shadow-xs">
              <SkeletonLoader width="1rem" height="1rem" borderRadius="0.25rem" />
              <SkeletonLoader width="3rem" height="1rem" />
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <AppCard
              key={index}
              className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all hover:shadow-lg"
              contentClassName="p-6"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700">
                  <SkeletonLoader width="1.5rem" height="1.5rem" borderRadius="0.25rem" />
                </div>
                <div>
                  <SkeletonLoader width="3rem" height="1.5rem" className="mb-1" />
                  <SkeletonLoader width="6rem" height="0.75rem" />
                </div>
              </div>
            </AppCard>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Click Trends */}
          <AppCard
            className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            title={
              <div className="flex items-center gap-2">
                <SkeletonLoader width="1rem" height="1rem" borderRadius="0.25rem" />
                <SkeletonLoader width="6rem" height="1rem" />
              </div>
            }
            description={<SkeletonLoader width="10rem" height="0.75rem" />}
          >
            <div className="h-64 flex items-end justify-center bg-gray-100 dark:bg-gray-700/50 rounded-lg">
              <SkeletonLoader width="8rem" height="1rem" />
            </div>
          </AppCard>

          {/* Geographic Distribution */}
          <AppCard
            className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            title={
              <div className="flex items-center gap-2">
                <SkeletonLoader width="1rem" height="1rem" borderRadius="0.25rem" />
                <SkeletonLoader width="6rem" height="1rem" />
              </div>
            }
            description={<SkeletonLoader width="10rem" height="0.75rem" />}
            contentClassName="space-y-3"
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SkeletonLoader width="1.5rem" height="1rem" borderRadius="0.125rem" />
                  <SkeletonLoader width="4rem" height="1rem" />
                </div>
                <div className="flex items-center gap-2">
                  <SkeletonLoader width="2rem" height="0.75rem" />
                  <SkeletonLoader width="2rem" height="1rem" borderRadius="0.25rem" />
                </div>
              </div>
            ))}
          </AppCard>
        </div>

        {/* Device & Browser Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Device Types */}
          <AppCard
            className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            title={
              <div className="flex items-center gap-2">
                <SkeletonLoader width="1rem" height="1rem" borderRadius="0.25rem" />
                <SkeletonLoader width="6rem" height="1rem" />
              </div>
            }
            description={<SkeletonLoader width="10rem" height="0.75rem" />}
            contentClassName="space-y-4"
          >
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SkeletonLoader width="1rem" height="1rem" borderRadius="0.25rem" />
                    <SkeletonLoader width="4rem" height="1rem" />
                  </div>
                  <div className="flex items-center gap-2">
                    <SkeletonLoader width="2rem" height="0.75rem" />
                    <SkeletonLoader width="2rem" height="1rem" borderRadius="0.25rem" />
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <SkeletonLoader width="60%" height="0.5rem" borderRadius="0.25rem" />
                </div>
              </div>
            ))}
          </AppCard>

          {/* Browsers */}
          <AppCard
            className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            title={
              <div className="flex items-center gap-2">
                <SkeletonLoader width="1rem" height="1rem" borderRadius="0.25rem" />
                <SkeletonLoader width="6rem" height="1rem" />
              </div>
            }
            description={<SkeletonLoader width="10rem" height="0.75rem" />}
            contentClassName="space-y-4"
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <SkeletonLoader width="4rem" height="1rem" />
                  <div className="flex items-center gap-2">
                    <SkeletonLoader width="2rem" height="0.75rem" />
                    <SkeletonLoader width="2rem" height="1rem" borderRadius="0.25rem" />
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <SkeletonLoader width="40%" height="0.5rem" borderRadius="0.25rem" />
                </div>
              </div>
            ))}
          </AppCard>
        </div>
      </div>
    </div>
  );
};