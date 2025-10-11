# Skeleton Loading Components

This directory contains skeleton loading components to improve the user experience during data fetching.

## Components

### SkeletonLoader
A basic skeleton loader component that can be customized with different dimensions and styles.

```tsx
import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader";

<SkeletonLoader width="100%" height="200px" />
```

### SkeletonLinkCard
A skeleton version of the LinkCard component used in the dashboard.

```tsx
import { SkeletonLinkCard } from "@/components/skeleton/SkeletonLinkCard";

<SkeletonLinkCard />
```

### SkeletonStatsCard
A skeleton version of the stats cards used in the dashboard.

```tsx
import { SkeletonStatsCard } from "@/components/skeleton/SkeletonStatsCard";

<SkeletonStatsCard />
```

### SkeletonProfileCard
A skeleton version of the profile cards used in the profile page.

```tsx
import { SkeletonProfileCard } from "@/components/skeleton/SkeletonProfileCard";

<SkeletonProfileCard />
```

### SkeletonProfileTabs
A skeleton version of the profile tabs interface used in the profile page.

```tsx
import { SkeletonProfileTabs } from "@/components/skeleton/SkeletonProfileTabs";

<SkeletonProfileTabs />
```

### SkeletonTabs
A skeleton version of the tabbed interface used in the dashboard.

```tsx
import { SkeletonTabs } from "@/components/skeleton/SkeletonTabs";

<SkeletonTabs tabCount={4} />
```

## Usage

To use skeleton loading in your components, check if data is loading and conditionally render the skeleton component:

```tsx
{isLoading ? (
  <SkeletonProfileTabs />
) : (
  <ProfileContent />
)}
```

## Implementation Details

The skeleton components use Tailwind CSS classes for styling and include a subtle animation to indicate loading state. They match the layout and dimensions of their corresponding real components to provide a smooth transition when data loads.