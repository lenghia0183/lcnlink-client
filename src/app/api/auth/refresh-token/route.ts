import { ResponseCodeEnum } from "@/constants/reponse-code";
import { api } from "@/services/axios";
import { RefreshTokenResponse } from "@/types/auth";
import validateResponseCode from "@/utils/validateResponseCode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    console.log("cookieStore", cookieStore);
    const refreshToken = cookieStore.get("refreshToken")?.value;

    console.log("refreshToken", refreshToken);
    if (!refreshToken) {
      return NextResponse.json(
        {
          message: "Missing refresh token",
          statusCode: ResponseCodeEnum.UNAUTHORIZED,
        },
        { status: 401 }
      );
    }

    // gọi API backend để refresh
    const refreshResponse = await api.post<RefreshTokenResponse>(
      "v1/auth/refresh-token",
      {
        refreshToken,
      }
    );

    console.log("refreshResponse", refreshResponse);
    if (validateResponseCode(refreshResponse.statusCode)) {
      cookieStore.set({
        name: "accessToken",
        value: refreshResponse?.data?.accessToken || "",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      });
    } else {
      //   cookieStore.set({
      //     name: "accessToken",
      //     value: "",
      //     httpOnly: false,
      //     secure: process.env.NODE_ENV === "production",
      //     path: "/",
      //     sameSite: "lax",
      //   });
      //   cookieStore.set({
      //     name: "refreshToken",
      //     value: "",
      //     httpOnly: false,
      //     secure: process.env.NODE_ENV === "production",
      //     path: "/",
      //     sameSite: "lax",
      //   });
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
