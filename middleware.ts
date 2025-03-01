import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;

  // 保護されたルートへのアクセスを制御
  if (request.nextUrl.pathname.startsWith("/protected") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // 認証済みユーザーがログインページにアクセスした場合はホームにリダイレクト
  if (
    (request.nextUrl.pathname.startsWith("/auth/signin") ||
      request.nextUrl.pathname.startsWith("/auth/signup")) &&
    isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/protected/:path*", "/auth/signin", "/auth/signup"],
};
