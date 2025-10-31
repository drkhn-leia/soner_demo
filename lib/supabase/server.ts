import "server-only";
import { cookies as nextCookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

async function safeGetCookie(name: string): Promise<string | undefined> {
  try {
    const store = await nextCookies(); // 🔹 await eklendi
    // @ts-ignore - imza kontrolü
    const got = store?.get?.(name);
    if (got == null) return undefined;
    if (typeof got === "string") return got;
    if (typeof got === "object") return got.value;
    return undefined;
  } catch (e) {
    console.warn("safeGetCookie error:", e);
    return undefined;
  }
}

async function safeSetCookie(name: string, value: string, options: CookieOptions) {
  try {
    const store = await nextCookies();
    // @ts-ignore
    if (typeof store?.set === "function") {
      if (store.set.length >= 2) {
        // @ts-ignore
        store.set(name, value, options);
      } else {
        // @ts-ignore
        store.set({ name, value, ...options });
      }
    }
  } catch (e) {
    console.warn("safeSetCookie error:", e);
  }
}

async function safeRemoveCookie(name: string, options: CookieOptions) {
  await safeSetCookie(name, "", { ...options, expires: new Date(0) });
}

export function createClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          return await safeGetCookie(name);
        },
        async set(name: string, value: string, options: CookieOptions) {
          await safeSetCookie(name, value, options);
        },
        async remove(name: string, options: CookieOptions) {
          await safeRemoveCookie(name, options);
        },
      },
    }
  );
}
