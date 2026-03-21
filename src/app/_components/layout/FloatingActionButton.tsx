"use client";

import Link from "next/link";
import Image from "next/image";
import { Home } from "lucide-react";

type FloatingActionButtonProps = {
  onMenuClick?: () => void;
};

export function FloatingActionButton({
  onMenuClick,
}: FloatingActionButtonProps) {
  return (
    <div className="fixed bottom-[56px] left-[64px] flex items-center bg-white rounded-full shadow-[0px_0px_0px_1px_rgba(0,0,0,0.09),0px_3px_8px_-3px_rgba(0,0,0,0.08)] z-10 overflow-hidden">
      <button
        onClick={onMenuClick}
        className="size-[50px] flex items-center justify-center bg-transparent border-none cursor-pointer hover:bg-[var(--color-bg-secondary)]"
      >
        <Image
          src="/images/icons/menu-dots.svg"
          alt="メニュー"
          width={24}
          height={24}
        />
      </button>
      <div className="w-px h-6 bg-[var(--color-border)]" />
      <Link
        href="/home"
        className="size-[50px] flex items-center justify-center hover:bg-[var(--color-bg-secondary)]"
      >
        <Home size={20} className="text-[var(--color-text-primary)]" />
      </Link>
    </div>
  );
}
