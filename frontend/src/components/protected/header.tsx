import React from "react";

interface HeaderProps {
  title: string;
  subtitle: string;
}

// メインコンテンツのヘッダー
export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-[#72daf7] to-[#75fff4] p-6 shadow-md rounded-b-2xl md:rounded-none">
      <h1 className="text-3xl font-bold text-white tracking-wide">
        {title}
        <span className="block text-sm font-normal mt-1 text-gray-100 opacity-80">
          {subtitle}
        </span>
      </h1>
    </header>
  );
};