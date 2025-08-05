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
import { Badge } from "@/components/ui/badge";
import { Check, ChevronDown, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { cn } from "@/lib/utils";
import useDebounce from "@/hooks/useDebounce";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AutoCompleteFieldProps<T, R = T[]> {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  options?: T[];
  getOptionLabel?: (option: T) => string;
  isOptionEqualToValue?: (option: T, value: T) => boolean;
  onChange?: (value: T | T[]) => void;
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
  multiple?: boolean;
  maxBadges?: number;
  badgeMaxWidth?: string;
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
  multiple = false,
  maxBadges = 2,
  badgeMaxWidth = "120px",
}: AutoCompleteFieldProps<T, R>) {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<T[]>(initialOptions);
  const [filteredOptions, setFilteredOptions] = useState<T[]>(initialOptions);
  const [inputValue, setInputValue] = useState("");
  const debounced = useDebounce(inputValue, 500);
  const [hasFirstCall, setHasFirstCall] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = useState<number>(0);

  const fetchOptions = async () => {
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
  };

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
  }, [open, disabled]);

  const handleInputChange = (val: string) => {
    setInputValue(val);
    if (filterOptionsLocally) {
      const filtered = options.filter((opt) =>
        getOptionLabel(opt).toLowerCase().includes(val.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  };

  const optionForRender = filterOptionsLocally ? filteredOptions : options;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selected = multiple
          ? options.filter(
              (opt) =>
                Array.isArray(field.value) &&
                field.value.some((v: T) => isOptionEqualToValue(opt, v))
            )
          : options.find((opt) => isOptionEqualToValue(opt, field.value));

        const selectedValues = multiple
          ? (selected as T[])
          : selected
          ? [selected as T]
          : [];

        const selectedLabels = selectedValues.map(getOptionLabel);

        const handleSelect = (option: T) => {
          if (multiple) {
            const currentValues = Array.isArray(field.value) ? field.value : [];
            const exists = currentValues.some((v: T) =>
              isOptionEqualToValue(v, option)
            );
            const updated = exists
              ? currentValues.filter((v: T) => !isOptionEqualToValue(v, option))
              : [...currentValues, option];
            field.onChange(updated);
            onChange?.(updated);
          } else {
            field.onChange(option);
            onChange?.(option);
            setOpen(false);
          }
        };

        const removeItem = (value: T) => {
          if (!multiple || !Array.isArray(field.value)) return;

          const updated = field.value.filter(
            (v: T) => !isOptionEqualToValue(v, value)
          );
          field.onChange(updated);
          onChange?.(updated);
        };

        const isSelected = (option: T) => {
          if (multiple) {
            return (
              Array.isArray(field.value) &&
              field.value.some((v: T) => isOptionEqualToValue(v, option))
            );
          }
          return isOptionEqualToValue(option, field.value);
        };

        const calculateBadgeWidth = () => {
          if (!triggerWidth) return badgeMaxWidth;

          const visibleBadges = Math.min(selectedValues.length, maxBadges);
          const indicatorWidth = selectedValues.length > maxBadges ? 40 : 0;
          const chevronWidth = 60;
          const padding = 60;

          const availableWidth =
            triggerWidth - chevronWidth - padding - indicatorWidth;

          const widthPerBadge = availableWidth / Math.max(1, visibleBadges);

          const minWidth = 30;
          const maxWidth = 200;

          return `${Math.min(
            maxWidth,
            Math.max(minWidth, widthPerBadge - 8)
          )}px`;
        };

        const dynamicBadgeMaxWidth = calculateBadgeWidth();

        const renderBadge = (value: T) => {
          const label = getOptionLabel(value);
          return (
            <Badge
              key={label}
              variant="secondary"
              className="flex items-center gap-1 py-1 px-2"
            >
              <span
                className="truncate"
                style={{ maxWidth: dynamicBadgeMaxWidth }}
              >
                {label}
              </span>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(value);
                }}
                className="rounded-full hover:bg-accent cursor-pointer"
              >
                <X className="h-3 w-3" />
              </span>
            </Badge>
          );
        };

        const renderBadgeIndicator = () => {
          const hiddenCount = selectedLabels.length - maxBadges;
          const hiddenValues = selectedValues.slice(maxBadges);
          const hiddenLabels = hiddenValues.map(getOptionLabel);

          return (
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  variant="outline"
                  className="py-1 px-2 cursor-pointer hover:bg-accent"
                >
                  +{hiddenCount}
                </Badge>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                align="start"
                className="max-w-md max-h-60 overflow-auto"
              >
                <div className="flex flex-col gap-1 p-1">
                  {hiddenLabels.map((label, index) => (
                    <div key={index} className="py-1">
                      {label}
                    </div>
                  ))}
                </div>
              </TooltipContent>
            </Tooltip>
          );
        };

        const renderSelectedBadges = () => {
          if (!multiple || selectedLabels.length === 0) return null;

          return (
            <div className="flex gap-1">
              {selectedValues
                .slice(0, maxBadges)
                .map((value) => renderBadge(value))}

              {selectedLabels.length > maxBadges && renderBadgeIndicator()}
            </div>
          );
        };

        const renderTriggerButton = () => (
          <Button
            ref={triggerRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between min-w-0"
            disabled={disabled}
          >
            <div className="flex-1 flex flex-wrap items-center gap-1 min-w-0">
              {selectedLabels.length === 0 ? (
                <span className="text-muted-foreground truncate">
                  {placeholder}
                </span>
              ) : multiple ? (
                renderSelectedBadges()
              ) : (
                <span
                  className="truncate"
                  style={{ maxWidth: dynamicBadgeMaxWidth }}
                >
                  {selectedLabels[0]}
                </span>
              )}
            </div>
            <ChevronDown className="opacity-50 ml-2" />
          </Button>
        );

        const content = (
          <Command>
            <CommandInput
              placeholder={placeholder}
              value={inputValue}
              onValueChange={handleInputChange}
            />
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup className="max-h-[350px] overflow-y-auto">
              {optionForRender.map((option, idx) => {
                const optLabel = getOptionLabel(option);
                return (
                  <CommandItem
                    key={idx}
                    value={optLabel}
                    onSelect={() => handleSelect(option)}
                  >
                    <Check
                      className={cn(
                        "mr-2",
                        isSelected(option) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="truncate">{optLabel}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </Command>
        );

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
                      {renderTriggerButton()}
                    </PopoverTrigger>
                    <PopoverContent
                      className="p-0"
                      style={triggerWidth ? { width: triggerWidth } : undefined}
                    >
                      {content}
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
                    {renderTriggerButton()}
                  </PopoverTrigger>
                  <PopoverContent
                    className="p-0"
                    style={triggerWidth ? { width: triggerWidth } : undefined}
                  >
                    {content}
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
