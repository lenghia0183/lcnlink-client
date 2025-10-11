import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader";
import { AppCard } from "@/components/AppCard";

export const SkeletonProfileCard = () => {
  return (
    <AppCard padded>
      <div className="space-y-6">
        {/* Personal Info Card Skeleton */}
        <div>
          <SkeletonLoader width="8rem" height="1.5rem" className="mb-2" />
          <SkeletonLoader width="12rem" height="1rem" className="mb-6" />
          
          {/* Form fields skeleton - matching Input component styling */}
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
          </div>
          
          {/* Button skeleton - matching AppButton styling */}
          <div className="flex h-9 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground shadow-xs mt-4">
            <SkeletonLoader width="1rem" height="1rem" borderRadius="0.25rem" />
            <SkeletonLoader width="6rem" height="1rem" />
          </div>
        </div>
        
        {/* Change Password Card Skeleton */}
        <div>
          <SkeletonLoader width="10rem" height="1.5rem" className="mb-2" />
          <SkeletonLoader width="12rem" height="1rem" className="mb-6" />
          
          {/* Password fields skeleton */}
          <div className="space-y-4">
            {/* Current password field */}
            <div className="space-y-2">
              <SkeletonLoader width="8rem" height="1rem" />
              <div className="flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs items-center justify-between">
                <SkeletonLoader width="1rem" height="1rem" borderRadius="0.25rem" className="mr-2" />
                <SkeletonLoader width="60%" height="1rem" />
                <SkeletonLoader width="1rem" height="1rem" borderRadius="0.25rem" />
              </div>
            </div>
            
            {/* New password field */}
            <div className="space-y-2">
              <SkeletonLoader width="8rem" height="1rem" />
              <div className="flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs items-center justify-between">
                <SkeletonLoader width="1rem" height="1rem" borderRadius="0.25rem" className="mr-2" />
                <SkeletonLoader width="60%" height="1rem" />
                <SkeletonLoader width="1rem" height="1rem" borderRadius="0.25rem" />
              </div>
            </div>
            
            {/* Confirm password field */}
            <div className="space-y-2">
              <SkeletonLoader width="8rem" height="1rem" />
              <div className="flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs items-center justify-between">
                <SkeletonLoader width="1rem" height="1rem" borderRadius="0.25rem" className="mr-2" />
                <SkeletonLoader width="60%" height="1rem" />
                <SkeletonLoader width="1rem" height="1rem" borderRadius="0.25rem" />
              </div>
            </div>
          </div>
          
          {/* Button skeleton - matching AppButton styling */}
          <div className="flex h-9 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground shadow-xs mt-4">
            <SkeletonLoader width="1rem" height="1rem" borderRadius="0.25rem" />
            <SkeletonLoader width="8rem" height="1rem" />
          </div>
        </div>
        
        {/* 2FA Card Skeleton */}
        <div>
          <SkeletonLoader width="10rem" height="1.5rem" className="mb-2" />
          <SkeletonLoader width="12rem" height="1rem" className="mb-6" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <SkeletonLoader width="2rem" height="2rem" borderRadius="9999px" />
              <div>
                <SkeletonLoader width="8rem" height="1rem" className="mb-1" />
                <SkeletonLoader width="10rem" height="0.75rem" />
              </div>
            </div>
            <div className="flex space-x-2">
              {/* Manage 2FA button */}
              <div className="flex h-8 items-center justify-center gap-1.5 rounded-md px-3 text-sm font-medium border bg-background shadow-xs">
                <SkeletonLoader width="1rem" height="1rem" borderRadius="0.25rem" />
                <SkeletonLoader width="5rem" height="1rem" />
              </div>
              {/* Enable/Disable button */}
              <div className="flex h-8 items-center justify-center gap-1.5 rounded-md px-3 text-sm font-medium border bg-background shadow-xs">
                <SkeletonLoader width="1rem" height="1rem" borderRadius="0.25rem" />
                <SkeletonLoader width="3rem" height="1rem" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppCard>
  );
};