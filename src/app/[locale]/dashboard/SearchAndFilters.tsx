"use client";

import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Search, Filter, Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { AppCard } from "@/components/AppCard";
import { TextField } from "@/components/FormFields/TextField";
import { getSearchSchema, SearchFormValues } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppButton } from "@/components/AppButton";

type FormValues = SearchFormValues;

interface SearchAndFiltersProps {
  defaultSearch?: string;
  onSearchChange: (value: string) => void;
}

export const SearchAndFilters = ({
  defaultSearch = "",
  onSearchChange,
}: SearchAndFiltersProps) => {
  const t = useTranslations("Dashboard");

  const schema = getSearchSchema(t);

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      searchTerm: defaultSearch,
    },
    mode: "onSubmit",
  });

  const handleSubmit = (data: FormValues) => {
    onSearchChange(data.searchTerm);
  };

  return (
    <AppCard
      className="mb-8 border-gray-200 dark:border-gray-700"
      contentClassName="p-6"
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="flex flex-col lg:flex-row gap-4"
        >
          <TextField
            name="searchTerm"
            placeholder={t("searchPlaceholder")}
            leftIcon={<Search className="h-4 w-4 text-gray-400" />}
            inputClassName="pl-10"
            className="flex-1"
          />

          <div className="flex gap-2">
            <AppButton type="submit" variant="outline" iconLeft={<Filter />}>
              {t("filter")}
            </AppButton>
            <AppButton variant="outline" iconLeft={<Download />}>
              {t("export")}
            </AppButton>
          </div>
        </form>
      </FormProvider>
    </AppCard>
  );
};
