"use client";

import { useState } from "react";
import Image from "next/image";
import { MenuModal } from "@/app/_components/editor/MenuModal";

export function FloatingMenuButton() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMenuOpen(true)}
        className="fixed bottom-[56px] left-[64px] size-[58px] bg-white rounded-full shadow-[0px_0px_0px_1px_rgba(0,0,0,0.09),0px_3px_8px_-3px_rgba(0,0,0,0.08)] flex items-center justify-center z-10 border-none cursor-pointer"
      >
        <Image src="/images/icons/menu-dots.svg" alt="メニュー" width={28} height={28} />
      </button>
      <MenuModal isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
