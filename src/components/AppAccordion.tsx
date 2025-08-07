"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type AccordionData = {
  value: string;
  title: ReactNode;
  content: ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
};

type CommonProps = {
  items: AccordionData[];
  className?: string;
};

type SingleAccordionProps = {
  type: "single";
  collapsible?: boolean;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
};

type MultipleAccordionProps = {
  type: "multiple";
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
};

type AppAccordionProps = CommonProps &
  (SingleAccordionProps | MultipleAccordionProps);

export function AppAccordion(props: AppAccordionProps) {
  const { type, items, className } = props;

  const renderItem = ({
    value,
    title,
    content,
    iconLeft,
    iconRight,
    className,
  }: AccordionData) => (
    <AccordionItem key={value} value={value} className={className}>
      <AccordionTrigger className="">
        <div className="flex items-center gap-2">
          {iconLeft && <span className="">{iconLeft}</span>}
          {title}
        </div>
        {iconRight && <span className="">{iconRight}</span>}
      </AccordionTrigger>
      <AccordionContent>{content}</AccordionContent>
    </AccordionItem>
  );

  if (type === "single") {
    const { defaultValue, value, onValueChange, collapsible = true } = props;

    return (
      <Accordion
        type="single"
        collapsible={collapsible}
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
        className={cn("w-full", className)}
      >
        {items.map(renderItem)}
      </Accordion>
    );
  }

  const { defaultValue, value, onValueChange } = props;

  return (
    <Accordion
      type="multiple"
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      className={cn("w-full", className)}
    >
      {items.map(renderItem)}
    </Accordion>
  );
}
