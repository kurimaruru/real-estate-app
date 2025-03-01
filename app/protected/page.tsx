"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>ロード中...</div>;
  }

  return (
    <div>
      <h1>保護されたページ</h1>
      <p>ようこそ、{session?.user?.name}さん！</p>
      <p>このページは認証されたユーザーのみが閲覧できます。</p>
    </div>
  );
}
