"use client";

import { Sidebar } from "@/app/_components/layout/Sidebar";
import { FloatingActionButton } from "@/app/_components/layout/FloatingActionButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[720px] mx-auto px-8 py-10">
          {children}
        </div>
      </main>
      <FloatingActionButton />
    </div>
  );
}
