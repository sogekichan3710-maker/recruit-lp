import type { Metadata, Viewport } from "next";
import { Shippori_Mincho, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";
import StickyApplyButton from "@/components/StickyApplyButton";

const serif = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "THE VIRGO FUKUOKA / REGINA 求人採用サイト｜福岡 高収入 高級キャバクラ求人",
  description:
    "福岡の高級キャバクラ THE VIRGO FUKUOKA・REGINA の採用ページ。未経験歓迎・高収入・送迎あり・ノルマなし。まずはLINEで気軽にご相談ください。",
  openGraph: {
    title: "THE VIRGO FUKUOKA / REGINA 求人採用サイト",
    description:
      "福岡の高級キャバクラで働く、特別な選択。未経験歓迎・高収入・送迎あり。",
    type: "website",
    locale: "ja_JP",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0908",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-body antialiased bg-ink text-ivory overflow-x-hidden">
        {children}
        <StickyApplyButton />
      </body>
    </html>
  );
}
