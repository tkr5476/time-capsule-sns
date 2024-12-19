import { RegisterForm } from "@/components/auth/registerForm";
export default function Register() {
    return (
        <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                アカウント作成
            </h2>
            <RegisterForm />
        </div>
    );
}
