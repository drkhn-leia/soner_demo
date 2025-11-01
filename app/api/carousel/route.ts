import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

export async function GET() {
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase
    .from("carousel_items")
    .select(
      "id, image_url, title, description, button_text, button_href, sort_order, starts_at, ends_at, is_active"
    )
    .eq("is_active", true)
    .or("starts_at.is.null,starts_at.lte.now()")
    .or("ends_at.is.null,ends_at.gte.now()")
    .order("sort_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // İstemcinin beklediği sade biçim
  const items = (data ?? []).map((d) => ({
    id: d.id,
    imageUrl: d.image_url,
    title: d.title,
    description: d.description,
    buttonText: d.button_text,
    buttonHref: d.button_href,
  }));

  return NextResponse.json(
    { items },
    { headers: { "Cache-Control": "no-store" } }
  );
}
