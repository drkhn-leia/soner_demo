// app/(admin)/admin/layout.tsx
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh grid grid-cols-[240px_1fr]">
      <aside className="border-r p-4">
        <div className="font-bold mb-4">Admin</div>
        <nav className="grid gap-2">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/users">Users</Link>
          <Link href="/admin/settings">Settings</Link>
        </nav>
      </aside>
      <section className="p-6">{children}</section>
    </div>
  );
}
