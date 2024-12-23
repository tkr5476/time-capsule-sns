import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useAuth = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("ログインに失敗しました");
        return false;
      }

      router.push("/posts");
      return true;
    } catch (e) {
      setError("予期せぬエラーが発生しました");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut({ redirect: false });
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user: session?.user,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading" || isLoading,
    error,
    login,
    logout,
  };
};
