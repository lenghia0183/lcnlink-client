import { z } from "zod";

export const getAuthSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email(t("auth.emailInvalid")),
    password: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 6, t("auth.passwordMin")),
  });

export type AuthFormValues = z.infer<ReturnType<typeof getAuthSchema>>;
