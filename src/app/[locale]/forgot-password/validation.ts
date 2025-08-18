
import { z } from "zod";

export const getForgotPasswordSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .min(1, t("forgotPassword.emailRequired"))
      .email(t("forgotPassword.emailInvalid")),
  });

export type ForgotPasswordFormValues = z.infer<
  ReturnType<typeof getForgotPasswordSchema>
>;
