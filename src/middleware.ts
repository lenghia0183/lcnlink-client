import createMiddleware from "next-intl/middleware";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { defaultLocale, LocalesArray } from "./config/locales";
import { NextRequest, NextResponse } from "next/server";
import { protectedRoutes } from "./config/path";
import { PATH } from "./constants/path";
import { ERROR } from "./constants/common";

export function getPreferredLocale(request: Request): string {
  const negotiator = new Negotiator({
    headers: {
      "accept-language": request.headers.get("accept-language") || "",
    },
  });
  const languages = negotiator.languages();

  return match(languages, LocalesArray, defaultLocale);
}

const i18nMiddleware = createMiddleware({
  locales: LocalesArray,
  defaultLocale: defaultLocale,
  localePrefix: "always",
});

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // Check authentication for protected routes
  if (
    protectedRoutes.some((route) => pathname.includes(route)) &&
    !accessToken &&
    !refreshToken
  ) {
    const locale = getPreferredLocale(request);
    const loginUrl = new URL(`/${locale}${PATH.LOGIN}`, request.nextUrl.origin);
    loginUrl.searchParams.set("error", ERROR.UNAUTHENTICATED);
    return NextResponse.redirect(loginUrl);
  }

  return i18nMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
