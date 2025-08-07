"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "../ui/calendar";
import { DayPickerProps } from "react-day-picker";

type DatePickerFieldProps = {
  name: string;
  label?: React.ReactNode;
  description?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
} & Omit<DayPickerProps, "selected" | "onSelect">;

function getFormattedDateValue(
  mode: "single" | "range" | "multiple",
  value: unknown
): string {
  if (mode === "single" && value instanceof Date) {
    return format(value, "PPP");
  }

  if (
    mode === "range" &&
    typeof value === "object" &&
    value !== null &&
    "from" in value &&
    "to" in value &&
    value.from instanceof Date &&
    value.to instanceof Date
  ) {
    return `${format(value.from, "PPP")} - ${format(value.to, "PPP")}`;
  }

  if (mode === "multiple" && Array.isArray(value) && value.length > 0) {
    return value.map((date: Date) => format(date, "MMM d")).join(", ");
  }

  return "";
}

export const DatePickerField = ({
  name,
  label,
  description,
  required,
  mode = "single",
  placeholder,
  className,
  ...props
}: DatePickerFieldProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        const formatted = getFormattedDateValue(mode, field.value);
        return (
          <FormItem className={className}>
            {label && (
              <FormLabel className="gap-1">
                {required && <span className="text-destructive">*</span>}
                {label}
              </FormLabel>
            )}
            {description && <FormDescription>{description}</FormDescription>}

            <FormControl>
              <Controller
                name={name}
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            fieldState.invalid &&
                              "!ring-destructive/20 dark:!ring-destructive/40 !border-destructive",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-1" />
                          {formatted || placeholder}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode={mode}
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          required
                          {...props}
                        />
                      </PopoverContent>
                    </Popover>
                  );
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
