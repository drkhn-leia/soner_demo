"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const linkList = [
    { href: "/", label: "Anasayfa" },
    { href: "/about", label: "Hakkımızda" },
    { href: "/products", label: "Ürün ve Hizmetlerimiz" },
    { href: "/ref", label: "Referanslar" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "İletişim" },
  ];

  // Route değişince kapat
  useEffect(() => setOpen(false), [pathname]);

  // ESC + scroll kilidi
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = prev || "";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev || "";
    };
  }, [open]);

  return (
    <>
      {/* Masaüstü */}
      <div className="hidden lg:flex h-20 font-sans xl:min-w-max">
        <div className="flex items-center w-full justify-between pl-36">
          <Link href="/" className="text-2xl font-semibold cursor-pointer">
            Nost Copy
          </Link>
        </div>
        <div className="flex items-center w-full justify-end pr-36">
          <ul className="flex gap-4 text-[0.9rem]">
            {linkList.map(({ href, label }) => (
              <li key={href} className="hover:underline underline-offset-8">
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobil */}
      <div
        className={`
          relative flex flex-col font-sans lg:hidden w-full overflow-hidden
          transition-all duration-500 ease-in-out bg-white
          ${open ? "h-screen" : "h-20"}
        `}
        style={{ zIndex: 50 }}
      >
        {/* Üst satır: logo + buton */}
        <div className="flex items-center justify-between px-10 py-10 h-20">
          <Link href="/" className="text-2xl font-semibold cursor-pointer z-50">
            Nost Copy
          </Link>

          <button
            type="button"
            className="z-50 inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
            aria-controls="mobile-menu"
            aria-expanded={open}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setOpen((p) => !p)}
          >
            {/* Tek buton: açık/kapalı durumuna göre ikon */}
            {open ? (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Menü içerik kısmı */}
        <div
          className={`
            flex-1 flex flex-col items-center justify-center
            transition-opacity duration-500 ease-in-out
            ${
              open ? "opacity-100 bg-black/50" : "opacity-0 pointer-events-none"
            }
          `}
        >
          <nav>
            <ul className="flex flex-col gap-6 text-center text-white text-2xl font-medium">
              {linkList.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 hover:underline underline-offset-8"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
