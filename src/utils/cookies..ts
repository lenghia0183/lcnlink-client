import { isServer } from "./env";

export const getServerCookies = async (name: string) => {
  if (!isServer) return undefined;
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
};

export function getCookieMaxAge(duration: string): number {
  const unit = duration.slice(-1);
  const value = parseInt(duration.slice(0, -1));

  switch (unit) {
    case "s":
      return value;
    case "m":
      return value * 60;
    case "h":
      return value * 60 * 60;
    case "d":
      return value * 24 * 60 * 60;
    default:
      throw new Error(`Invalid unit: ${unit}. Use s, m, h or d`);
  }
}
