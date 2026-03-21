import type { Metadata } from "next";
import { AuthProvider } from "@/app/_hooks/useAuth";
import "./globals.css";

export const metadata: Metadata = {
  title: "コピーサイト",
  description: "日記やエッセイを書くのにちょうどいい、文章書き散らしサービス",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <AuthProvider defaultAuthenticated={true}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
