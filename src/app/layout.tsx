import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "しずかなインターネット",
  description: "日記やエッセイを書くのにちょうどいい、文章書き散らしサービス",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
