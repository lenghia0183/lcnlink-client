import { getCookieMaxAge } from "./cookies.";
import { nextApi } from "@/services/axios";
import validateResponseCode from "./validateResponseCode";

// Types for cookie configuration
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface RememberMeData {
  email: string;
  password: string;
  remember: boolean;
}

export interface CookieConfig {
  name: string;
  value: string;
  options: {
    httpOnly: boolean;
    path: string;
    maxAge: number;
  };
}

// Constants for cookie names
export const COOKIE_NAMES = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  REMEMBER: "remember",
  SAVED_EMAIL: "savedEmail",
  SAVED_PASSWORD: "savedPassword",
} as const;

// Environment variables for token expiration
const getTokenExpiration = () => ({
  accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRE || "15m",
  refreshToken: process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRE || "7d",
});

/**
 * Creates authentication token cookies
 */
export const createAuthTokenCookies = (tokens: AuthTokens): CookieConfig[] => {
  const expiration = getTokenExpiration();

  return [
    {
      name: COOKIE_NAMES.ACCESS_TOKEN,
      value: tokens.accessToken,
      options: {
        httpOnly: false,
        path: "/",
        maxAge: getCookieMaxAge(expiration.accessToken),
      },
    },
    {
      name: COOKIE_NAMES.REFRESH_TOKEN,
      value: tokens.refreshToken,
      options: {
        httpOnly: false,
        path: "/",
        maxAge: getCookieMaxAge(expiration.refreshToken),
      },
    },
  ];
};

/**
 * Creates remember me cookies
 */
export const createRememberMeCookies = (
  data: RememberMeData
): CookieConfig[] => {
  if (!data.remember) {
    // Clear remember me cookies
    return [
      {
        name: COOKIE_NAMES.REMEMBER,
        value: "",
        options: { httpOnly: false, maxAge: 0, path: "/" },
      },
      {
        name: COOKIE_NAMES.SAVED_EMAIL,
        value: "",
        options: { httpOnly: false, maxAge: 0, path: "/" },
      },
      {
        name: COOKIE_NAMES.SAVED_PASSWORD,
        value: "",
        options: { httpOnly: false, maxAge: 0, path: "/" },
      },
    ];
  }

  // Save remember me data
  return [
    {
      name: COOKIE_NAMES.REMEMBER,
      value: "true",
      options: { httpOnly: false, path: "/", maxAge: getCookieMaxAge("30d") },
    },
    {
      name: COOKIE_NAMES.SAVED_EMAIL,
      value: data.email,
      options: { httpOnly: false, path: "/", maxAge: getCookieMaxAge("30d") },
    },
    {
      name: COOKIE_NAMES.SAVED_PASSWORD,
      value: data.password,
      options: { httpOnly: false, path: "/", maxAge: getCookieMaxAge("30d") },
    },
  ];
};

/**
 * Creates all authentication cookies (tokens + remember me)
 */
export const createAllAuthCookies = (
  tokens: AuthTokens,
  rememberMeData?: RememberMeData
): CookieConfig[] => {
  const authCookies = createAuthTokenCookies(tokens);

  if (rememberMeData) {
    const rememberCookies = createRememberMeCookies(rememberMeData);
    return [...authCookies, ...rememberCookies];
  }

  return authCookies;
};

/**
 * Sets authentication cookies on the server
 */
export const setAuthCookies = async (
  cookies: CookieConfig[]
): Promise<boolean> => {
  try {
    const response = await nextApi.post("/auth/set-cookie", { cookies });
    return validateResponseCode(response.statusCode);
  } catch (error) {
    console.error("Failed to set auth cookies:", error);
    return false;
  }
};

/**
 * Handles successful authentication response
 */
export const handleAuthSuccess = async (
  tokens: AuthTokens,
  rememberMeData?: RememberMeData
): Promise<boolean> => {
  const cookies = createAllAuthCookies(tokens, rememberMeData);
  return await setAuthCookies(cookies);
};
