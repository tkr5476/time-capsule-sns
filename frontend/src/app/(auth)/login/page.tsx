import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        ログイン
      </h2>
      <LoginForm />
    </div>
  );
}
