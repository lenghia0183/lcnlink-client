import { z } from "zod";

export const getSearchSchema = (t: (key: string) => string) =>
  z.object({
    searchTerm: z.string().max(100, t("dashboard.searchTermMax")),
  });
export type SearchFormValues = z.infer<ReturnType<typeof getSearchSchema>>;

export const getCreateLinkSchema = (t: (key: string) => string) =>
  z.object({
    originUrl: z.string().url(t("createLink.originInvalid")),
    alias: z.string().optional(),
    expirationDate: z.date().nullable().optional(),
    password: z.string().optional(),
    description: z.string().optional(),
    maxClicks: z.string().optional(),
  });
export type CreateLinkFormValues = z.infer<
  ReturnType<typeof getCreateLinkSchema>
>;
