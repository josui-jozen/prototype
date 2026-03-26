import type { Metadata } from "next";
import { TabBar } from "@/components/tab-bar";
import "./globals.css";

export const metadata: Metadata = {
  title: "ムスビ",
  description: "繋がりたくないけど繋がりたい",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <head>
        <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async />
      </head>
      <body className="min-h-full flex flex-col">
        <div className="flex flex-col flex-1 max-w-md mx-auto w-full">
          <main className="flex-1 overflow-y-auto pb-20">
            {children}
          </main>
          <TabBar />
        </div>
      </body>
    </html>
  );
}
