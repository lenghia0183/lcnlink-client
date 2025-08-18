
import { z } from "zod";

export const getResetPasswordSchema = (t: (key: string) => string) =>
  z.object({
    password: z
      .string()
      .min(6, t("resetPassword.passwordMin"))
      .max(100, t("resetPassword.passwordMax")),
    confirmPassword: z
      .string()
      .min(6, t("resetPassword.confirmPasswordMin"))
      .max(100, t("resetPassword.confirmPasswordMax")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: t("resetPassword.passwordsNotMatch"),
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<
  ReturnType<typeof getResetPasswordSchema>
>;
