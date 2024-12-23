import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "@/lib/axios";
import { User } from "next-auth";

export const authOptions: NextAuthOptions = {
  // 1. 認証プロバイダーの設定
  providers: [
    CredentialsProvider({
      // 認証情報の定義
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // 認証ロジック
      async authorize(credentials) {
        try {
          // LaravelのAPIエンドポイントにリクエスト
          const response = await api.post("/auth/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          // レスポンスからユーザー情報を取得
          const user = response.data.user;
          if (user) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              accessToken: response.data.token, // Sanctumのトークンを保存
            };
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  // 2. コールバックの設定
  callbacks: {
    // JWTトークンの処理
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    // セッション情報の処理
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub as string;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },

  // 3. カスタムページの設定
  pages: {
    signIn: "/login", // カスタムログインページのパス
  },

  // 4. セッション設定
  session: {
    strategy: "jwt", // JWTベースの認証を使用
  },
};
