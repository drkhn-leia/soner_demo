"use client";
import Image from "next/image";

type BlogCardProps = {
  title: string;
  summary: string;
  imageUrl: string;
  link: string;
};

export default function BlogCard({
  title,
  summary,
  imageUrl,
  link,
}: BlogCardProps) {
  // Karakter bazlı fallback (örneğin eski tarayıcılar için)
  const shortSummary =
    summary.length > 100 ? summary.substring(0, 100).trim() + "..." : summary;

  return (
    <div className="flex text-center justify-center py-10 bg-white h-auto w-80 rounded-lg shadow-md p-4">
      <div className="flex flex-col gap-4">
        <Image
          src={imageUrl}
          alt={title}
          width={288}
          height={162}
          className="rounded-md"
        />
        <div className="font-semibold text-sm text-start">{title}</div>
        <div
          className="text-sm text-gray-600 text-start line-clamp-4 overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
          }}
        >
          {shortSummary}
        </div>
        <a
          href={link}
          className="text-blue-500 font-semibold cursor-pointer hover:underline"
        >
          Read More
        </a>
      </div>
    </div>
  );
}
