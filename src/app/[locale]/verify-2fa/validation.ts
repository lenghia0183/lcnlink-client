
import { z } from "zod";

export const getVerify2FASchema = (t: (key: string) => string) =>
  z.object({
    code: z
      .string()
      .min(1, t("verify2FA.codeRequired"))
      .length(6, t("verify2FA.codeLength"))
      .regex(/^\d{6}$/, t("verify2FA.codeFormat")),
  });

export type Verify2FAFormValues = z.infer<ReturnType<typeof getVerify2FASchema>>;
