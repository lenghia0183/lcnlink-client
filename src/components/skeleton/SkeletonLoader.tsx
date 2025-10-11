import { cn } from "@/lib/utils";

interface SkeletonLoaderProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
  animate?: boolean;
}

export const SkeletonLoader = ({
  className,
  width,
  height,
  borderRadius = "0.5rem",
  animate = true,
}: SkeletonLoaderProps) => {
  return (
    <div
      className={cn(
        "bg-gray-200 dark:bg-gray-700 rounded",
        animate && "animate-pulse",
        className
      )}
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
};