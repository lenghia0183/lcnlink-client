import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader";
import { AppCard } from "@/components/AppCard";

export const SkeletonLinkCard = () => {
  return (
    <AppCard 
      className="border-gray-200 dark:border-gray-700 hover:shadow-sm transition-shadow"
      contentClassName="p-6"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          {/* Short URL bar skeleton - matching the code element styling */}
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 w-[70%] h-10">
              <SkeletonLoader width="1rem" height="1rem" borderRadius="0.25rem" />
              <SkeletonLoader width="80%" height="1rem" />
            </div>
            <SkeletonLoader width="2.5rem" height="2.5rem" borderRadius="0.375rem" />
            {/* Status badges */}
            <SkeletonLoader width="4rem" height="1.5rem" borderRadius="0.375rem" />
            <SkeletonLoader width="4rem" height="1.5rem" borderRadius="0.375rem" />
          </div>
          
          {/* Original URL skeleton */}
          <div className="flex items-center gap-2 mb-3">
            <SkeletonLoader width="1rem" height="1rem" borderRadius="9999px" />
            <SkeletonLoader width="80%" height="1.25rem" />
          </div>
          
          {/* Description skeleton */}
          <SkeletonLoader width="60%" height="1rem" className="mb-3 italic" />
          
          {/* Progress bar skeleton - matching AppProgress styling */}
          <div className="mb-3 w-full">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <SkeletonLoader width="8rem" height="0.75rem" />
              <SkeletonLoader width="3rem" height="0.75rem" />
            </div>
            <div className="bg-primary/20 relative h-2 w-full overflow-hidden rounded-full">
              <SkeletonLoader 
                width="60%" 
                height="100%" 
                className="rounded-full"
              />
            </div>
          </div>
          
          {/* Stats skeleton */}
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <SkeletonLoader width="4rem" height="0.75rem" />
            <SkeletonLoader width="6rem" height="0.75rem" />
            <SkeletonLoader width="6rem" height="0.75rem" />
          </div>
        </div>
        
        {/* Action buttons skeleton */}
        <div className="flex items-center gap-2 ml-4">
          <SkeletonLoader width="2.5rem" height="2.5rem" borderRadius="0.375rem" />
          <SkeletonLoader width="2.5rem" height="2.5rem" borderRadius="0.375rem" />
          <SkeletonLoader width="2.5rem" height="2.5rem" borderRadius="0.375rem" />
        </div>
      </div>
    </AppCard>
  );
};