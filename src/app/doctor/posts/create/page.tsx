"use client";

import { useState } from "react";
import { createDoctorPost } from "@/services/post/doctorPostService";
import { toast } from "react-toastify";

export default function CreateDoctorPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!title || !content) {
      toast.error("Thiếu thông tin");
      return;
    }

    setLoading(true);
    try {
      await createDoctorPost({ title, content });
      toast.success("Đăng bài thành công");
      window.location.href = "/doctor/posts";
    } catch {
      toast.error("Không thể đăng bài");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Đăng bài viết</h1>

      <input
        className="w-full border p-2 mb-3"
        placeholder="Tiêu đề"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full border p-2 h-40 mb-3"
        placeholder="Nội dung"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={submit}
        disabled={loading}
        className="rounded-full bg-green-700 px-4 py-2 text-sm font-semibold
                       text-white shadow-md hover:bg-green-600 active:scale-[0.98] transition"
      >
        {loading ? "Đang đăng..." : "Đăng bài"}
      </button>
    </div>
  );
}
