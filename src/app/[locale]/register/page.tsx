"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Mail, Lock, Eye, EyeOff, User, Link2, Phone } from "lucide-react";
import { AppCard } from "@/components/AppCard";
import { getRegisterSchema, RegisterFormValues } from "./validation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/components/FormFields/TextField";
import { CheckboxGroupField } from "@/components/FormFields/CheckboxGroupField";
import { RadioGroupField } from "@/components/FormFields/RadioGroupField";
import { DatePickerField } from "@/components/FormFields/DatePickerField";
import { AppButton } from "@/components/AppButton";
import { OAuthButtons } from "@/components/OAuthButtons";
import { useRegister } from "@/services/api/auth";
import validateResponseCode from "@/utils/validateResponseCode";

import { useRouter } from "@/i18n/routing";
import { PATH } from "@/constants/path";
import { toast } from "@/components/AppToast";
import { USER_GENDER_ENUM } from "@/constants/common";

type FormValues = RegisterFormValues;

export default function RegisterPage() {
  const t = useTranslations("Auth");
  const tCommon = useTranslations("Common");

  const router = useRouter();

  const schema = getRegisterSchema(t);

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const { isMutating, trigger } = useRegister();

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleShowConfirmPassword = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  };

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      gender: USER_GENDER_ENUM.MALE,
      dateOfBirth: undefined,
      agreeTerms: [],
    },
  });

  const handleRegister = async (data: FormValues) => {
    trigger(
      {
        fullname: data.fullname,
        email: data.email,
        password: data.password,
        phone: data.phone,
        gender: Number(data.gender),
        dateOfBirth: data.dateOfBirth.toISOString(),
      },
      {
        onSuccess: async (response) => {
          if (validateResponseCode(response.statusCode)) {
            toast.success(response.message);
            router.push(PATH.LOGIN);
          } else {
            toast.error(response.message);
          }
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg">
                <Link2 className="h-8 w-8 text-blue-500" />
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t("register.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {t("register.subtitle")}
          </p>
        </div>

        <AppCard
          className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
          title={t("register.createAccount")}
          description={t("register.description")}
        >
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(handleRegister)}
              noValidate
              className="space-y-4"
            >
              <TextField
                name="fullname"
                label={t("register.name")}
                placeholder={t("register.namePlaceholder")}
                leftIcon={<User className="h-4 w-4 text-gray-400" />}
              />

              <TextField
                name="email"
                label={t("register.email")}
                placeholder={t("register.emailPlaceholder")}
                leftIcon={<Mail className="h-4 w-4 text-gray-400" />}
              />

              <TextField
                name="phone"
                label={t("register.phone")}
                placeholder={t("register.phonePlaceholder")}
                leftIcon={<Phone className="h-4 w-4 text-gray-400" />}
              />

              <TextField
                name="password"
                label={t("register.password")}
                type={isShowPassword ? "text" : "password"}
                placeholder={t("register.passwordPlaceholder")}
                leftIcon={<Lock className="h-4 w-4 text-gray-400" />}
                rightIcon={
                  isShowPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )
                }
                rightIconOnClick={handleShowPassword}
              />

              <TextField
                name="confirmPassword"
                label={t("register.confirmPassword")}
                type={isShowConfirmPassword ? "text" : "password"}
                placeholder={t("register.confirmPasswordPlaceholder")}
                leftIcon={<Lock className="h-4 w-4 text-gray-400" />}
                rightIcon={
                  isShowConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )
                }
                rightIconOnClick={handleShowConfirmPassword}
              />

              <RadioGroupField
                name="gender"
                label={t("register.gender")}
                options={[
                  {
                    value: USER_GENDER_ENUM.MALE,
                    label: t("register.genderMale"),
                  },
                  {
                    value: USER_GENDER_ENUM.FEMALE,
                    label: t("register.genderFemale"),
                  },
                  {
                    value: USER_GENDER_ENUM.OTHER,
                    label: t("register.genderOther"),
                  },
                ]}
                direction="row"
              />

              <DatePickerField
                name="dateOfBirth"
                label={t("register.dateOfBirth")}
                placeholder={t("register.dateOfBirthPlaceholder")}
              />

              <CheckboxGroupField
                name="agreeTerms"
                options={[
                  {
                    id: "terms",
                    label: (
                      <>
                        {t("register.agreeTerms")}
                        <AppButton
                          variant="link"
                          href="/terms"
                          className="text-blue-600 hover:text-blue-500 dark:text-blue-400 pl-1"
                        >
                          {t("register.termsAndConditions")}
                        </AppButton>
                      </>
                    ),
                  },
                ]}
              />

              <AppButton
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                disabled={isMutating}
              >
                {isMutating ? tCommon("loading") : t("register.createAccount")}
              </AppButton>
            </form>
          </FormProvider>

          <div className="mt-6">
            <OAuthButtons mode="register" />
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t("register.haveAccount")}
              <AppButton
                variant="link"
                href="/login"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
              >
                {t("register.signIn")}
              </AppButton>
            </p>
          </div>
        </AppCard>
      </div>
    </div>
  );
}
