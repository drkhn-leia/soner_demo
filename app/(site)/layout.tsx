import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import Header from "./header";
import Footer from "./footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  fallback: ["sans-serif"],
});

export const metadata: Metadata = {
  title: "Nost Copy",
  description: "All Printing Needs",
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen max-w-full">
        <main className="flex flex-col grow w-full">
          <Header />
          {children}
          <Footer />
        </main>
      </div>
    </>
  );
}
