"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Mail, Rss, Settings } from "lucide-react";

type MenuModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const menuItems = [
  {
    label: "自分のページへ",
    href: "/home",
    icon: null, // avatar
  },
  {
    label: "執筆ダッシュボード",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "感想レター",
    href: "/letters",
    icon: Mail,
  },
  {
    label: "購読中",
    href: "/subscriptions",
    icon: Rss,
  },
  {
    label: "設定",
    href: "/settings",
    icon: Settings,
  },
];

export function MenuModal({ isOpen, onClose }: MenuModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          className="fixed left-[24px] bottom-[80px] z-50 w-[264px] bg-white rounded-[25px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_10px_24px_-10px_rgba(0,0,0,0.12)]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.15 }}
        >
          <div className="flex flex-col p-[12px] gap-[2px]">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center h-[50px] px-[11px] rounded-[16px] hover:bg-[var(--color-bg-secondary)] transition-colors no-underline"
              >
                <div className="flex items-center justify-center w-[38.63px] shrink-0">
                  {item.icon ? (
                    <item.icon
                      size={20}
                      className="text-[var(--color-text-secondary)]"
                    />
                  ) : (
                    <div className="size-[28px] rounded-full bg-[var(--color-bg-secondary)]" />
                  )}
                </div>
                <span className="text-[17px] text-[var(--color-text-primary)] font-[Hiragino_Sans,sans-serif]">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="px-[12px] pb-[12px]">
            <button
              onClick={onClose}
              className="flex items-center justify-center w-full h-[45px] rounded-[16px] border border-[#ebeef2] bg-transparent text-[16px] text-[#798184] cursor-pointer hover:bg-[var(--color-bg-secondary)] transition-colors"
            >
              閉じる
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
