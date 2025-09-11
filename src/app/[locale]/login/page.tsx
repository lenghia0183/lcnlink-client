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
import { OAuthButtons } from "@/components/OAuthButtons";
import { getAuthSchema, AuthFormValues } from "./validation";

import { toast } from "@/components/AppToast";
import validateResponseCode from "@/utils/validateResponseCode";
import { nextApi } from "@/services/axios";
import { getCookie } from "cookies-next";
import { useUser } from "@/context/userProvider";
import { useRouter } from "@/i18n/routing";
import { PATH } from "@/constants/path";
import { useLogin, useResendEmailVerification } from "@/services/api/auth";
import { getCookieMaxAge } from "@/utils/cookies.";
import { useSearchParams } from "next/navigation";
import { AUTH_FLOW } from "@/constants/common";
import { ErrorCodeEnum } from "@/constants/reponse-code";

type FormValues = AuthFormValues;

export default function LoginPage() {
  const t = useTranslations("Auth");
  const tEmailVerify = useTranslations("EmailVerification");
  const tCommon = useTranslations("Common");
  const schema = getAuthSchema(t);
  const router = useRouter();
  const searchParams = useSearchParams();

  const flow = searchParams.get("flow");
  const success = searchParams.get("success");
  const message = searchParams.get("message");

  const { loginUser } = useUser();

  const { isMutating, trigger } = useLogin();
  const { isMutating: isResendingEmail, trigger: resendEmailTrigger } =
    useResendEmailVerification();

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      remember: [],
    },
  });

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [emailNotVerifiedToastId, setEmailNotVerifiedToastId] = useState<
    number | string | null
  >(null);
  const handleShowPassword = () => setIsShowPassword((v) => !v);

  const handleResendEmail = async (email: string) => {
    resendEmailTrigger(
      { email },
      {
        onSuccess: (response) => {
          if (validateResponseCode(response.statusCode)) {
            // Dismiss the email not verified toast
            if (emailNotVerifiedToastId) {
              toast.dismiss(emailNotVerifiedToastId);
              setEmailNotVerifiedToastId(null);
            }
            toast.success(tEmailVerify("resendSuccess"));
          } else {
            toast.error(response.message || tEmailVerify("resendError"));
          }
        },
        onError: (response) => {
          toast.error(response.message || tEmailVerify("resendError"));
        },
      }
    );
  };

  const onSubmit = async (data: FormValues) => {
    // Clear any existing email not verified toast
    if (emailNotVerifiedToastId) {
      toast.dismiss(emailNotVerifiedToastId);
      setEmailNotVerifiedToastId(null);
    }

    trigger(
      {
        email: data.email,
        password: data.password || "",
      },
      {
        onSuccess: async (response) => {
          console.log("response", response);
          if (validateResponseCode(response.statusCode)) {
            console.log("response", response);
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
            console.log("response", response);
            if (response?.data?.requires2FA) {
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
                router.push(
                  `${PATH.VERIFY_2FA}?token=${response.data.otpToken}`
                );
                toast.info(response.message);
              }
            } else {
              // Check if it's EMAIL_NOT_VERIFIED error
              if (response.errorCode === ErrorCodeEnum.EMAIL_NOT_VERIFIED) {
                const toastId = toast.error(
                  tEmailVerify("title"),
                  tEmailVerify("description"),
                  {
                    action: {
                      label: isResendingEmail
                        ? tEmailVerify("resending")
                        : tEmailVerify("resendEmail"),
                      onClick: () => handleResendEmail(data.email),
                    },
                    duration: 10000,
                  }
                );
                setEmailNotVerifiedToastId(toastId);
              } else {
                toast.error(response.message);
              }
            }
          }
        },
        onError: (response) => {
          // Check if it's EMAIL_NOT_VERIFIED error
          if (response.errorCode === ErrorCodeEnum.EMAIL_NOT_VERIFIED) {
            const email = methods.getValues("email");
            const toastId = toast.error(
              tEmailVerify("title"),
              tEmailVerify("description"),
              {
                action: {
                  label: isResendingEmail
                    ? tEmailVerify("resending")
                    : tEmailVerify("resendEmail"),
                  onClick: () => handleResendEmail(email),
                },
                duration: 10000, // Show longer for email verification
              }
            );
            setEmailNotVerifiedToastId(toastId);
          } else {
            toast.error(response.message);
          }
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

  useEffect(() => {
    if (flow === AUTH_FLOW.VERIFY_EMAIL && success === "true")
      toast.success(message);
  }, [flow, success, message]);

  // Cleanup toast on unmount
  useEffect(() => {
    return () => {
      if (emailNotVerifiedToastId) {
        toast.dismiss(emailNotVerifiedToastId);
      }
    };
  }, [emailNotVerifiedToastId]);

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

          <div className="mt-6">
            <OAuthButtons mode="login" />
          </div>

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
