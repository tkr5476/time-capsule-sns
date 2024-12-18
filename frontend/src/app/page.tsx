import Link from "next/link";
import { Button } from "@/components/ui/topButton";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-cyan-100 to-sky-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-cyan-700 mb-4">
          Time Capsule SNS へようこそ
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          未来へのメッセージを残しましょう
        </p>
        <div className="space-x-6">
          <Link href="/login">
            <Button className="bg-cyan-500 text-white hover:bg-cyan-600 transition-colors duration-200 px-6 py-2 rounded-full shadow-md hover:shadow-lg">
              ログイン
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-cyan-500 text-white hover:bg-cyan-600 transition-colors duration-200 px-6 py-2 rounded-full shadow-md hover:shadow-lg">
              新規登録
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};