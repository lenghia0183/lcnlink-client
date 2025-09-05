import { z } from "zod";

export const getUrlSchema = (t: (key: string) => string) =>
  z.object({
    originUrl: z
      .string()
      .url(t("url.originInvalid"))
      .min(1, t("url.originRequired")),
    alias: z.string().optional(),
    expirationDate: z.date().nullable().optional(),
    password: z.string().optional(),
    description: z.string().optional(),
    maxClicks: z.string().nullable().optional(),
  });

export type UrlFormValues = z.infer<ReturnType<typeof getUrlSchema>>;
