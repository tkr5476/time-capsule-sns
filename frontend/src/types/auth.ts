// 基本の認証フォーム型
export interface AuthFormBase {
  email: string;
  password: string;
}

// ログインフォーム型
export interface LoginFormData extends AuthFormBase {}

// 登録フォーム型
export interface RegisterFormData extends AuthFormBase {
  name: string;
  password_confirmation: string;
}

// フォームタイプの定義
export type AuthFormType = "login" | "register";

// APIレスポンスの型
export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
  message: string;
}
