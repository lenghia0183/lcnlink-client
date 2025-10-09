import { ResponseCodeEnum } from "@/constants/reponse-code";
import { apiNoToken } from "@/services/axios";
import { RefreshTokenResponse } from "@/types/auth";
import validateResponseCode from "@/utils/validateResponseCode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getCookieMaxAge } from "@/utils/cookies.";

export async function POST() {
  try {
    const cookieStore = await cookies();

    const refreshToken = cookieStore.get("refreshToken")?.value;
    if (!refreshToken) {
      return NextResponse.json(
        {
          message: "Missing refresh token",
          statusCode: ResponseCodeEnum.UNAUTHORIZED,
        },
        { status: 401 }
      );
    }

    const refreshResponse = await apiNoToken.post<RefreshTokenResponse>(
      "v1/auth/refresh-token",
      {
        refreshToken,
      }
    );

    if (validateResponseCode(refreshResponse.statusCode)) {
      cookieStore.set({
        name: "accessToken",
        value: refreshResponse?.data?.accessToken || "",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
        maxAge: getCookieMaxAge(
          process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRE || "15m"
        ),
      });
    } else {
      cookieStore.set({
        name: "accessToken",
        value: "",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      });
      cookieStore.set({
        name: "refreshToken",
        value: "",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      });
    }

    return NextResponse.json(
      { message: "Refresh Token", statusCode: ResponseCodeEnum.SUCCESS },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        statusCode: ResponseCodeEnum.INTERNAL_SERVER_ERROR,
      },
      { status: 500 }
    );
  }
}
