"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { fetchPosts } from "@/services/common/postService";
import PostCard from "@/components/common/PostCard";

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [last, setLast] = useState(false);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (loading || last) return;

    setLoading(true);
    const { body } = await fetchPosts(page, 4);

    setPosts((prev) => [...prev, ...body.content]);
    setLast(body.last);
    setPage((prev) => prev + 1);
    setLoading(false);
  }, [loading, last, page]);

  useEffect(() => {
    loadMore();
  }, []);


  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      {
        threshold: 0,
        rootMargin: "200px",
      }
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loadMore, last]);

  return (
    <div className="flex flex-col items-center gap-6 py-8 min-h-screen">
      
      <div>
        <p className="text-3xl font-bold">Khám phá những bí quyết, chia sẻ về sức khỏe</p>
      </div>

      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {!last && (
        <div ref={loaderRef} className="py-6 text-gray-500">
          {loading ? "Đang tải..." : "Cuộn để tải thêm"}
        </div>
      )}
    </div>
  );
}
