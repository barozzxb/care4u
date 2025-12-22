"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { fetchPosts } from "@/services/common/postService";
import PostCard from "@/components/common/PostCard";

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [last, setLast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState('created,desc');

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (loading || last) return;

    setLoading(true);
    const { body } = await fetchPosts(page, 4, sort);

    setPosts((prev) => [...prev, ...body.content]);
    setLast(body.last);
    setPage((prev) => prev + 1);
    setLoading(false);
  }, [loading, last, page, sort]);

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    setPosts([]);
    setPage(0);
    setLast(false);
  }, [sort]);

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
    <div className="min-h-screen bg-gray-50">
      <section className="bg-linear-to-r from-emerald-500 to-teal-500 text-white">
        <div className="max-w-6xl mx-auto px-4 py-14 text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Khám phá những bí quyết chăm sóc sức khỏe
          </h1>
          <p className="mt-4 text-lg text-emerald-50 max-w-2xl mx-auto">
            Chia sẻ kiến thức y khoa, lối sống lành mạnh và những lời khuyên
            giúp bạn nâng cao chất lượng cuộc sống mỗi ngày.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Bài viết mới nhất
          </h2>
          <select onChange={(e) => { setSort(e.target.value) }} value={sort}
            className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm
               focus:outline-none ">
            <option value={'created,desc'}>Mới nhất trước</option>
            <option value={'created,asc'}>Cũ nhất trước</option>
            <option value={'title,asc'}>Tiêu đề A-Z</option>
            <option value={'title,desc'}>Tiêu đề Z-A</option>
            <option value={'updated,asc'}>Cập nhật cũ nhất</option>
            <option value={'updated,desc'}>Cập nhật mới nhất</option>
          </select>
        </div>

        <div className="flex flex-col justify-center items-center gap-5">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {!last && (
          <div
            ref={loaderRef}
            className="mt-10 flex justify-center text-gray-500 text-sm"
          >
            {loading ? (
              <span className="animate-pulse">Đang tải bài viết...</span>
            ) : (
              <span>Cuộn xuống để tải thêm</span>
            )}
          </div>
        )}
      </section>
    </div>

  );
}
