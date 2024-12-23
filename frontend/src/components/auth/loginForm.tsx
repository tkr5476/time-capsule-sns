"use client";

import { useAuthForm } from "@/hooks/form/useAuthForm";
import { Input } from "@/components/ui/topInput";
import { Button } from "@/components/ui/topButton";
import { Label } from "@/components/ui/topLabel";
import Link from "next/link";
import { LoginFormData } from "@/types/auth";

export function LoginForm() {
  const { formData, isLoading, error, handleChange, handleSubmit } =
    useAuthForm("login");

  const loginData = formData as LoginFormData;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded">
          {error}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">メールアドレス</Label>
        <Input
          id="email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          placeholder="name@example.com"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          disabled={isLoading}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">パスワード</Label>
        <Input
          id="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          type="password"
          disabled={isLoading}
          required
        />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "ログイン中..." : "ログイン"}
      </Button>
      <div className="text-center text-sm">
        <span className="text-gray-600">アカウントをお持ちでない方は</span>{" "}
        <Link
          href="/register"
          className="text-cyan-600 hover:text-cyan-700 hover:underline"
        >
          新規登録
        </Link>
      </div>
    </form>
  );
}
