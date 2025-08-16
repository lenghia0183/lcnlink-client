"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Mail, Lock, Eye, EyeOff, Link2 } from "lucide-react";
import { AppCard } from "@/components/AppCard";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/components/FormFields/TextField";
import { CheckboxGroupField } from "@/components/FormFields/CheckboxGroupField";
import { AppButton } from "@/components/AppButton";
import { getAuthSchema, AuthFormValues } from "./validation";

import { toast } from "@/components/AppToast";
import validateResponseCode from "@/utils/validateResponseCode";
import { nextApi } from "@/services/axios";
import { getCookie } from "cookies-next";
import { useUser } from "@/context/userProvider";
import { useRouter } from "@/i18n/routing";
import { PATH } from "@/constants/path";
import { useLogin } from "@/services/api/auth";
import { getCookieMaxAge } from "@/utils/cookies.";

type FormValues = AuthFormValues;

export default function LoginPage() {
  const t = useTranslations("Auth");
  const tCommon = useTranslations("Common");
  const schema = getAuthSchema(t);
  const router = useRouter();

  const { loginUser } = useUser();

  const { isMutating, trigger } = useLogin();

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      remember: [],
    },
  });

  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleShowPassword = () => setIsShowPassword((v) => !v);

  const onSubmit = async (data: FormValues) => {
    trigger(
      {
        email: data.email,
        password: data.password || "",
      },
      {
        onSuccess: async (response) => {
          if (validateResponseCode(response.statusCode)) {
            // always set access/refresh tokens
            const cookiesToSet: unknown[] = [
              {
                name: "accessToken",
                value: response.data?.accessToken ?? "",
                options: {
                  httpOnly: false,
                  path: "/",
                  maxAge: getCookieMaxAge(
                    process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRE || ""
                  ),
                },
              },
              {
                name: "refreshToken",
                value: response.data?.refreshToken ?? "",
                options: {
                  httpOnly: false,
                  path: "/",
                  maxAge: getCookieMaxAge(
                    process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRE || ""
                  ),
                },
              },
            ];

            // handle remember me
            const remember = data.remember[0] == "true";
            if (remember) {
              // save email/password and remember flag in cookies (client-side)
              cookiesToSet.push(
                {
                  name: "remember",
                  value: "true",
                  options: { path: "/", maxAge: getCookieMaxAge("30d") },
                },
                {
                  name: "savedEmail",
                  value: data.email,
                  options: { path: "/", maxAge: getCookieMaxAge("30d") },
                },
                {
                  name: "savedPassword",
                  value: data.password,
                  options: { path: "/", maxAge: getCookieMaxAge("30d") },
                }
              );
            } else {
              // clear saved credentials
              cookiesToSet.push(
                {
                  name: "remember",
                  value: "",
                  options: { maxAge: 0, path: "/" },
                },
                {
                  name: "savedEmail",
                  value: "",
                  options: { maxAge: 0, path: "/" },
                },
                {
                  name: "savedPassword",
                  value: "",
                  options: { maxAge: 0, path: "/" },
                }
              );
            }

            const res = await nextApi.post("/auth/set-cookie", {
              cookies: cookiesToSet,
            });

            if (validateResponseCode(res.statusCode)) {
              toast.success(response.message);
              loginUser(response.data);
              router.push(PATH.HOME);
            }
          } else {
            toast.error(response.message);
          }
        },
        onError: (response) => {
          toast.error(response.message);
        },
      }
    );
  };

  // on mount, prefill email/password if remember cookie is true
  useEffect(() => {
    try {
      const remember = getCookie("remember") as string | undefined;
      if (remember === "true") {
        const savedEmail = getCookie("savedEmail") as string | undefined;
        const savedPassword = getCookie("savedPassword") as string | undefined;
        methods.reset({
          email: savedEmail || "",
          password: savedPassword || "",
          remember: ["true"],
        });
      }
    } catch {
      // ignore
    }
  }, [methods]);

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
            {t("login.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {t("login.subtitle")}
          </p>
        </div>

        <AppCard
          className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
          title={t("login.welcomeBack")}
          description={t("login.description")}
        >
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              noValidate
              className="space-y-4"
            >
              <TextField
                name="email"
                label={t("login.email")}
                placeholder={t("login.emailPlaceholder")}
                leftIcon={<Mail className="w-4 h-4" />}
              />

              <TextField
                name="password"
                label={t("login.password")}
                type={isShowPassword ? "text" : "password"}
                placeholder={t("login.passwordPlaceholder")}
                leftIcon={<Lock className="h-4 w-4 text-gray-400" />}
                rightIcon={
                  isShowPassword ? (
                    <EyeOff className="h-4 w-4 " />
                  ) : (
                    <Eye className="h-4 w-4 " />
                  )
                }
                rightIconOnClick={handleShowPassword}
              />

              <div className="flex items-center justify-between">
                <CheckboxGroupField
                  name="remember"
                  options={[
                    {
                      id: "true",
                      label: t("login.rememberMe"),
                    },
                  ]}
                />

                <AppButton
                  href="/forgot-password"
                  variant="link"
                  className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
                >
                  {t("login.forgotPassword")}
                </AppButton>
              </div>

              <AppButton
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                disabled={isMutating}
              >
                {isMutating ? tCommon("loading") : t("login.signIn")}
              </AppButton>
            </form>
          </FormProvider>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t("login.noAccount")}
              <AppButton
                href="/register"
                variant="link"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
              >
                {t("login.signUp")}
              </AppButton>
            </p>
          </div>
        </AppCard>
      </div>
    </div>
  );
}
