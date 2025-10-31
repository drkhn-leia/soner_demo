import "server-only";
import "./admin.css";
import Shell from "./_components/Shell";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 🔓 Login YOKSA → Shell kullanmadan "children" (Login sayfası)
  if (!user) {
    return <main className="min-w-full">{children}</main>;
  }

  // 🔒 Login VARSA → Shell (Header + Sidebar) + children orta alana akar
  return <Shell userEmail={user.email ?? ""}>{children}</Shell>;
}
