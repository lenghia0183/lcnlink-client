import { z } from "zod";
import { USER_GENDER_ENUM } from "@/constants/common";

export const getProfileFormSchema = (t: (key: string) => string) =>
  z.object({
    fullname: z
      .string()
      .min(1, t("fullnameRequired"))
      .min(2, t("fullnameMinLength")),
    email: z.string().min(1, t("emailRequired")).email(t("emailInvalid")),
    phone: z
      .string()
      .min(1, t("phoneRequired"))
      .regex(/^[+]?[0-9\s-()]+$/, t("phoneInvalid")),
    gender: z.string(t("register.genderInvalid")),
    dateOfBirth: z.date(t("dateOfBirthRequired")),
  });

export const getPasswordFormSchema = (t: (key: string) => string) =>
  z
    .object({
      currentPassword: z.string().min(1, t("currentPasswordRequired")),
      newPassword: z.string().min(6, t("passwordMinLength")),
      confirmPassword: z.string().min(1, t("confirmPasswordRequired")),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t("passwordValidationError"),
      path: ["confirmPassword"],
    });

export const getTwoFAFormSchema = (t: (key: string) => string) =>
  z.object({
    twoFactorCode: z
      .string()
      .min(6, t("twoFactorCodeInvalid"))
      .max(6, t("twoFactorCodeInvalid")),
  });

export type ProfileFormValues = z.infer<
  ReturnType<typeof getProfileFormSchema>
>;
export type ChangePasswordFormValues = z.infer<
  ReturnType<typeof getPasswordFormSchema>
>;
export type TwoFAFormValues = z.infer<ReturnType<typeof getTwoFAFormSchema>>;
