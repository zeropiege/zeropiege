import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zéro Piège - Les ressources IA les plus puissantes, chaque semaine",
  description: "Zéro Piège partage chaque semaine des outils et des tutoriels IA testés, expliqués pas à pas et sans mauvaise surprise.",
};

export const viewport: Viewport = {
  themeColor: "#0A1A2F",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0A1A2F] text-white">{children}</body>
    </html>
  );
}