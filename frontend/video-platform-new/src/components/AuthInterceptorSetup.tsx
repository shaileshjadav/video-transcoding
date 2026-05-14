"use client";

import { useAuth } from "@clerk/nextjs";
import { setAuthTokenGetter } from "@/lib/axios";

export function AuthInterceptorSetup() {
  const { getToken } = useAuth();
  setAuthTokenGetter(getToken);
  return null;
}
