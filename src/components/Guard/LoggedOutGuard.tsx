"use client";

import { ReactNode } from "react";
import { useUser } from "@/context/userProvider";

interface LoggedOutGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  loading?: ReactNode;
}

export default function LoggedOutGuard({
  children,
  fallback,
  loading,
}: LoggedOutGuardProps) {
  const { isLoggedIn, isLoading } = useUser();

  if (isLoading) {
    return <>{loading ?? null}</>;
  }

  if (isLoggedIn) {
    return <>{fallback ?? null}</>;
  }

  return <>{children}</>;
}
