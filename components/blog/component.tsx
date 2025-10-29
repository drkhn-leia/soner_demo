"use client";
import * as React from "react";
import BlogCard from "./blog_card";

type BlogItem = {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  link: string;
};

const DATA_URL = "/items.json";

export default function BlogArea() {
  const [blogs, setBlogs] = React.useState<BlogItem[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(DATA_URL, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load ${DATA_URL}`);
        const json: { blogs: BlogItem[] } = await res.json();
        if (!cancelled) setBlogs(json.blogs || []);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Veriler yüklenemedi.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section aria-labelledby="blog-heading" className="w-full">
      {/* Merkezli, responsive container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="w-full flex justify-center py-8 sm:py-10 mt-6 sm:mt-10">
          <h2
            id="blog-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight"
          >
            BLOG
          </h2>
        </div>

        {/* Hata durumu */}
        {error && (
          <p className="text-center text-red-600 mb-6" role="alert">
            {error}
          </p>
        )}

        {/* Grid: 1 → 2 → 3 → 4 sütun */}
        <div className="flex justify-center">
          <div
            className="
            grid gap-6 sm:gap-8 pb-10
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
          >
            {/* Yükleniyor: skeleton kartlar */}
            {loading &&
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="rounded-lg w-80 shadow-sm bg-white p-4 animate-pulse"
                >
                  <div className="h-40 bg-gray-200 rounded-md mb-4" />
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              ))}

            {/* İçerik */}
            {!loading &&
              blogs.map((blog) => (
                <div key={blog.id} className="flex">
                  {/* BlogCard'ın mevcut stilini koruyoruz */}
                  <BlogCard
                    title={blog.title}
                    summary={blog.summary}
                    imageUrl={blog.imageUrl}
                    link={blog.link}
                  />
                </div>
              ))}

            {/* İçerik yoksa boş durum */}
            {!loading && blogs.length === 0 && !error && (
              <div className="col-span-full text-center text-gray-600">
                Henüz blog içeriği bulunmuyor.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
