"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    if (result?.error) {
      setError("ログインに失敗しました");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">ログイン</h2>
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div>
        <input
          type="email"
          name="email"
          placeholder="メールアドレス"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="パスワード"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        ログイン
      </button>
      <div className="text-center mt-4">
        <Link href="/register" className="text-blue-500 hover:text-blue-600">
          アカウントをお持ちでない方はこちら
        </Link>
      </div>
    </form>
  );
}