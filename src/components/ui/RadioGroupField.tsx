"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface Option {
  label: React.ReactNode;
  value: string;
}

interface RadioGroupFieldProps {
  name: string;
  label?: string;
  description?: string;
  options: Option[];
  required?: boolean;
  direction?: "row" | "column";
  itemClassName?: string;
  groupClassName?: string;
}

export function RadioGroupField({
  name,
  label,
  description,
  options,
  required,
  direction = "column",
  itemClassName,
  groupClassName,
}: RadioGroupFieldProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          {label && (
            <FormLabel>
              {required && <span className="text-destructive mr-1">*</span>}
              {label}
            </FormLabel>
          )}

          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={cn(
                "gap-2",
                direction === "row" ? "flex flex-row" : "flex flex-col",
                groupClassName
              )}
            >
              {options.map((opt) => (
                <FormItem
                  key={opt.value}
                  className={cn("flex items-center gap-3", itemClassName)}
                >
                  <FormControl>
                    <RadioGroupItem value={opt.value} />
                  </FormControl>
                  <FormLabel className="font-normal">{opt.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
