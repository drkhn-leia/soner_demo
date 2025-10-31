import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="flex items-start min-w-64 bg-foreground/10 p-12 min-h-full">
      <ul>
        <li className="flex flex-col gap-4">
          <b>Dashboard</b>
          <ul className="ml-4 flex flex-col gap-2">
            <li><Link href="/admin">Anasayfa</Link></li>
            <li><Link href="/admin/about">Hakkında</Link></li>
            <li><Link href="/admin/settings">Ayarlar</Link></li>
          </ul>
        </li>
      </ul>
    </aside>
  );
}
