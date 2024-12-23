"use client";

import { useAuthForm } from "@/hooks/form/useAuthForm";
import { useAuth } from "@/hooks/auth/useAuth";
import { Input } from "@/components/ui/topInput";
import { Button } from "@/components/ui/topButton";
import { Label } from "@/components/ui/topLabel";
import Link from "next/link";

export function LoginForm() {
  const { isLoading, error } = useAuth();
  const { formData, handleChange, handleSubmit } = useAuthForm();

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
          value={formData.email}
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
          value={formData.password}
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
