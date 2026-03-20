"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/_hooks/useAuth";

function NavLinks() {
  return (
    <div className="flex gap-6 sm:gap-24">
      <nav className="flex flex-col gap-4 pt-1">
        <Link href="/home" className="text-[15.3px] text-[var(--color-text-secondary)] tracking-[0.483px] leading-6.5 no-underline hover:text-[var(--color-text-primary)]">
          ホーム
        </Link>
        <Link href="/about" className="text-[15.3px] text-[var(--color-text-secondary)] tracking-[0.483px] leading-6.5 no-underline hover:text-[var(--color-text-primary)]">
          使い方
        </Link>
        <Link href="#" className="text-[15.3px] text-[var(--color-text-secondary)] tracking-[0.483px] leading-6.5 no-underline hover:text-[var(--color-text-primary)]">
          スポンサー
        </Link>
      </nav>
      <nav className="flex flex-col gap-4 pt-1">
        <Link href="#" className="text-[15.3px] text-[var(--color-text-secondary)] tracking-[0.483px] leading-6.5 no-underline hover:text-[var(--color-text-primary)]">
          規約とポリシー
        </Link>
        <Link href="#" className="text-[15.3px] text-[var(--color-text-secondary)] tracking-[0.483px] leading-6.5 no-underline hover:text-[var(--color-text-primary)]">
          サポート
        </Link>
      </nav>
    </div>
  );
}

export function Footer() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <footer className="bg-[var(--color-bg-secondary)] w-full py-14">
      <div className="flex flex-col gap-11 sm:flex-row sm:gap-[44.27px] items-start w-full max-w-223.5 px-6 sm:px-10 mx-auto">
        {isAuthenticated ? (
          <>
            {/* Authenticated: Avatar + Username + Logout */}
            <div className="flex-1 min-w-0 flex items-center">
              <Link href="/home" className="flex items-center gap-2.5 no-underline">
                <div className="size-7 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] shrink-0" />
                <span className="text-[14.5px] text-[var(--color-text-secondary)] tracking-[0.483px]">
                  {user?.name}
                </span>
              </Link>
              <span className="text-[14.5px] text-[#babec5] mx-1.5">·</span>
              <button
                onClick={logout}
                className="text-[14.5px] text-[var(--color-text-secondary)] bg-transparent border-none cursor-pointer p-0"
              >
                ログアウト
              </button>
            </div>
            <NavLinks />
          </>
        ) : (
          <>
            {/* Public: Logo + Description + Login */}
            <div className="flex-1 min-w-0">
              <Link href="/" className="flex items-center gap-[8.05px] no-underline">
                <Image
                  src="/images/logo-small.svg"
                  alt="しずかなインターネット"
                  width={28}
                  height={35}
                />
                <span className="text-[16.1px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[27.37px]">
                  しずかなインターネット
                </span>
              </Link>
              <div className="mt-[13.49px]">
                <p className="text-[14.5px] text-[var(--color-text-link)] tracking-[0.725px] leading-[26.81px] m-0">
                  日記やエッセイにちょうどいい
                </p>
                <p className="text-[14.5px] text-[var(--color-text-link)] tracking-[0.725px] leading-[26.81px] m-0">
                  文章書き散らしサービス
                </p>
              </div>
              <button className="mt-[18.24px] border border-[var(--color-border-button)] rounded-full px-[25.15px] py-[11.063px] bg-transparent cursor-pointer">
                <span className="text-[15.3px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[16.82px]">
                  ログイン
                </span>
              </button>
            </div>
            <NavLinks />
          </>
        )}
      </div>
    </footer>
  );
}
