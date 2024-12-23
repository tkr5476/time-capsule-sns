import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/useAuth";
import api from "@/lib/axios";
import { AuthFormType, LoginFormData, RegisterFormData } from "@/types/auth";

export const useAuthForm = (type: AuthFormType) => {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<LoginFormData | RegisterFormData>(
    () => {
      return type === "login"
        ? { email: "", password: "" }
        : { name: "", email: "", password: "", password_confirmation: "" };
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (type === "register") {
        const registerData = formData as RegisterFormData;

        // パスワード確認
        if (registerData.password !== registerData.password_confirmation) {
          throw new Error("パスワードが一致しません");
        }

        // 新規登録APIを呼び出し
        await api.post("/auth/register", {
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
          password_confirmation: registerData.password_confirmation,
        });
      }

      // ログイン処理（新規登録後も同じ処理を使用）
      const loginSuccess = await login(formData.email, formData.password);
      if (loginSuccess) {
        router.push("/posts");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          `${
            type === "login" ? "ログイン" : "アカウントの作成"
          }に失敗しました。もう一度お試しください。`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    error,
    handleChange,
    handleSubmit,
  };
};
