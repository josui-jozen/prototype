import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--color-bg-secondary)] w-full py-[56.35px]">
      <div className="flex flex-col gap-11 sm:flex-row sm:gap-[44.27px] items-start w-full max-w-5xl px-6 mx-auto">
        {/* Left: Logo + Description + Login */}
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

        {/* Right: Nav Links */}
        <div className="flex gap-[96.6px]">
          <nav className="flex flex-col gap-[16.1px] pt-[4.025px]">
            <Link href="/" className="text-[15.3px] text-[var(--color-text-link)] tracking-[0.483px] leading-[26px] no-underline">
              ホーム
            </Link>
            <Link href="/about" className="text-[15.3px] text-[var(--color-text-link)] tracking-[0.483px] leading-[26px] no-underline">
              使い方
            </Link>
            <Link href="#" className="text-[15.3px] text-[var(--color-text-link)] tracking-[0.483px] leading-[26px] no-underline">
              スポンサー
            </Link>
          </nav>
          <nav className="flex flex-col gap-[16.09px] pt-[4.025px]">
            <Link href="#" className="text-[15.3px] text-[var(--color-text-link)] tracking-[0.483px] leading-[26px] no-underline">
              規約とポリシー
            </Link>
            <Link href="#" className="text-[15.3px] text-[var(--color-text-link)] tracking-[0.483px] leading-[26px] no-underline">
              サポート
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
