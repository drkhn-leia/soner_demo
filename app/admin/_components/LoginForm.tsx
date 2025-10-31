"use client";

import { useState, useTransition } from "react";
import { loginAction } from "@/app/actions/auth";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <form
        className="bg-foreground/10 shadow-md rounded p-6 w-full max-w-sm"
        action={(formData) => {
          setError(null);
          startTransition(async () => {
            const res = await loginAction(formData);
            if (res?.ok === false) setError(res.message);
          });
        }}
      >
        <h1 className="text-xl font-semibold mb-4">Admin Giriş</h1>

        <label className="block text-sm mb-1">Email</label>
        <input
          name="email"
          type="email"
          className="w-full border rounded px-3 py-2 mb-3"
          required
        />

        <label className="block text-sm mb-1">Şifre</label>
        <input
          name="password"
          type="password"
          className="w-full border rounded px-3 py-2 mb-3"
          required
        />

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded bg-black text-white py-2"
        >
          {isPending ? "Giriş yapılıyor..." : "Giriş yap"}
        </button>
      </form>
    </main>
  );
}
