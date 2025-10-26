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
    link: "#",
  },
  { name: "0212 612 65 22", icon: "FaPhoneAlt", link: "#" },
  { name: "0541 383 04 49", icon: "FaPhoneAlt", link: "#" },
  { name: "info@cbambalaj.com", icon: "FaEnvelope", link: "#" },
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
  return (
    <>
      <div className="flex min-w-max items-center justify-center h-96 mt-16 font-sans bg-black text-white">
        <div className="flex flex-row justify-center items-start space-x-32">
          <div>
            <h1 className="text-4xl font-bold mb-4">Nost Copy</h1>
            <p className="text-lg">Your go-to source for all things Nost.</p>
            <Image
              src={"/nost.png"}
              alt="nost_logo"
              width={200}
              height={200}
              className="mt-4 p-4"
            />
          </div>

          <ul className="text-gray-300">
            <li className="text-xl font-semibold pb-4">Ürün ve Hizmetler</li>
            {urunvehizmetler.map((item) => (
              <li key={item.name} className="mb-2">
                <a
                  href={item.link}
                  className="hover:underline hover:text-white"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <ul className="text-gray-300">
            <li className="text-xl font-semibold pb-4">Kurumsal</li>
            {kurumsal.map((item) => (
              <li key={item.name} className="mb-2">
                <a
                  href={item.link}
                  className="hover:underline hover:text-white"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          <ul className="text-gray-300 max-w-64">
            <li className="text-xl font-semibold pb-4">İletişim</li>
            {iletisim.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <li key={item.name} className="mb-2">
                  <p className="hover:underline hover:text-white flex items-center gap-4 cursor-pointer">
                    {Icon ? <Icon aria-hidden className="shrink-0" /> : null}
                    <span>{item.name}</span>
                  </p>
                </li>
              );
            })}
            <div className="flex flex-row text-2xl pt-4">
              {
                /* Social Media Links */
                facebookUrl ? (
                  <a
                    href={facebookUrl}
                    className="mr-4 hover:underline hover:text-white"
                  >
                    <FaFacebookF />
                  </a>
                ) : null
              }
              {twitterUrl ? (
                <a
                  href={twitterUrl}
                  className="mr-4 hover:underline hover:text-white"
                >
                  <FaTwitter />
                </a>
              ) : null}
              {instagramUrl ? (
                <a
                  href={instagramUrl}
                  className="mr-4 hover:underline hover:text-white"
                >
                  <FaInstagram />
                </a>
              ) : null}
              {youtubeUrl ? (
                <a
                  href={youtubeUrl}
                  className="mr-4 hover:underline hover:text-white"
                >
                  <FaYoutube />
                </a>
              ) : null}
            </div>
          </ul>
        </div>
      </div>
      <p className="px-4">Copyright © 2024 - Nost Copy | All rights reserved.</p>
    </>
  );
}
