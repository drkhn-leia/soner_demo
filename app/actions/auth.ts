"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  //console.log("🔹 Login result:", { error, user: data?.user });

  if (error) return { ok: false, message: error.message };

  // Hemen redirect et (cookie yazılması gerekir)
  redirect("/admin");
}

export async function logoutAction() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/admin"); // Çıkıştan sonra yine /admin'e gel, login görünsün
}
