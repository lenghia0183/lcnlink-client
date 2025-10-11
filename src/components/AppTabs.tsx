"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface TabItem {
  value: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

interface AppTabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  className?: string;
  tabsListClassName?: string;
  onValueChange?: (value: string) => void;
}

export const AppTabs = ({
  tabs,
  defaultValue,
  className,
  tabsListClassName,
  onValueChange,
}: AppTabsProps) => {
  console.log("rerender", defaultValue);

  return (
    <Tabs
      onValueChange={onValueChange}
      defaultValue={defaultValue || tabs[0]?.value}
      className={cn(className)}
    >
      <TabsList className={cn(tabsListClassName)}>
        {tabs.map(({ value, label, icon }) => (
          <TabsTrigger key={value} value={value}>
            {icon}
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map(({ value, content }) => (
        <TabsContent key={value} value={value} className="mt-4 animate-fade-in">
          {content}
        </TabsContent>
      ))}
    </Tabs>
  );
};
