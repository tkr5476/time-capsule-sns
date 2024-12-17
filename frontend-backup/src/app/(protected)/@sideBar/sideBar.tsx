import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Target,
  User,
  X,
  CheckSquare,
  MessageSquare,
  Hourglass,
  ListTodo,
  LogOut,
  Calendar,
  ImageIcon,
} from "lucide-react";
import "./Sidebar.css";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postType, setPostType] = useState<"task" | "message">("message");
  const [content, setContent] = useState("");
  const [taskStatus, setTaskStatus] = useState<"pending" | "completed">(
    "pending"
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [postDate, setPostDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postType === "task") {
      console.log("New task:", { content, status: taskStatus });
    } else {
      console.log("New message:", { content, image: selectedImage, postDate });
    }
    setContent("");
    setTaskStatus("pending");
    setSelectedImage(null);
    setPostDate(new Date().toISOString().split("T")[0]);
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <div className="w-64 p-4 bg-white rounded-lg shadow-lg text-gray-800">
      <h1 className="text-4xl font-bold mb-8 p-4 rounded-lg bg-gradient-to-r from-[#72daf7] to-[#75fff4]">
        <span className="animate-gradient bg-gradient-to-r from-[#ffffff] via-[#f0f9ff] to-[#e6f7ff] bg-300% text-transparent bg-clip-text flex flex-col items-center">
          <svg
            width="64"
            height="64"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-2 animate-flip"
          >
            <path
              d="M12 4H36V12C36 18 30 20 24 24C18 28 12 30 12 36V44H36"
              stroke="#72daf7"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 12C12 18 18 20 24 24"
              stroke="#72daf7"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M36 36C36 30 30 28 24 24"
              stroke="#72daf7"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 8H30"
              stroke="#72daf7"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M18 40H30"
              stroke="#72daf7"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M24 24L30 18"
              stroke="#faa823"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-center animate-gradient bg-gradient-to-r from-[#0056b3] via-[#00a0e9] to-[#00d4ff] bg-300% text-transparent bg-clip-text font-extrabold">
            Time Capsule SNS
          </span>
        </span>
      </h1>
      <nav>
        <ul className="space-y-4">
          <SidebarItem href="/" icon={Home} text="ホーム" />
          <SidebarItem href="/goals" icon={Target} text="目標" />
          <SidebarItem href="/tasks" icon={ListTodo} text="タスク" />
          <SidebarItem href="/profile" icon={User} text="プロフィール" />
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-700 hover:text-[#72daf7] transition-colors"
            >
              <LogOut className="mr-4" size={24} />
              <span className="text-lg">ログアウト</span>
            </button>
          </li>
        </ul>
      </nav>
      <button
        className="w-full mt-8 px-4 py-2 text-lg font-semibold text-white bg-[#72daf7] rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-[#75fff4] hover:text-gray-900 hover:shadow-xl hover:scale-105"
        onClick={() => setIsModalOpen(true)}
      >
        投稿する
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl border border-[#72daf7]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#72daf7]">新規投稿</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-[#72daf7]"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handlePostSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  投稿タイプ
                </label>
                <div className="flex space-x-4 text-gray-700">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-[#72daf7]"
                      name="postType"
                      value="task"
                      checked={postType === "task"}
                      onChange={() => setPostType("task")}
                    />
                    <span className="ml-2">タスク</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-[#72daf7]"
                      name="postType"
                      value="message"
                      checked={postType === "message"}
                      onChange={() => setPostType("message")}
                    />
                    <span className="ml-2">メッセージ</span>
                  </label>
                </div>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={
                  postType === "task"
                    ? "タスクを入力してください..."
                    : "メッセージを入力してください..."
                }
                className="w-full p-2 border border-gray-300 rounded-md text-gray-700 bg-white shadow-inner"
                rows={4}
              />
              {postType === "task" && (
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    タスクの状態
                  </label>
                  <select
                    value={taskStatus}
                    onChange={(e) =>
                      setTaskStatus(e.target.value as "pending" | "completed")
                    }
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-700 bg-white shadow-inner transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#75fff4] focus:border-transparent"
                  >
                    <option value="pending">未完了</option>
                    <option value="completed">完了</option>
                  </select>
                </div>
              )}
              {postType === "message" && (
                <div className="mt-4 flex justify-between items-center">
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex items-center bg-gray-100 rounded-md p-2 hover:bg-gray-200 transition-colors duration-200 text-gray-600 hover:text-[#72daf7]"
                  >
                    <ImageIcon size={20} className="text-[#72daf7]" />
                    <span className="ml-2">画像を追加</span>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        setSelectedImage(
                          e.target.files ? e.target.files[0] : null
                        )
                      }
                    />
                  </label>
                  <div className="flex items-center bg-gray-100 rounded-md p-2 hover:bg-gray-200 transition-colors duration-200">
                    <Calendar size={20} className="text-[#72daf7] mr-2" />
                    <input
                      type="date"
                      value={postDate}
                      onChange={(e) => setPostDate(e.target.value)}
                      className="bg-transparent text-gray-700 focus:outline-none"
                    />
                  </div>
                </div>
              )}
              <button
                type="submit"
                className="mt-4 w-full bg-[#72daf7] text-white py-2 rounded-md hover:bg-[#75fff4] hover:text-gray-900 transition-colors duration-300 shadow-lg"
              >
                {postType === "task" ? "タスクを追加" : "メッセージを投稿"}
              </button>
            </form>
          </div>
        </div>
      )}
      <style>{`
        @keyframes flip {
          0%, 100% { transform: rotateY(0deg); }
          50% { transform: rotateY(180deg); }
        }
        .animate-flip {
          animation: flip 3s infinite;
        }
      `}</style>
    </div>
  );
}

function SidebarItem({ href, icon: Icon, text }) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center text-gray-700 hover:text-[#72daf7] transition-colors"
      >
        <Icon className="mr-4" size={24} />
        <span className="text-lg">{text}</span>
      </Link>
    </li>
  );
}
