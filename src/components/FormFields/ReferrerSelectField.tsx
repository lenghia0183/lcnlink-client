import { useTranslations } from "next-intl";
import { useGetReferrers } from "@/services/api/referrers";
import { AutoCompleteField } from "@/components/FormFields/AutoCompleteField";
import { useFormContext } from "react-hook-form";

interface ReferrerSelectFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
}

export const ReferrerSelectField = ({
  name,
  label,
  placeholder,
  required = false,
  description,
}: ReferrerSelectFieldProps) => {
  const t = useTranslations("Dashboard");
  
  const { data: referrersData, isLoading } = useGetReferrers({
    page: 1,
    limit: 100, // Load enough referrers for the dropdown
  });

  // Transform referrer data to match AutoCompleteField format
  const referrerOptions = referrersData?.items.map(referrer => ({
    id: referrer.id,
    name: referrer.referrer,
    alias: referrer.alias,
    label: referrer.alias 
      ? `${referrer.referrer} (${referrer.alias})` 
      : referrer.referrer,
  })) || [];

  return (
    <AutoCompleteField
      name={name}
      label={label}
      placeholder={placeholder || t("selectReferrer")}
      required={required}
      description={description}
      options={referrerOptions}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      disabled={isLoading}
    />
  );
};