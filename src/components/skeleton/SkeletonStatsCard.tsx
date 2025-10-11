import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader";
import { AppCard } from "@/components/AppCard";

export const SkeletonStatsCard = () => {
  return (
    <AppCard 
      className="border-gray-200 dark:border-gray-700"
      contentClassName="p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <SkeletonLoader width="8rem" height="1rem" className="mb-2" />
          <SkeletonLoader width="4rem" height="2rem" className="mb-1" />
          <SkeletonLoader width="10rem" height="0.75rem" />
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="p-3 rounded-lg">
            <SkeletonLoader width="1.5rem" height="1.5rem" borderRadius="0.5rem" />
          </div>
        </div>
      </div>
    </AppCard>
  );
};