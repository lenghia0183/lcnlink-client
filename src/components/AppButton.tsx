// components/ui/app-button.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type AppButtonProps = ComponentPropsWithoutRef<typeof Button> & {
  loading?: boolean;
  loadingText?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  tooltip?: string;
  href?: string;
};

export function AppButton({
  children,
  loading = false,
  loadingText,
  iconLeft,
  iconRight,
  fullWidth = false,
  disabled,
  className,
  tooltip,
  href,
  ...props
}: AppButtonProps) {
  const content = (
    <>
      {loading && <Loader2 className="animate-spin" aria-hidden="true" />}
      {!loading && iconLeft && (
        <span className="" aria-hidden="true">
          {iconLeft}
        </span>
      )}
      {children && <span>{loading ? loadingText || children : children}</span>}
      {!loading && iconRight && (
        <span className="" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </>
  );

  const contentForLink = (
    <>
      {iconLeft && (
        <span className="" aria-hidden="true">
          {iconLeft}
        </span>
      )}
      <span>{children}</span>
      {iconRight && (
        <span className="" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </>
  );

  const baseClass = cn(
    fullWidth && "w-full",
    loading && "cursor-not-allowed opacity-80",
    className
  );

  const button = href ? (
    <Button disabled={disabled} className={baseClass} {...props}>
      <Link
        href={href}
        className={cn("flex items-center justify-center", baseClass)}
      >
        <span className="flex items-center gap-2">{contentForLink}</span>
      </Link>
    </Button>
  ) : (
    <Button disabled={disabled || loading} className={baseClass} {...props}>
      {content}
    </Button>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return button;
}
