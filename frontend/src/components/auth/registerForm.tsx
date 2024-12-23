"use client";

import { useAuthForm } from "@/hooks/form/useAuthForm";
import { Input } from "@/components/ui/topInput";
import { Button } from "@/components/ui/topButton";
import { Label } from "@/components/ui/topLabel";
import Link from "next/link";
import { RegisterFormData } from "@/types/auth";

export function RegisterForm() {
  const { formData, isLoading, error, handleChange, handleSubmit } =
    useAuthForm("register");

  const registerData = formData as RegisterFormData;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded">
          {error}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="name">ユーザーネーム</Label>
        <Input
          id="name"
          name="name"
          value={registerData.name}
          onChange={handleChange}
          placeholder="username"
          type="text"
          autoCapitalize="none"
          autoCorrect="off"
          disabled={isLoading}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">メールアドレス</Label>
        <Input
          id="email"
          name="email"
          value={registerData.email}
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
          value={registerData.password}
          onChange={handleChange}
          type="password"
          disabled={isLoading}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password_confirmation">パスワード（確認）</Label>
        <Input
          id="password_confirmation"
          name="password_confirmation"
          value={registerData.password_confirmation}
          onChange={handleChange}
          type="password"
          disabled={isLoading}
          required
        />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "登録中..." : "アカウント作成"}
      </Button>
      <div className="text-center text-sm">
        <span className="text-gray-600">すでにアカウントをお持ちの方は</span>{" "}
        <Link
          href="/login"
          className="text-cyan-600 hover:text-cyan-700 hover:underline"
        >
          ログイン
        </Link>
      </div>
    </form>
  );
}
