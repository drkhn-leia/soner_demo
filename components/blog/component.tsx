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

  React.useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(DATA_URL, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load ${DATA_URL}`);

        const json: { blogs: BlogItem[] } = await res.json();
        if (!cancelled) {
          setBlogs(json.blogs);
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load images");
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col mx-10">
      <div className="w-full flex text-center justify-center py-10 mt-10 text-5xl font-semibold ">
        BLOG
      </div>
      <div className="flex flex-row gap-8 justify-center pb-10">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            summary={blog.summary}
            imageUrl={blog.imageUrl}
            link={blog.link}
          />
        ))}
      </div>
    </div>
  );
}
