export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import LoginForm from "./_components/LoginForm";
// import Main from "./_components/Main"; // İstersen burayı kullan

export default async function AdminPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <LoginForm />;

  // Shell bu sayfayı orta alanda gösterecek
  return (
    <>
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <p className="opacity-80 mt-2">Anasayfa içeriği burada.</p>
    </>
  );
}
