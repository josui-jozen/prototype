"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  Bell,
  Settings,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "@/app/_hooks/useAuth";

const menuItems = [
  { label: "ダッシュボード", icon: LayoutDashboard, href: "/dashboard" },
  { label: "感想レター", icon: Mail, href: "/letters" },
  { label: "購読中", icon: Bell, href: "/subscriptions" },
  { label: "設定", icon: Settings, href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <aside className="w-[240px] shrink-0 bg-white border-r border-[var(--color-border)] min-h-screen flex flex-col py-6">
      {/* Back to home */}
      <Link
        href="/home"
        className="flex items-center gap-2 px-5 mb-6 no-underline text-[15px] text-[var(--color-text-primary)] hover:text-[var(--color-text-secondary)]"
      >
        <ArrowLeft size={16} />
        <span>{user?.name}</span>
      </Link>

      {/* Menu items */}
      <nav className="flex flex-col gap-1 px-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg no-underline text-[15px] transition-colors ${
                isActive
                  ? "bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] font-medium"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
              }`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
