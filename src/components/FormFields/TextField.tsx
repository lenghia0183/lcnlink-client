"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  description?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  vertical?: boolean;
  required?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  labelWidth?: string;
  allow?: RegExp;
  prevent?: RegExp;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  iconOnClick?: () => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export function TextField({
  name,
  label,
  description,
  leftIcon,
  rightIcon,
  vertical = true,
  required,
  containerClassName,
  inputClassName,
  labelClassName,
  labelWidth = "90px",
  iconOnClick,
  allow,
  prevent,
  onChange,
  inputProps,
  ...props
}: TextFieldProps) {
  const { control } = useFormContext();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          let newValue = e.target.value;
          if (allow) {
            newValue = newValue.replace(allow, "");
          }
          field.onChange(newValue);
          if (onChange) onChange(e);
        };

        const iconClass = cn(
          "absolute top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer",
          fieldState.invalid && "text-destructive/60"
        );

        const inputField = (
          <div className="relative w-full">
            {leftIcon && (
              <span className={cn("left-3", iconClass)} onClick={iconOnClick}>
                {leftIcon}
              </span>
            )}
            <Input
              {...props}
              {...field}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              className={cn(
                leftIcon && "pl-10",
                rightIcon && "pr-10",
                inputClassName
              )}
              aria-invalid={fieldState.invalid}
              {...inputProps}
            />
            {rightIcon && (
              <span className={cn("right-3", iconClass)} onClick={iconOnClick}>
                {rightIcon}
              </span>
            )}
          </div>
        );

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
                <FormControl>{inputField}</FormControl>
                {description && (
                  <FormDescription>{description}</FormDescription>
                )}
                <FormMessage />
              </>
            ) : (
              <div className="flex justify-center items-center">
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
                  <FormControl>{inputField}</FormControl>
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
