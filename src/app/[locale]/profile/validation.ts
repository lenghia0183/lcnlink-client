
import { z } from "zod";
import { USER_GENDER_ENUM } from "@/constants/common";

export const getProfileSchema = (t: (key: string) => string) =>
  z.object({
    fullname: z
      .string()
      .min(1, t("fullnameRequired"))
      .min(2, t("fullnameMinLength")),
    email: z
      .string()
      .min(1, t("emailRequired"))
      .email(t("emailInvalid")),
    phone: z
      .string()
      .min(1, t("phoneRequired"))
      .regex(/^[+]?[0-9\s-()]+$/, t("phoneInvalid")),
    gender: z.enum([
      USER_GENDER_ENUM.MALE.toString(),
      USER_GENDER_ENUM.FEMALE.toString(), 
      USER_GENDER_ENUM.OTHER.toString(),
    ]),
    dateOfBirth: z.date({
      required_error: t("dateOfBirthRequired"),
    }),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
    twoFactorCode: z.string().optional(),
  }).refine(
    (data) => {
      if (data.newPassword && !data.currentPassword) return false;
      if (data.newPassword && data.newPassword.length < 6) return false;
      if (data.newPassword && data.newPassword !== data.confirmPassword) return false;
      return true;
    },
    {
      message: t("passwordValidationError"),
      path: ["confirmPassword"],
    }
  );

export type ProfileFormValues = z.infer<ReturnType<typeof getProfileSchema>>;
