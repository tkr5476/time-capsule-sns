"use client";

import Header from "@/components/protected/header";
import Image from "next/image";
import { useState, useEffect } from "react";

type PostStatus = "予定" | "投稿済み";

interface Post {
  id: number;
  content: string;
  date: string;
  status: PostStatus;
}

export default function Profile() {
  const [profileImage, setProfileImage] = useState("/placeholder.svg");
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentFilter, setCurrentFilter] = useState<
    "全て" | "投稿済み" | "予定"
  >("全て");

  useEffect(() => {
    const fetchPosts = async () => {
      const mockPosts: Post[] = [
        // サーバーでデータの処理を記述

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
          id: 5,
          content: "週末の計画を立てる",
          date: "2023-06-18",
          status: "予定",
        },
        {
          id: 6,
          content: "週末の計画を立てる",
          date: "2023-06-18",
          status: "予定",
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
          status: "予定",
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

    fetchPosts();
  }, []);

  return (
    <>
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
                const files = e.target.files;
                if (files && files.length > 0) {
                  const file = files[0];
                  const imageUrl = URL.createObjectURL(file);
                  setProfileImage(imageUrl);

                  // サーバーでの画像の処理を記述

                  console.log("File selected:", file.name);
                }
              }}
            />
          </div>
          <div className="p-6 bg-gradient-to-br from-white to-[#f0f9ff] rounded-b-lg">
            <h1 className="text-3xl font-bold text-[#0056b3] text-center mb-2">
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
                <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                  <p className="text-3xl font-bold text-[#faa823] mb-1">15</p>
                  <p className="text-[#0056b3] text-sm">目標</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                  <p className="text-3xl font-bold text-[#faa823] mb-1">250</p>
                  <p className="text-[#0056b3] text-sm">フォロワー</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                  <p className="text-3xl font-bold text-[#faa823] mb-1">100</p>
                  <p className="text-[#0056b3] text-sm">フォロー中</p>
                </div>
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
                      className={`p-4 rounded-lg shadow-md ${
                        post.status === "予定" ? "bg-gray-100" : "bg-white"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-gray-800">{post.content}</p>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            post.status === "予定"
                              ? "bg-[#faa823] text-[orange-700]"
                              : "bg-green-200 text-green-800"
                          }`}
                        >
                          {post.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {post.date.split("-").join("/")}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
