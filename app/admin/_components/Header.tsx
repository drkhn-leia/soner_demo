// app/admin/_components/Header.tsx
"use client";

import Link from "next/link";

import { logoutAction } from "@/app/actions/auth";

export default function Header({ userEmail }: { userEmail: string }) {
  return (
    <>
      <div className="flex flex-row items-center h-20 min-w-full bg-foreground/15 px-12">
        <div className="flex flex-row items-center w-full justify-between ">
          <Link
            href="/admin"
            className="flex flex-row items-end text-2xl font-semibold cursor-pointer"
          >
            Nost Copy
            <p className="text-sm font-semibold">Admin Panel</p>
          </Link>
        </div>
        <div className="flex flex-row gap-8 items-center">
          <p>{userEmail}</p>
          <form action={logoutAction}>
            <button className="rounded bg-black text-white px-3 py-1">
              Çıkış
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
