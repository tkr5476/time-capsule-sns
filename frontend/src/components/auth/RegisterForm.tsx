"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/Components/ui/Top/topButton";
import { Input } from "@/Components/ui/Top/topInput";
import { Label } from "@/Components/ui/Top/topLabel";

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    // Add your registration logic here
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1000);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="username">ユーザーネーム</Label>
        <Input
          id="username"
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
        <Input id="password" type="password" disabled={isLoading} required />
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
