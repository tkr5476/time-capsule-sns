export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-sky-100">
            <div className="container flex items-center justify-center min-h-screen py-12 mx-auto">
                <div className="w-full max-w-md">
                    <div className="flex flex-col items-center mb-8">
                        <h1 className="text-3xl font-bold text-cyan-700">
                            Time Capsule SNS
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">未来へのメッセージ</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
