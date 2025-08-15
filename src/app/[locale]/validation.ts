import { z } from "zod";

export const urlSchema = z.object({
  originUrl: z
    .string()
    .url("Please enter a valid URL (e.g., https://example.com)")
    .min(1, "URL is required"),
  alias: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[a-zA-Z0-9-]{3,20}$/.test(val),
      "Alias must be 3-20 characters long and contain only letters, numbers, or hyphens"
    ),
  expirationDate: z.date().nullable().optional(),
  password: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 6,
      "Password must be at least 6 characters long"
    ),
  description: z.string().optional(),
  maxClicks: z.number().nullable().optional(),
});

export type UrlFormValues = z.infer<typeof urlSchema>;
