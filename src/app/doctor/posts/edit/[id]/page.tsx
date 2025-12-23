"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getDoctorPostById,
  updateDoctorPost,
} from "@/services/post/doctorPostService";
import { toast } from "react-toastify";

export default function EditDoctorPostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDoctorPostById(Number(id)).then((res) => {
      setTitle(res.data.title);
      setContent(res.data.content);
    });
  }, [id]);

  const submit = async () => {
    if (!title || !content) {
      toast.error("Thiếu thông tin");
      return;
    }

    setLoading(true);
    try {
      await updateDoctorPost(Number(id), { title, content });
      toast.success("Cập nhật thành công");
      router.push("/doctor/posts");
    } catch {
      toast.error("Không thể cập nhật");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Chỉnh sửa bài viết</h1>

      <input
        className="w-full border p-2 mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full border p-2 h-40 mb-3"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={submit}
        disabled={loading}
        className="rounded-full bg-yellow-500 px-4 py-2 text-sm font-semibold
                       text-white shadow-md hover:bg-yellow-600 active:scale-[0.98] transition"
      >
        {loading ? "Đang lưu..." : "Lưu thay đổi"}
      </button>
    </div>
  );
}
