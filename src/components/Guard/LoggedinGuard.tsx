"use client";

import { ReactNode } from "react";
import { useUser } from "@/context/userProvider";

interface LoggedInGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  loading?: ReactNode;
}

export default function LoggedInGuard({
  children,
  fallback,
}: LoggedInGuardProps) {
  const { isLoggedIn } = useUser();

  if (!isLoggedIn) {
    return <>{fallback ?? null}</>;
  }

  return <>{children}</>;
}
