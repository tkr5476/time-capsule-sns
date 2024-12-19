"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/topButton";
import { Input } from "@/components/ui/topInput";
import { Label } from "@/components/ui/topLabel";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    // Add your login logic here
    setTimeout(() => {
      setIsLoading(false);
      router.push("/posts");
    }, 1000);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">メールアドレス</Label>
        <Input
          id="email"
          placeholder="example@example.com"
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