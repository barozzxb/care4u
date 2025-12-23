"use client";

import Link from "next/link";
import { DoctorPost } from "@/types/post";

type Props = {
  post: DoctorPost;
  onDelete: (id: number) => void;
};

export default function DoctorPostCard({ post, onDelete }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-1">{post.title}</h2>

      <p className="text-gray-600 text-sm mb-3">
        {post.content.slice(0, 120)}...
      </p>

      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>

        <div className="flex gap-3">
          <Link
            href={`/doctor/posts/edit/${post.id}`}
            className="text-blue-600 font-medium hover:underline"
          >
            Sửa
          </Link>

          <button
            onClick={() => onDelete(post.id)}
            className="text-red-600 font-medium hover:underline"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
