import { ResponseCodeEnum } from "@/constants/reponse-code";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const response = await req.json();
    const cookieStore = await cookies();
    cookieStore.set({
      name: "accessToken",
      value: response.accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    cookieStore.set({
      name: "refreshToken",
      value: response.refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return NextResponse.json(
      { message: "Token set", statusCode: ResponseCodeEnum.SUCCESS },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
