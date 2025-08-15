import { z } from "zod";

export const searchSchema = z.object({
  searchTerm: z.string().max(100, "Search term must be at most 100 characters"),
});
export type SearchFormValues = z.infer<typeof searchSchema>;

export const createLinkSchema = z.object({
  originUrl: z.string().url("Invalid URL"),
  alias: z.string().optional(),
  expirationDate: z.date().nullable().optional(),
  password: z.string().optional(),
  description: z.string().optional(),
  maxClicks: z.string().optional(),
});
export type CreateLinkFormValues = z.infer<typeof createLinkSchema>;
