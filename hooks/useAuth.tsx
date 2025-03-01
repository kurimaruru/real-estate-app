"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuth({ required = false } = {}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    if (!isLoading && required && !isAuthenticated) {
      router.push("/auth/signin");
    }
  }, [isLoading, required, isAuthenticated, router]);

  return {
    session,
    isLoading,
    isAuthenticated,
  };
}
