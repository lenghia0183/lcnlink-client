import { isServer } from "./env";

export const getServerCookies = async (name: string) => {
  if (!isServer) return undefined;
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
};
