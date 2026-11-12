import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });

export const metadata: Metadata = {
  title: "Tic Tac Toe",
  description: "Challenge your mind. Make your move.",
};

export const viewport: Viewport = {
  themeColor: "#0b0d1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={sora.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
