import "next-auth";

declare module "next-auth" {
  /**
   * セッションに含まれる情報の型定義を拡張
   */
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
    };
    accessToken?: string; // Sanctumのアクセストークン
  }

  /**
   * ユーザー情報の型定義を拡張
   */
  interface User {
    id: string;
    name: string;
    email: string;
    accessToken?: string;
  }
}

/**
 * JWT（トークン）に含まれる情報の型定義を拡張
 */
declare module "next-auth/jwt" {
  interface JWT {
    sub?: string;
    accessToken?: string;
  }
}
