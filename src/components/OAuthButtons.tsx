"use client";

import { useTranslations } from "next-intl";
import { AppButton } from "./AppButton";
import { toast } from "./AppToast";
import { use, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { getCookieMaxAge } from "@/utils/cookies.";
import { nextApi } from "@/services/axios";
import validateResponseCode from "@/utils/validateResponseCode";

interface OAuthButtonsProps {
  mode?: "login" | "register";
  className?: string;
}

export function OAuthButtons({
  mode = "login",
  className = "",
}: OAuthButtonsProps) {
  const t = useTranslations("Auth");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const setTokens = async () => {
      const accessToken = searchParams.get("access_token");
      const refreshToken = searchParams.get("refresh_token");
      const isEnable2FA = searchParams.get("isEnable2FA") === "true";
      console.log("accessToken", accessToken, "refreshToken", refreshToken);

      if (accessToken && refreshToken) {
        const cookiesToSet = [
          {
            name: "accessToken",
            value: accessToken,
            options: {
              httpOnly: false,
              path: "/",
              maxAge: getCookieMaxAge(
                process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRE || "3600"
              ),
            },
          },
          {
            name: "refreshToken",
            value: refreshToken,
            options: {
              httpOnly: false,
              path: "/",
              maxAge: getCookieMaxAge(
                process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRE || "604800"
              ),
            },
          },
        ];

        await nextApi.post("/auth/set-cookie", { cookies: cookiesToSet });

        router.replace("/dashboard");
      }
    };

    setTokens();
  }, [searchParams, router]);

  const handleGoogleAuth = async () => {
    const backendUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
    window.location.href = `${backendUrl}/api/v1/auth/google`;
  };

  const handleFacebookAuth = async () => {
    try {
      toast.info(t("oauth.facebookComingSoon"));
    } catch (error) {
      console.error("Facebook OAuth error:", error);
      toast.error(t("oauth.error"));
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            {t("oauth.orContinueWith")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <AppButton
          variant="outline"
          onClick={handleGoogleAuth}
          className=""
          iconLeft={
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          }
        >
          Google
        </AppButton>

        <AppButton
          variant="outline"
          onClick={handleFacebookAuth}
          className=""
          iconLeft={
            <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          }
        >
          Facebook
        </AppButton>
      </div>

      <p className="text-xs text-center text-gray-500 dark:text-gray-400">
        {mode === "login" ? t("oauth.loginTerms") : t("oauth.registerTerms")}
      </p>
    </div>
  );
}
