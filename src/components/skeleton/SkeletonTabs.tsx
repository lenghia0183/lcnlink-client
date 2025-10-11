import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader";

interface SkeletonTabsProps {
  tabCount?: number;
}

export const SkeletonTabs = ({ tabCount = 4 }: SkeletonTabsProps) => {
  return (
    <div>
      {/* Tab list skeleton - matching the actual TabsList styling */}
      <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground mb-4">
        {Array.from({ length: tabCount }).map((_, index) => (
          <SkeletonLoader
            key={index}
            width={`${100 / tabCount}%`}
            height="2rem"
            borderRadius="0.375rem"
            className="mx-1"
          />
        ))}
      </div>
      
      {/* Tab content skeleton */}
      <div className="space-y-4 mt-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonLoader 
            key={index} 
            width="100%" 
            height="150px" 
            borderRadius="0.5rem" 
          />
        ))}
      </div>
    </div>
  );
};