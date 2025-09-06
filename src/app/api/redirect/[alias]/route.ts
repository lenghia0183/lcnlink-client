
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { alias: string } }
) {
  const { alias } = params;

  try {
    // Call your backend API to get the original URL
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/links/${alias}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // If link not found, redirect to not-found page
      return NextResponse.redirect(new URL("/not-found", request.url));
    }

    const data = await response.json();
    
    if (data?.originalUrl) {
      // Redirect to original URL
      return NextResponse.redirect(data.originalUrl);
    } else {
      // If no original URL, redirect to not-found
      return NextResponse.redirect(new URL("/not-found", request.url));
    }
  } catch (error) {
    console.error("Redirect error:", error);
    return NextResponse.redirect(new URL("/not-found", request.url));
  }
}
