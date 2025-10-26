import Link from "next/link";

export default function Header() {
  const linkList = [
    { href: "/", label: "Anasayfa" },
    { href: "/about", label: "Hakkımızda" },
    { href: "/contact", label: "İletişim" },
    { href: "/products", label: "Ürünlerimiz" },
  ];

  return (
    <div className="flex min-w-max h-20 font-sans">
      <div className="flex items-center w-full justify-between pl-36">
        <a className="text-2xl font-semibold cursor-pointer" href="#">
          Nost Copy
        </a>
      </div>
      <div className="flex items-center w-full justify-end pr-36">
        <div>
          <ul className="flex gap-8 text-[1rem] ">
            {linkList.map(({ href, label }) => (
              <li key={href} className="hover:underline underline-offset-8">
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
