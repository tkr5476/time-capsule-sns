import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // 認証済みユーザーがログインページにアクセスした場合はリダイレクト
    if (
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")
    ) {
      if (req.nextauth.token) {
        return NextResponse.redirect(new URL("/posts", req.url));
      }
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      // 保護されたルートへの未認証アクセスをチェック
      authorized: ({ token, req }) => {
        if (
          req.nextUrl.pathname.startsWith("/posts") ||
          req.nextUrl.pathname.startsWith("/profile")
        ) {
          return !!token;
        }
        return true;
      },
    },
  }
);

// ミドルウェアを適用するパスを指定
export const config = {
  matcher: ["/posts/:path*", "/profile/:path*", "/login", "/register"],
};
