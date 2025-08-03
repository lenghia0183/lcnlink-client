"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

interface TextAreaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  vertical?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  labelWidth?: string;
  allow?: RegExp;
  prevent?: RegExp;
  inputProps?: React.InputHTMLAttributes<HTMLTextAreaElement>;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextAreaField({
  name,
  label,
  description,
  required,
  vertical = true,
  containerClassName,
  inputClassName,
  labelClassName,
  labelWidth = "90px",
  allow,
  prevent,
  inputProps,
  onChange,

  ...props
}: TextAreaFieldProps) {
  const { control } = useFormContext();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (prevent) {
      const char = e.key;
      if (prevent.test(char)) {
        e.preventDefault();
      }
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
          let newValue = e.target.value;
          if (allow) {
            newValue = newValue.replace(allow, "");
          }
          field.onChange(newValue);
          if (onChange) onChange(e);
        };

        return (
          <FormItem className={cn("w-full", containerClassName)}>
            {vertical ? (
              <>
                {label && (
                  <FormLabel className={cn("gap-1", labelClassName)}>
                    {required && <span className="text-destructive">*</span>}
                    {label}
                  </FormLabel>
                )}
                <FormControl>
                  <Textarea
                    {...props}
                    {...field}
                    {...inputProps}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    className={cn(inputClassName)}
                    aria-invalid={fieldState.invalid}
                  />
                </FormControl>
                {description && (
                  <FormDescription>{description}</FormDescription>
                )}
                <FormMessage />
              </>
            ) : (
              <div className="flex justify-center items-start">
                {label && (
                  <FormLabel
                    className={cn("min-w-[90px] gap-1", labelClassName)}
                    style={{ width: labelWidth }}
                  >
                    {required && <span className="text-destructive">*</span>}
                    {label}
                  </FormLabel>
                )}
                <div className="flex-grow space-y-1">
                  <FormControl>
                    <Textarea
                      {...props}
                      {...field}
                      onChange={handleChange}
                      onKeyDown={handleKeyPress}
                      className={cn(inputClassName)}
                      aria-invalid={fieldState.invalid}
                    />
                  </FormControl>
                  {description && (
                    <FormDescription>{description}</FormDescription>
                  )}
                  <FormMessage />
                </div>
              </div>
            )}
          </FormItem>
        );
      }}
    />
  );
}
