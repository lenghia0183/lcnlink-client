import { ResponseCodeEnum } from "@/constants/reponse-code";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { cookies: cookiesToSet } = await req.json();

    if (!cookiesToSet || !Array.isArray(cookiesToSet)) {
      return NextResponse.json(
        {
          message: "Invalid cookies data",
          statusCode: ResponseCodeEnum.BAD_REQUEST,
        },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();

    for (const { name, value, options = {} } of cookiesToSet) {
      cookieStore.set({
        name,
        value,
        httpOnly: false,
        secure: options.secure ?? process.env.NODE_ENV === "production",
        path: options.path ?? "/",
        sameSite: options.sameSite ?? "lax",
        maxAge: options.maxAge,
        expires: options.expires,
      });
    }

    return NextResponse.json(
      {
        message: "Cookies set successfully",
        statusCode: ResponseCodeEnum.SUCCESS,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error setting cookies:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        statusCode: ResponseCodeEnum.INTERNAL_SERVER_ERROR,
      },
      { status: 500 }
    );
  }
}
