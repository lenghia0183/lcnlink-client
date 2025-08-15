import { z } from "zod";

export const getUrlSchema = (t: (key: string) => string) =>
  z.object({
    originUrl: z
      .string()
      .url(t("url.originInvalid"))
      .min(1, t("url.originRequired")),
    alias: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^[a-zA-Z0-9-]{3,20}$/.test(val),
        t("url.aliasInvalid")
      ),
    expirationDate: z.date().nullable().optional(),
    password: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 6, t("url.passwordMin")),
    description: z.string().optional(),
    maxClicks: z.number().nullable().optional(),
  });

export type UrlFormValues = z.infer<ReturnType<typeof getUrlSchema>>;
