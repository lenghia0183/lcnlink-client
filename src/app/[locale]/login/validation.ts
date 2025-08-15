import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string()
    .url("Please enter a valid URL (e.g., https://example.com)")
    .min(1, "URL is required"),
  password: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 6,
      "Password must be at least 6 characters long"
    ),
});

export type AuthFormValues = z.infer<typeof authSchema>;
