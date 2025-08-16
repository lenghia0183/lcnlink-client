// components/ui/app-drawer.tsx
"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { ComponentPropsWithoutRef, ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
type DrawerProps = ComponentPropsWithoutRef<typeof Drawer>;
type AppDrawerProps = DrawerProps & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: ReactNode;
  trigger?: ReactNode;
  footer?: ReactNode;
  showCloseIcon?: boolean;
  className?: string;
};

export function AppDrawer({
  open,
  onOpenChange,
  title = "",
  description,
  children,
  trigger,
  footer,
  showCloseIcon = true,
  className,
  ...props
}: AppDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} {...props}>
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}

      <DrawerContent className={cn("pt-4", className)}>
        <div className="relative px-4">
          <DrawerHeader className="text-left">
            {title && <DrawerTitle>{title}</DrawerTitle>}
            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
          </DrawerHeader>

          {showCloseIcon && (
            <DrawerClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </DrawerClose>
          )}
        </div>

        <div className="px-4 py-2">{children}</div>

        {footer && <DrawerFooter>{footer}</DrawerFooter>}
      </DrawerContent>
    </Drawer>
  );
}
