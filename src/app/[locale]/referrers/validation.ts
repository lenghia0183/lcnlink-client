import { z } from "zod";

export const getCreateReferrerSchema = (t: (key: string) => string) =>
  z.object({
    referrer: z.string().min(1, t("referrer.required")),
    alias: z.string().optional(),
  });

export type CreateReferrerFormValues = z.infer<
  ReturnType<typeof getCreateReferrerSchema>
>;

export const getEditReferrerSchema = (t: (key: string) => string) =>
  z.object({
    referrer: z.string().min(1, t("referrer.required")),
    alias: z.string().optional(),
  });

export type EditReferrerFormValues = z.infer<
  ReturnType<typeof getEditReferrerSchema>
>;