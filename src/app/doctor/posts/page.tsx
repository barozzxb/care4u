"use client";

import { useEffect, useState } from "react";
import {
  getDoctorPosts,
  deleteDoctorPost,
} from "@/services/post/doctorPostService";
import { DoctorPost } from "@/types/post";
import DoctorPostCard from "@/components/doctor/DoctorPostCard";
import { toast } from "react-toastify";
import Link from "next/link";

export default function DoctorPostsPage() {
  const [posts, setPosts] = useState<DoctorPost[]>([]);

  const load = () => {
    getDoctorPosts().then((res) => setPosts(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn chắc chắn muốn xóa bài viết này?")) return;

    try {
      await deleteDoctorPost(id);
      toast.success("Đã xóa bài viết");
      setPosts(posts.filter((p) => p.id !== id));
    } catch {
      toast.error("Không thể xóa bài viết");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bài viết của tôi</h1>
        <Link
          href="/doctor/posts/create"
          className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold
                       text-white shadow-md hover:bg-sky-600 active:scale-[0.98] transition"
        >
          + Đăng bài mới
        </Link>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <DoctorPostCard key={post.id} post={post} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
