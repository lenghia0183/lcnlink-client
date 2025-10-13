import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader";

export const SkeletonReferrerCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <SkeletonLoader width="120px" height="20px" className="mb-2" />
          <SkeletonLoader width="80px" height="16px" />
        </div>
        <div className="flex items-center space-x-2">
          <SkeletonLoader width="60px" height="36px" borderRadius="6px" />
          <SkeletonLoader width="60px" height="36px" borderRadius="6px" />
          <SkeletonLoader width="60px" height="36px" borderRadius="6px" />
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <SkeletonLoader width="100%" height="16px" className="mb-2" />
        <SkeletonLoader width="150px" height="16px" />
      </div>
    </div>
  );
};