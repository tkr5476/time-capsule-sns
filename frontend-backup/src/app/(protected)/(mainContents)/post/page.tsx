"use client";

import { useState } from "react";
import Image from "next/image";

export default function Posts() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "佐藤 花子",
      content: "5km走る目標を達成しました！",
      likes: 15,
      comments: 3,
    },
    {
      id: 2,
      user: "鈴木 一郎",
      content: "新しい目標：ギターを学ぶ",
      likes: 8,
      comments: 1,
    },
    {
      id: 3,
      user: "田中 愛",
      content:
        "コーディングブートキャンプの半分が終わりました。頑張り続けます！",
      likes: 22,
      comments: 5,
    },
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-800 mb-6">最近の投稿</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center mb-2">
              <Image
                src="/placeholder.svg"
                alt={post.user}
                width={40}
                height={40}
                className="rounded-full mr-2"
              />
              <p className="font-semibold text-blue-600">{post.user}</p>
            </div>
            <p className="text-blue-800 mb-2">{post.content}</p>
            <div className="flex justify-between text-blue-500">
              <span>{post.likes} いいね</span>
              <span>{post.comments} コメント</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
