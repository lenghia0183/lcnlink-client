import { z } from "zod";

export const getRegisterSchema = (t: (key: string) => string) =>
  z
    .object({
      fullname: z
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
      phone: z
        .string()
        .min(9, t("register.phoneInvalid"))
        .max(16, t("register.phoneInvalid"))
        .regex(/^\+?\d{9,15}$/, t("register.phoneInvalid")),
      gender: z.number(t("register.genderInvalid")),
      dateOfBirth: z.date(),
      agreeTerms: z.array(z.string()).nonempty({
        message: t("register.agreeTermsInvalid"),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("register.passwordsNotMatch"),
      path: ["confirmPassword"],
    });

export type RegisterFormValues = z.infer<ReturnType<typeof getRegisterSchema>>;
