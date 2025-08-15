import { z } from "zod";

export const getRegisterSchema = (t: (key: string) => string) =>
  z
    .object({
      name: z
        .string()
        .min(2, t("register.nameMin"))
        .max(50, t("register.nameMax")),
      email: z
        .string()
        .email(t("register.emailInvalid"))
        .min(1, t("register.emailRequired")),
      password: z
        .string()
        .min(6, t("register.passwordMin"))
        .max(100, t("register.passwordMax")),
      confirmPassword: z
        .string()
        .min(6, t("register.confirmPasswordMin"))
        .max(100, t("register.confirmPasswordMax")),
      agreeTerms: z.array(z.boolean()).refine((val) => val.includes(true), {
        message: t("register.agreeTerms"),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("register.passwordsNotMatch"),
      path: ["confirmPassword"],
    });

// Keep the type export by inferring from the schema returned with a dummy t
export type RegisterFormValues = z.infer<ReturnType<typeof getRegisterSchema>>;
