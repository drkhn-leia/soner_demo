import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import Image from "next/image";
import Link from "next/link";

const urunvehizmetler = [
  { name: "Baklava Kutuları", link: "#" },
  { name: "Pasta Kutuları", link: "#" },
  { name: "Turta Kutuları", link: "#" },
  { name: "Lokum Kutuları", link: "#" },
  { name: "Madlen Kutuları", link: "#" },
  { name: "Özel Üretim Kutuları", link: "#" },
  { name: "Ofset Baskılı Sıvama Kutu", link: "#" },
];

const kurumsal = [
  { name: "Anasayfa", link: "#" },
  { name: "Hakkımızda", link: "#" },
  { name: "Ürün ve Hizmetler", link: "#" },
  { name: "Blog", link: "#" },
  { name: "Referanslar", link: "#" },
  { name: "İletişim", link: "#" },
];

const iletisim = [
  {
    name: "Yakuplu, Başakkent Cd. 3. Matbaacılar Sit. No:1, 34524 Beylikdüzü/İstanbul",
    icon: "FaMapMarkerAlt",
    link: "https://maps.app.goo.gl/", // dilediğiniz harita linki
  },
  { name: "0212 612 65 22", icon: "FaPhoneAlt", link: "" },
  { name: "0541 383 04 49", icon: "FaPhoneAlt", link: "" },
  { name: "info@cbambalaj.com", icon: "FaEnvelope", link: "" },
];

const iconMap: Record<string, IconType> = {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
};

const facebookUrl = "http://www.nostcopy.com/";
const twitterUrl = "http://www.nostcopy.com/";
const instagramUrl = "http://www.nostcopy.com/";
const youtubeUrl = "http://www.nostcopy.com/";

export default function Footer() {
  // Link otomasyonu (telefon/e-posta için)
  const resolveContactHref = (item: (typeof iletisim)[number]) => {
    if (item.icon === "FaPhoneAlt") {
      // Rakamları temizleyip tel: şemasına çevir
      const digits = item.name.replace(/[^\d+]/g, "");
      return `tel:${digits}`;
    }
    if (item.icon === "FaEnvelope") {
      return `mailto:${item.name}`;
    }
    return item.link || "#";
  };

  return (
    <footer className="font-sans bg-black text-white" role="contentinfo">
      {/* Üst bölüm */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 py-12 sm:py-14 lg:py-16">
        <div
          className="
            grid grid-cols-1 gap-10
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {/* Sol: Marka + kısa metin */}
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Nost Copy</h1>
            <p className="text-base sm:text-lg text-gray-300">
              Your go-to source for all things Nost.
            </p>
            <div className="mt-6 flex justify-center sm:justify-start">
              <Image
                src="/nost.png"
                alt="Nost Copy logo"
                width={160}
                height={160}
                className="p-2"
                priority
              />
            </div>
          </div>

          {/* Orta: Ürün ve Hizmetler */}
          <nav aria-label="Ürün ve Hizmetler" className="text-center sm:text-left">
            <h2 className="text-xl font-semibold pb-4">Ürün ve Hizmetler</h2>
            <ul className="space-y-2 text-gray-300">
              {urunvehizmetler.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.link}
                    className="hover:underline hover:text-white inline-block py-1"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sağ: Kurumsal + İletişim (lg’de yan yana, küçükte alt alta) */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-1">
            <nav aria-label="Kurumsal" className="text-center sm:text-left">
              <h2 className="text-xl font-semibold pb-4">Kurumsal</h2>
              <ul className="space-y-2 text-gray-300">
                {kurumsal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.link}
                      className="hover:underline hover:text-white inline-block py-1"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <address className="not-italic text-center sm:text-left">
              <h2 className="text-xl font-semibold pb-4">İletişim</h2>
              <ul className="space-y-3 text-gray-300">
                {iletisim.map((item) => {
                  const Icon = iconMap[item.icon];
                  const href = resolveContactHref(item);
                  const isExternal = href.startsWith("http");
                  const commonClasses =
                    "hover:underline hover:text-white inline-flex items-center gap-3 py-1 justify-center sm:justify-start";
                  return (
                    <li key={item.name}>
                      <a
                        href={href}
                        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className={commonClasses}
                      >
                        {Icon ? <Icon aria-hidden className="shrink-0" /> : null}
                        <span className="max-w-[22rem] text-sm sm:text-base">{item.name}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>

              {/* Sosyal ikonlar */}
              <div className="flex justify-center sm:justify-start gap-4 text-2xl pt-5">
                {facebookUrl && (
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="hover:text-white text-gray-300"
                  >
                    <FaFacebookF />
                  </a>
                )}
                {twitterUrl && (
                  <a
                    href={twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter / X"
                    className="hover:text-white text-gray-300"
                  >
                    <FaTwitter />
                  </a>
                )}
                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="hover:text-white text-gray-300"
                  >
                    <FaInstagram />
                  </a>
                )}
                {youtubeUrl && (
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="hover:text-white text-gray-300"
                  >
                    <FaYoutube />
                  </a>
                )}
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Alt bar */}
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-6 sm:px-8 py-4 text-center text-sm text-gray-300">
          Copyright © 2024 — Nost Copy · All rights reserved.
        </p>
      </div>
    </footer>
  );
}
