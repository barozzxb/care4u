"use client";

import { useState, useRef, useEffect } from "react";
import { Post } from "@/types/types";
import { formatTime } from "@/utils/functions";
import { IMG_HOST } from "@/utils/variables";

export default function PostCard({ post }: { post: Post }) {
  const [expanded, setExpanded] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setIsOverflow(
        contentRef.current.scrollHeight >
        contentRef.current.clientHeight
      );
    }
  }, []);

  return (
    <article className="w-full max-w-4xl bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-2xl transition">
      <div className="flex items-center gap-3 p-4">
        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold">
          {post.account_email.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">{post.account_email}</span>
          <span className="text-sm text-gray-500">
            {formatTime(post.created)}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h2 className="text-lg font-bold">{post.title}</h2>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {isOverflow && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            {expanded ? "Thu gọn" : "Xem thêm"}
          </button>
        )}
      </div>
      {
        post.image && (
          <div className="w-full bg-gray-100 flex justify-center px-2.5">
            <img
              src={`${IMG_HOST}${post.image}`}
              alt={post.title}
              className="w-xs h-auto object-contain"
            />
          </div>
        )
      }
      {
        post.updated && (
          <div className="px-4 pb-4 text-sm text-gray-500 text-right">
            Cập nhật: {formatTime(post.updated)}
          </div>
        )
      }
    </article >
  );
}
