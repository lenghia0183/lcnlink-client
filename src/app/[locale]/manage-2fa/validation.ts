
import { z } from "zod";

export const getManage2FASchema = (t: (key: string) => string) => {
  return z.object({
    code: z
      .string()
      .min(1, t("codeRequired"))
      .length(6, t("codeLength"))
      .regex(/^\d+$/, t("codeFormat")),
  });
};

export type Manage2FAFormValues = z.infer<ReturnType<typeof getManage2FASchema>>;
