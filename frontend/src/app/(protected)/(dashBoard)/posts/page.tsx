"use client";

import Header from "@/components/protected/header";
import PostForm from "@/components/protected/posts/postForm";
import PostList from "@/components/protected/posts/postList";

export default function Posts() {
  return (
    <div>
      <Header title="HOME" subtitle="ホーム -みんなの投稿- " />
      <PostForm />
      <PostList />
    </div>
  );
}
