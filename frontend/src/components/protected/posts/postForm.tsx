"use client";

import { useState } from "react";
import { FaCamera, FaCalendarAlt } from "react-icons/fa";

export default function PostForm() {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで投稿処理を行う








    
    console.log("投稿内容:", content);
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-lg p-4 mb-6"
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="今、何を考えていますか？未来の自分や大切な人へのメッセージを書いてみましょう。"
        className="w-full bg-gray-100 border border-gray-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#72daf7] focus:border-transparent resize-none text-lg text-gray-800 placeholder-gray-500"
        rows={3}
      />
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-4">
          <label
            htmlFor="photo-upload"
            className="cursor-pointer text-gray-600 hover:text-[#72daf7] transition-colors"
          >
            <FaCamera size={20} />
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  console.log("Photo selected:", files[0]);
                }
              }}
            />
          </label>
          <button
            type="button"
            className="text-gray-600 hover:text-[#72daf7] transition-colors"
            onClick={() => {
              // Set the post date to current date and time
              console.log("Post date set:", new Date().toISOString());
            }}
          >
            <FaCalendarAlt size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-semibold text-white bg-[#72daf7] rounded-full shadow-md transition-all duration-300 ease-in-out hover:bg-[#75fff4] hover:text-gray-900 hover:shadow-lg"
        >
          投稿
        </button>
      </div>
    </form>
  );
}
