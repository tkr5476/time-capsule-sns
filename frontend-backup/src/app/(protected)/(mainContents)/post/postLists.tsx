"use client";

import { useState } from "react";
import { MessageCircle, Heart } from "lucide-react";
import Image from "next/image";

export default function PostList() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "佐藤 花子",
      username: "@hanako_sato",
      content:
        "今日から新しい目標に向かって頑張ります！みんなで応援し合いましょう！",
      likes: 15,
      comments: 3,
      shares: 2,
    },
    {
      id: 2,
      user: "鈴木 一郎",
      username: "@ichiro_suzuki",
      content:
        "息子へ。将来の夢に向かって頑張る姿を見るのが楽しみです。いつまでも応援しています。",
      likes: 28,
      comments: 5,
      shares: 7,
    },
    {
      id: 3,
      user: "田中 愛",
      username: "@ai_tanaka",
      content:
        "病気と闘いながらも、毎日少しずつ前に進んでいます。みんなの励ましが力になります。",
      likes: 42,
      comments: 12,
      shares: 9,
    },
  ]);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-start mb-2">
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 flex-shrink-0 overflow-hidden">
              <Image
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.user}`}
                alt={`${post.user}'s avatar`}
                className="w-full h-full object-cover"
                width={48}
                height={48}
              />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-800 mb-1">
                {post.user}
              </p>
              <p className="text-gray-600">{post.content}</p>
            </div>
          </div>
          <div className="flex justify-end space-x-6 text-gray-500 mt-4">
            <button className="flex items-center hover:text-[#72daf7]">
              <MessageCircle size={18} className="mr-2" />
              <span>{post.comments}</span>
            </button>
            <button className="flex items-center hover:text-[#faa823]">
              <Heart size={18} className="mr-2" />
              <span>{post.likes}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
