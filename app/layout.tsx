import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import SWRegistration from "@/components/SWRegistration";

export const metadata: Metadata = {
  title: "StudyBoost",
  description: "PWA japonesa de productividad",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-black text-white">
        <SWRegistration />

        <nav className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-lg border-b border-red-500/20 z-50">
          <div className="max-w-5xl mx-auto flex justify-center gap-8 p-5 text-lg font-semibold">
            <Link
              href="/"
              className="hover:text-red-400 transition"
            >
              Inicio
            </Link>

            <Link
              href="/zen"
              className="hover:text-red-400 transition"
            >
              Zen Mode
            </Link>
          </div>
        </nav>

        <div className="pt-24">{children}</div>
      </body>
    </html>
  );
}