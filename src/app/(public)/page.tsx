"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/app/_components/layout/Footer";
import { LoginModal } from "@/app/_components/auth/LoginModal";

export default function LandingPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="bg-white flex flex-col items-start min-h-screen">
      <div className="flex flex-col gap-[40.26px] items-center w-full pt-[96.59px]">
        {/* Hero Section */}
        <div className="flex flex-col gap-[64.4px] items-start w-[603.5px] max-w-full px-4 mx-auto">
          {/* Header: Logo + Title + Button */}
          <div className="flex flex-col items-center w-full">
            <Image
              src="/images/logo.svg"
              alt="しずかなインターネット"
              width={80}
              height={101}
              priority
            />
            <div className="pt-[20.125px]">
              <h1 className="text-[20.3px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[34.49px] font-normal m-0">
                しずかなインターネット
              </h1>
            </div>
            <div className="pt-[24.15px]">
              <button
                onClick={() => setIsLoginOpen(true)}
                className="bg-white border border-[var(--color-border-button)] rounded-full px-[25.15px] py-[15.087px] cursor-pointer"
              >
                <span className="text-[17.1px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[18.77px]">
                  はじめる
                </span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="w-full">
            <p className="text-[17.1px] text-[var(--color-text-primary)] tracking-[0.427px] leading-[35.84px] m-0">
              しずかなインターネットは、日記やエッセイを書くのにちょうどいい、文章書き散らしサービスです。
            </p>
            <p className="text-[17.1px] text-[var(--color-text-primary)] tracking-[0.427px] leading-[35.84px] m-0 mt-[27.16px]">
              ここでは有益な情報を書くことはあまり求められていません。「たくさんの人に読まれなくていい」「自分のために、ひょっとすると、どこかの誰かのために」そんな気楽さで文章を書くための場所です。
            </p>
            <div className="mt-[28.33px]">
              <Link
                href="/about"
                className="flex items-center gap-[4.03px] no-underline"
              >
                <span className="text-[17.1px] text-[var(--color-text-link)] tracking-[0.427px] leading-[35.84px] underline decoration-dotted decoration-[var(--color-link-underline)]">
                  できることを見る
                </span>
                <Image
                  src="/images/arrow-right.svg"
                  alt=""
                  width={18}
                  height={18}
                />
              </Link>
            </div>
          </div>

          {/* CTA Card */}
          <div className="border border-[var(--color-border)] rounded-[var(--radius-modal)] flex items-end px-[33.2px] pt-[32.48px] pb-[33.19px] w-full">
            <div className="flex-1">
              <p className="text-[17.1px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[31.57px] m-0">
                騒がしいインターネットの片隅に
              </p>
              <p className="text-[17.1px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[31.57px] m-0">
                あなたの静かな場所を作りましょう
              </p>
              <button
                onClick={() => setIsLoginOpen(true)}
                className="mt-[20.12px] bg-white border border-[var(--color-border-button)] rounded-full px-[25.15px] py-[15.087px] cursor-pointer"
              >
                <span className="text-[17.1px] text-[var(--color-text-primary)] tracking-[0.853px] leading-[18.77px]">
                  はじめる
                </span>
              </button>
            </div>
            <div className="w-[144.9px] h-[188.99px] shrink-0 ml-4">
              <Image
                src="/images/sl-find-a-way.svg"
                alt=""
                width={145}
                height={189}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}
