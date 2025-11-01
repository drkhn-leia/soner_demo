import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL!;
const key = process.env.SUPABASE_ANON_KEY!;

/**
 * ?key=dark gibi bir parametre alır, yoksa 'default' getirir.
 * Aktif değilse 404 döner.
 */
export async function GET(req: Request) {
  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { searchParams } = new URL(req.url);
  const themeKey = searchParams.get("key") ?? "default";

  const { data, error } = await supabase
    .from("themes")
    .select("key, vars, is_active")
    .eq("key", themeKey)
    .eq("is_active", true)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Theme not found" }, { status: 404 });
  }

  return NextResponse.json(
    { key: data.key, vars: data.vars },
    { headers: { "Cache-Control": "max-age=0, s-maxage=60" } } // Edge/CDN için 60s
  );
}
