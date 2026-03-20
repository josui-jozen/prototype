"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/app/_hooks/useAuth";

export function AuthorHomeLink({ authorId, authorName }: { authorId: string; authorName: string }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || user?.id !== authorId) return null;

  return (
    <div className="flex items-center justify-center pb-[48.3px]">
      <Link href="/home" className="flex items-center no-underline">
        <Image src="/images/icons/home.svg" alt="" width={18} height={18} className="mr-[8.05px]" />
        <span className="text-[14.9px] text-[var(--color-text-secondary)] tracking-[0.483px] leading-[26px]">
          {authorName}
        </span>
      </Link>
    </div>
  );
}
