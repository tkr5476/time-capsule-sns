"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FaUserPlus, FaUserCheck, FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import Header from "@/components/protected/header";

type PostStatus = "予定" | "投稿済み";

interface Post {
  id: number;
  content: string;
  date: string;
  status: PostStatus;
}

interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
  isFollowing: boolean;
}

export default function Profile() {
  const [profileImage, setProfileImage] = useState("/placeholder.svg");
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentFilter, setCurrentFilter] = useState<
    "全て" | "投稿済み" | "予定"
  >("全て");
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [followers, setFollowers] = useState<User[]>([]);
  const [following, setFollowing] = useState<User[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    // This is a mock function. In a real application, you would fetch data from an API.
    const fetchPosts = async () => {
      const mockPosts: Post[] = [
        {
          id: 1,
          content: "今日は良い天気です！",
          date: "2023-06-15",
          status: "投稿済み",
        },
        {
          id: 2,
          content: "明日の目標: 5km走る",
          date: "2023-06-16",
          status: "予定",
        },
        {
          id: 3,
          content: "新しいプロジェクトが始まりました",
          date: "2023-06-14",
          status: "投稿済み",
        },
        {
          id: 4,
          content: "週末の計画を立てる",
          date: "2023-06-18",
          status: "予定",
        },
        {
          id: 5,
          content: "週末の計画を立てる",
          date: "2023-06-18",
          status: "予定",
        },
        {
          id: 6,
          content: "週末の計画を立てる",
          date: "2023-06-18",
          status: "投稿済み",
        },
        {
          id: 7,
          content: "週末の計画を立てる",
          date: "2023-06-18",
          status: "予定",
        },
        {
          id: 8,
          content: "週末の計画を立てる",
          date: "2023-06-18",
          status: "予定",
        },
        {
          id: 9,
          content: "週末の計画を立てる",
          date: "2023-06-18",
          status: "予定",
        },
        {
          id: 10,
          content: "週末の計画を立てる",
          date: "2023-06-18",
          status: "予定",
        },
        {
          id: 11,
          content: "週末の計画を立てる",
          date: "2023-06-18",
          status: "投稿済み",
        },
        {
          id: 12,
          content: "週末の計画を立てる",
          date: "2023-06-18",
          status: "予定",
        },
      ];
      setPosts(mockPosts);
    };

    const fetchFollowers = async () => {
      const mockFollowers: User[] = [
        {
          id: 1,
          name: "山田花子",
          username: "@hanako",
          avatar: "/placeholder.svg",
          isFollowing: false,
        },
        {
          id: 2,
          name: "佐藤次郎",
          username: "@jiro",
          avatar: "/placeholder.svg",
          isFollowing: true,
        },
        {
          id: 3,
          name: "鈴木三郎",
          username: "@saburo",
          avatar: "/placeholder.svg",
          isFollowing: false,
        },
      ];
      setFollowers(mockFollowers);
    };

    const fetchFollowing = async () => {
      const mockFollowing: User[] = [
        {
          id: 4,
          name: "田中四郎",
          username: "@shiro",
          avatar: "/placeholder.svg",
          isFollowing: true,
        },
        {
          id: 5,
          name: "高橋五郎",
          username: "@goro",
          avatar: "/placeholder.svg",
          isFollowing: true,
        },
        {
          id: 6,
          name: "渡辺六郎",
          username: "@rokuro",
          avatar: "/placeholder.svg",
          isFollowing: true,
        },
      ];
      setFollowing(mockFollowing);
    };

    fetchPosts();
    fetchFollowers();
    fetchFollowing();
  }, []);

  const toggleFollow = (userId: number, isFollower: boolean) => {
    if (isFollower) {
      setFollowers(
        followers.map((follower) =>
          follower.id === userId
            ? { ...follower, isFollowing: !follower.isFollowing }
            : follower
        )
      );
    } else {
      setFollowing(
        following.map((follow) =>
          follow.id === userId
            ? { ...follow, isFollowing: !follow.isFollowing }
            : follow
        )
      );
    }
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setShowEditModal(true);
  };

  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handleSaveEdit = (editedPost: Post) => {
    setPosts(
      posts.map((post) => (post.id === editedPost.id ? editedPost : post))
    );
    setShowEditModal(false);
    setEditingPost(null);
  };

  return (
    <div>
      <Header title="プロフィール" subtitle="PROFILE - あなたの個性と目標 -" />
      <div className="p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="relative p-4 flex justify-center">
            <Image
              src={profileImage}
              alt="プロフィール画像"
              width={128}
              height={128}
              className="rounded-full border-4 border-white shadow-lg"
            />
            <label
              htmlFor="profile-upload"
              className="absolute bottom-4 right-1/2 translate-x-16 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </label>
            <input
              type="file"
              id="profile-upload"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const imageUrl = URL.createObjectURL(file);
                  setProfileImage(imageUrl);
                  // You can add logic here to upload the file to your server
                  console.log("File selected:", file.name);
                }
              }}
            />
          </div>
          <div className="p-6 bg-gradient-to-br from-white to-[#f0f9ff] rounded-b-lg">
            <h1 className="text-3xl font-bold text-[#50a4ff] text-center mb-2">
              山田 太郎
            </h1>
            <p className="text-[#00a0e9] text-center mb-6">
              未来志向の開発者 | 目標設定者 | 夢追い人
            </p>
            <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-[#72daf7] mb-2">
                自己紹介
              </h2>
              <p className="text-gray-700">
                個人の成長と夢の実現に情熱を注いでいます。自己改善の旅に一緒に参加して、お互いに刺激し合いましょう！
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#72daf7] mb-4">
                統計
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <Link
                  href="/goals"
                  className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center hover:bg-[#f0f9ff] transition-colors cursor-pointer"
                >
                  <p className="text-3xl font-bold text-[#faa823] mb-1">15</p>
                  <p className="text-[#0056b3] text-sm">目標</p>
                </Link>
                <button
                  onClick={() => setShowFollowers(true)}
                  className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center hover:bg-[#f0f9ff] transition-colors"
                >
                  <p className="text-3xl font-bold text-[#faa823] mb-1">
                    {followers.length}
                  </p>
                  <p className="text-[#0056b3] text-sm">フォロワー</p>
                </button>
                <button
                  onClick={() => setShowFollowing(true)}
                  className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center hover:bg-[#f0f9ff] transition-colors"
                >
                  <p className="text-3xl font-bold text-[#faa823] mb-1">
                    {following.length}
                  </p>
                  <p className="text-[#0056b3] text-sm">フォロー中</p>
                </button>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-[#72daf7] mb-4">
                投稿一覧
              </h2>
              <div className="mb-4 flex space-x-2">
                {["全て", "投稿済み", "予定"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() =>
                      setCurrentFilter(filter as "全て" | "投稿済み" | "予定")
                    }
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      currentFilter === filter
                        ? "bg-[#72daf7] text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div className="space-y-4">
                {posts
                  .filter(
                    (post) =>
                      currentFilter === "全て" || post.status === currentFilter
                  )
                  .map((post) => (
                    <div
                      key={post.id}
                      className="p-4 rounded-lg shadow-md bg-white"
                    >
                      <div className="flex justify-between items-start">
                        <p className="text-gray-800 flex-grow mr-4">
                          {post.content}
                        </p>
                        <button
                          onClick={() => handleEditPost(post)}
                          className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                            post.status === "予定"
                              ? "bg-yellow-200 text-yellow-800 hover:bg-yellow-300"
                              : "bg-green-200 text-green-800 hover:bg-green-300"
                          }`}
                        >
                          {post.status}
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {post.date.split("-").join("/")}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showFollowers && (
        <UserList
          title="フォロワー"
          users={followers}
          onClose={() => setShowFollowers(false)}
          onToggleFollow={(userId) => toggleFollow(userId, true)}
        />
      )}
      {showFollowing && (
        <UserList
          title="フォロー中"
          users={following}
          onClose={() => setShowFollowing(false)}
          onToggleFollow={(userId) => toggleFollow(userId, false)}
        />
      )}
      {showEditModal && editingPost && (
        <EditPostModal
          post={editingPost}
          onSave={handleSaveEdit}
          onClose={() => setShowEditModal(false)}
          onDelete={handleDeletePost}
        />
      )}
    </div>
  );
}

interface UserListProps {
  title: string;
  users: User[];
  onClose: () => void;
  onToggleFollow: (userId: number) => void;
}

function UserList({ title, users, onClose, onToggleFollow }: UserListProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-[#72daf7] to-[#75fff4] p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="rounded-full mr-4 border-2 border-[#72daf7]"
                />
                <div>
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.username}</p>
                </div>
              </div>
              <button
                onClick={() => onToggleFollow(user.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  user.isFollowing
                    ? "bg-[#72daf7] text-white hover:bg-[#5bc0de]"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {user.isFollowing ? (
                  <>
                    <FaUserCheck className="inline mr-2" />
                    フォロー中
                  </>
                ) : (
                  <>
                    <FaUserPlus className="inline mr-2" />
                    フォローする
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface EditPostModalProps {
  post: Post;
  onSave: (editedPost: Post) => void;
  onClose: () => void;
  onDelete: (postId: number) => void;
}

function EditPostModal({
  post,
  onSave,
  onClose,
  onDelete,
}: EditPostModalProps) {
  const [editedContent, setEditedContent] = useState(post.content);
  const [editedStatus, setEditedStatus] = useState(post.status);
  const [editedDate, setEditedDate] = useState(post.date);

  useEffect(() => {
    const textarea = document.querySelector("textarea");
    if (textarea) {
      textarea.focus();
    }
  }, []);

  const handleSave = () => {
    onSave({
      ...post,
      content: editedContent,
      status: editedStatus as PostStatus,
      date: editedDate,
    });
    onClose();
  };

  const handleDelete = () => {
    onDelete(post.id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-[#72daf7] to-[#75fff4] p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">投稿の編集</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center space-x-4">
            <select
              value={editedStatus}
              onChange={(e) => setEditedStatus(e.target.value as PostStatus)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#72daf7] flex-grow"
            >
              <option value="予定">予定</option>
              <option value="投稿済み">投稿済み</option>
            </select>
            <input
              type="date"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#72daf7]"
            />
          </div>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#72daf7] resize-none"
            rows={4}
            placeholder="投稿メッセージを入力してください"
          />
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-[#faa823] text-white rounded-full hover:bg-[#ffc107] hover:text-[#0056b3] transition-colors duration-300 shadow-md"
            >
              削除
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#72daf7] text-white rounded-full hover:bg-[#5bc0de] transition-colors shadow-md"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}