"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function UserSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // ここでユーザー検索処理を行う
    console.log("検索ワード:", searchTerm);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ユーザーを検索"
            className="w-full pl-10 pr-4 py-2 text-lg font-semibold text-gray-800 bg-gray-100 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#75fff4] focus:border-transparent placeholder-gray-500"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={20}
          />
        </div>
      </form>
      <div className="space-y-4">
        <UserSearchResult name="山田 花子" username="@hanako_yamada" />
        <UserSearchResult name="佐藤 太郎" username="@taro_sato" />
        <UserSearchResult name="鈴木 美咲" username="@misaki_suzuki" />
      </div>
    </div>
  );
}

function UserSearchResult({ name, username }) {
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
    // ここでフォロー/フォロー解除の処理を行う
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex-grow">
        <p className="font-semibold text-gray-800 mb-1">{name}</p>
      </div>
      <button
        onClick={toggleFollow}
        className={`px-4 py-1 rounded-full text-sm font-semibold transition-all duration-300 ${
          isFollowing
            ? "bg-white text-[#72daf7] border border-[#72daf7] hover:bg-[#f0f9ff]"
            : "bg-[#72daf7] text-white hover:bg-[#75fff4] hover:text-gray-900"
        }`}
      >
        {isFollowing ? (
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            フォロー中
          </span>
        ) : (
          "フォローする"
        )}
      </button>
    </div>
  );
}
