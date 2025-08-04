"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { cn } from "@/lib/utils";
import useDebounce from "@/hooks/useDebounce";

interface AutoCompleteFieldProps<T, R = T[]> {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  options?: T[];
  getOptionLabel?: (option: T) => string;
  isOptionEqualToValue?: (option: T, value: T) => boolean;
  onChange?: (value: T) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  vertical?: boolean;
  labelClassName?: string;
  labelWidth?: string;
  asyncRequest?: (input: string) => Promise<R>;
  asyncRequestHelper?: (data: R) => T[];
  autoFetch?: boolean;
  filterOptionsLocally?: boolean;
}

export function AutoCompleteField<T, R = T[]>({
  name,
  label,
  description,
  required,
  options: initialOptions = [],
  getOptionLabel = (o) => String(o),
  isOptionEqualToValue = (a, b) => a === b,
  onChange,
  placeholder = "Select...",
  disabled,
  className,
  vertical = true,
  labelClassName,
  labelWidth = "90px",
  asyncRequest,
  asyncRequestHelper = (data) => data as unknown as T[],
  autoFetch = true,
  filterOptionsLocally = true,
}: AutoCompleteFieldProps<T, R>) {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<T[]>(initialOptions);
  const [filteredOptions, setFilteredOptions] = useState<T[]>(initialOptions);
  const [inputValue, setInputValue] = useState("");
  const debounced = useDebounce(inputValue, 500);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = useState<number>();
  const [hasFirstCall, setHasFirstCall] = useState(false);
  async function fetchOptions() {
    if (!asyncRequest) return;
    setHasFirstCall(true);
    try {
      const res = await asyncRequest(debounced);
      const list = asyncRequestHelper(res);
      setOptions(list);
      if (!hasFirstCall) {
        setFilteredOptions(list);
      }
    } catch {
      setOptions([]);
    }
  }
  useEffect(() => {
    if (!asyncRequest) return;
    if (filterOptionsLocally) return;

    if (autoFetch && !hasFirstCall) {
      fetchOptions();
    } else if (!autoFetch && open) {
      fetchOptions();
    } else if (autoFetch && hasFirstCall && debounced) {
      fetchOptions();
    } else if (!autoFetch && hasFirstCall && debounced) {
      fetchOptions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced, open]);

  useEffect(() => {
    if (!open) return;
    if (!asyncRequest) return;
    if (!filterOptionsLocally) return;
    if (autoFetch && !hasFirstCall) {
      fetchOptions();
    } else if (!autoFetch) {
      fetchOptions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useLayoutEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [open]);

  const renderTriggerButton = (selectedLabel: string | null) => (
    <Button
      ref={triggerRef}
      variant="outline"
      role="combobox"
      aria-expanded={open}
      className="w-full justify-between min-w-0"
      disabled={disabled}
    >
      <span className="flex-1 text-left truncate">
        {selectedLabel ? (
          selectedLabel
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
      </span>
      <ChevronDown className="opacity-50 ml-2" />
    </Button>
  );

  const optionForRender = filterOptionsLocally ? filteredOptions : options;

  const handleInputChange = (val: string) => {
    setInputValue(val);
    if (filterOptionsLocally) {
      const filteredOptions = options.filter((opt) =>
        getOptionLabel(opt).toLowerCase().includes(val.toLowerCase())
      );
      setFilteredOptions(filteredOptions);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selected = options.find((option) =>
          isOptionEqualToValue(option, field.value)
        );
        const labelSelected = selected ? getOptionLabel(selected) : null;

        return (
          <FormItem className={cn("w-full", className)}>
            {vertical ? (
              <>
                {label && (
                  <FormLabel className={cn("gap-1", labelClassName)}>
                    {required && <span className="text-destructive">*</span>}
                    {label}
                  </FormLabel>
                )}
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      {renderTriggerButton(labelSelected)}
                    </PopoverTrigger>
                    <PopoverContent
                      className="p-0"
                      style={triggerWidth ? { width: triggerWidth } : undefined}
                    >
                      <Command>
                        <CommandInput
                          placeholder={placeholder}
                          value={inputValue}
                          onValueChange={handleInputChange}
                        />

                        <CommandEmpty>No options found.</CommandEmpty>
                        <CommandGroup className="h-[350px] overflow-y-scroll">
                          {optionForRender.map((option, idx) => {
                            const optLabel = getOptionLabel(option);
                            return (
                              <CommandItem
                                key={idx}
                                value={optLabel}
                                onSelect={() => {
                                  field.onChange(option);
                                  onChange?.(option);
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2",
                                    isOptionEqualToValue(option, field.value)
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {optLabel}
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                {description && (
                  <FormDescription>{description}</FormDescription>
                )}
                <FormMessage />
              </>
            ) : (
              <div className="flex items-center space-x-2">
                {label && (
                  <FormLabel
                    className={cn("min-w-[90px] gap-1", labelClassName)}
                    style={{ width: labelWidth }}
                  >
                    {required && <span className="text-destructive">*</span>}
                    {label}
                  </FormLabel>
                )}
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    {renderTriggerButton(labelSelected)}
                  </PopoverTrigger>
                  <PopoverContent
                    className="p-0"
                    style={triggerWidth ? { width: triggerWidth } : undefined}
                  >
                    <Command>
                      <CommandInput
                        placeholder={placeholder}
                        value={inputValue}
                        onValueChange={handleInputChange}
                      />
                      <CommandEmpty>No options found.</CommandEmpty>
                      <CommandGroup className="h-[350px] overflow-y-scroll">
                        {options.map((option, idx) => {
                          const optLabel = getOptionLabel(option);
                          return (
                            <CommandItem
                              key={idx}
                              value={optLabel}
                              onSelect={() => {
                                field.onChange(option);
                                onChange?.(option);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2",
                                  isOptionEqualToValue(option, field.value)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {optLabel}
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </FormItem>
        );
      }}
    />
  );
}
