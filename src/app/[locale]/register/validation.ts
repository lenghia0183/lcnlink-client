import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must be at most 50 characters long"),
    email: z
      .string()
      .url("Please enter a valid URL (e.g., https://example.com)")
      .min(1, "URL is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(100, "Password must be at most 100 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters long")
      .max(100, "Confirm password must be at most 100 characters long"),
    agreeTerms: z
      .boolean()
      .array()
      .refine((val) => val.includes(true), {
        message: "You must agree to the terms and conditions",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
