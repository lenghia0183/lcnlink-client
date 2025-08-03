"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface CheckboxGroupItem {
  id: string;
  label: React.ReactNode;
}

interface CheckboxGroupFieldProps {
  name: string;
  label?: React.ReactNode;
  description?: string;
  required?: boolean;
  options: CheckboxGroupItem[];
  containerClassName?: string;
  labelClassName?: string;
  direction?: "column" | "row";
}

export const CheckboxGroupField = ({
  name,
  label,
  description,
  required,
  options,
  containerClassName,
  labelClassName,
  direction = "column",
}: CheckboxGroupFieldProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className={cn("space-y-2", containerClassName)}>
          {label && (
            <FormLabel className={cn("gap-1", labelClassName)}>
              {required && <span className="text-destructive">*</span>}
              {label}
            </FormLabel>
          )}
          {description && <FormDescription>{description}</FormDescription>}

          <div
            className={cn(
              direction === "row" ? "flex flex-wrap gap-4" : "space-y-2"
            )}
          >
            {options.map((option) => (
              <FormField
                key={option.id}
                control={control}
                name={name}
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(option.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, option.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (v: string) => v !== option.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        {option.label}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
