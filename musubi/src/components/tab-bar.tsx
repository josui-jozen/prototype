"use client";

import { usePathname, useRouter } from "next/navigation";

const TABS = [
  { label: "書く", icon: "✏️", path: "/" },
  { label: "届いた", icon: "📨", path: "/recommend" },
  { label: "便箋", icon: "💌", path: "/letterbox" },
  { label: "設定", icon: "⚙️", path: "/settings" },
] as const;

export function TabBar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-muted/30 max-w-md mx-auto z-50">
      <div className="flex justify-around py-2">
        {TABS.map((tab) => {
          const active = pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => router.push(tab.path)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1 text-xs transition-colors ${
                active ? "text-accent" : "text-muted"
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
