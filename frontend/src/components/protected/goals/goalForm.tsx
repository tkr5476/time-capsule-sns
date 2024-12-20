"use client";

import { useState } from "react";

export default function GoalForm({ onSubmit }: { onSubmit: (goal: any) => void }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, category, progress: 0 });
    setTitle("");
    setCategory("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 bg-white p-4 rounded-lg shadow"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="目標のタイトル"
        className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="カテゴリー"
        className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
      <button
        type="submit"
        className="w-full px-4 py-2 bg-[#72daf7] text-white rounded-full hover:bg-[#75fff4] hover:text-[#0056b3] transition-colors duration-300 shadow-md hover:shadow-lg"
      >
        目標を追加
      </button>
    </form>
  );
}