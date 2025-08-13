"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import { ComponentPropsWithoutRef, ReactNode } from "react";

export type DropdownItem = {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
  separator?: boolean;
  submenu?: DropdownItem[];
};

type AppDropdownProps = ComponentPropsWithoutRef<typeof DropdownMenu> & {
  items: DropdownItem[];
  trigger?: ReactNode;
  align?: "start" | "center" | "end";
  sideOffset?: number;
  contentClassName?: string;
  itemClassName?: string;
  withChevron?: boolean;
  submenuOpenDelay?: number;
  submenuCloseDelay?: number;
};

export function AppDropdown({
  items,
  trigger,
  align = "end",
  sideOffset = 4,
  contentClassName,
  itemClassName,

  ...props
}: AppDropdownProps) {
  const renderItem = (item: DropdownItem, index: number, level = 0) => {
    if (item.submenu && item.submenu.length > 0) {
      return (
        <DropdownMenuSub key={index}>
          <DropdownMenuSubTrigger
            className={cn("gap-2", item.className, itemClassName)}
          >
            {item.icon && <span className="h-4 w-4">{item.icon}</span>}
            <span className="flex-1">{item.label}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {item.submenu.map((subItem, subIndex) =>
              renderItem(subItem, subIndex, level + 1)
            )}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      );
    }

    return (
      <DropdownMenuItem
        key={index}
        onClick={item.onClick}
        disabled={item.disabled}
        className={cn(item.className, itemClassName)}
      >
        {item.icon && <span className="h-4 w-4">{item.icon}</span>}
        <span className="flex-1">{item.label}</span>
      </DropdownMenuItem>
    );
  };

  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        sideOffset={sideOffset}
        className={cn(contentClassName)}
      >
        {items.map((item, index) => renderItem(item, index))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
