"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface AppCardProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  hoverAble?: boolean;
  padded?: boolean;
  variant?: "default" | "elevated" | "muted";
}

export const AppCard: React.FC<AppCardProps> = ({
  title,
  description,
  children,
  footer,
  className,
  contentClassName,
  headerClassName,
  footerClassName,
  hoverAble = true,
  variant = "default",
}) => {
  return (
    <Card
      className={cn(
        variant === "elevated" && "shadow-lg",
        variant === "muted" && "bg-muted",
        hoverAble && "hover:shadow-md hover:border-primary",
        className
      )}
    >
      {(title || description) && (
        <CardHeader className={cn("space-y-1", headerClassName)}>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}

      <CardContent className={cn(contentClassName)}>{children}</CardContent>

      {footer && (
        <CardFooter className={cn(footerClassName)}>{footer}</CardFooter>
      )}
    </Card>
  );
};
