
import { z } from "zod";

export const getUnlockSchema = (t: (key: string) => string) =>
  z.object({
    password: z
      .string()
      .min(1, t("passwordRequired")),
  });

export type UnlockFormValues = z.infer<
  ReturnType<typeof getUnlockSchema>
>;
