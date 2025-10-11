import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader";
import { AppCard } from "@/components/AppCard";
import { useTranslations } from "next-intl";

export const SkeletonProfileTabs = () => {
  const t = useTranslations("Profile");
  
  return (
    <div className="space-y-6">
      {/* Profile Tab Skeleton */}
      <AppCard
        title={t("personalInfo")}
        description={t("updatePersonalInfo")}
        padded
      >
        <div className="space-y-4">
          {/* Full name field */}
          <div className="space-y-2">
            <SkeletonLoader width="6rem" height="1rem" />
            <div className="flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs items-center">
              <SkeletonLoader width="1rem" height="1rem" borderRadius="0.25rem" className="mr-2" />
              <SkeletonLoader width="80%" height="1rem" />
            </div>
          </div>
          
          {/* Email field */}
          <div className="space-y-2">
            <SkeletonLoader width="6rem" height="1rem" />
            <div className="flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs items-center">
              <SkeletonLoader width="1rem" height="1rem" borderRadius="0.25rem" className="mr-2" />
              <SkeletonLoader width="80%" height="1rem" />
            </div>
          </div>
          
          {/* Phone field */}
          <div className="space-y-2">
            <SkeletonLoader width="6rem" height="1rem" />
            <div className="flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs items-center">
              <SkeletonLoader width="1rem" height="1rem" borderRadius="0.25rem" className="mr-2" />
              <SkeletonLoader width="80%" height="1rem" />
            </div>
          </div>
          
          {/* Gender field */}
          <div className="space-y-2">
            <SkeletonLoader width="6rem" height="1rem" />
            <div className="flex gap-4">
              {/* Radio group items */}
              <div className="flex items-center gap-3">
                <SkeletonLoader width="1rem" height="1rem" borderRadius="9999px" />
                <SkeletonLoader width="3rem" height="1rem" />
              </div>
              <div className="flex items-center gap-3">
                <SkeletonLoader width="1rem" height="1rem" borderRadius="9999px" />
                <SkeletonLoader width="4rem" height="1rem" />
              </div>
              <div className="flex items-center gap-3">
                <SkeletonLoader width="1rem" height="1rem" borderRadius="9999px" />
                <SkeletonLoader width="3rem" height="1rem" />
              </div>
            </div>
          </div>
          
          {/* Date of birth field */}
          <div className="space-y-2">
            <SkeletonLoader width="8rem" height="1rem" />
            <div className="flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs items-center justify-between">
              <SkeletonLoader width="1rem" height="1rem" borderRadius="0.25rem" className="mr-2" />
              <SkeletonLoader width="60%" height="1rem" />
              <SkeletonLoader width="1rem" height="1rem" borderRadius="0.25rem" />
            </div>
          </div>
          
          {/* Button skeleton */}
          <div className="flex h-9 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground shadow-xs mt-4">
            <SkeletonLoader width="1rem" height="1rem" borderRadius="0.25rem" />
            <SkeletonLoader width="6rem" height="1rem" />
          </div>
        </div>
      </AppCard>
    </div>
  );
};