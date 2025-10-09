import { format } from "date-fns";

export const safeDate = (date?: string | Date | null): Date | null => {
  if (!date) return null;

  try {
    if (date instanceof Date) {
      return !isNaN(date.getTime()) ? date : null;
    }

    if (typeof date === "string") {
      const parsedDate = new Date(date);
      return isNaN(parsedDate.getTime()) ? null : parsedDate;
    }

    return null;
  } catch (error) {
    console.error("Error parsing date:", error);
    return null;
  }
};

export const safeFormat = (
  date: string | Date | null | undefined,
  formatString: string,
  defaultValue: string = ""
): string => {
  try {
    const safeDateObj = safeDate(date);
    if (!safeDateObj) return defaultValue;

    return format(safeDateObj, formatString);
  } catch (error) {
    console.error("Error formatting date:", error);
    return defaultValue;
  }
};
