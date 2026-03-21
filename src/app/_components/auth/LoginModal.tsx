"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Modal } from "@/app/_components/ui/Modal";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter();

  function handleLogin() {
    router.push("/home");
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white flex flex-col items-start overflow-hidden rounded-[var(--radius-modal)] shadow-[var(--shadow-modal)] w-[400px] max-w-[90vw] px-[32.2px] pt-[48.29px] pb-[48.3px]">
        <div className="flex flex-col gap-[20.1px] items-start w-full">
          {/* Logo + Title */}
          <div className="flex flex-col items-center w-full">
            <Image
              src="/images/logo.svg"
              alt=""
              width={56}
              height={71}
            />
            <div className="pt-[10.063px]">
              <p className="text-[20.3px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[34.49px] m-0">
                しずかなインターネット
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="w-full">
            <p className="text-[15.3px] text-[var(--color-text-secondary)] tracking-[0.483px] leading-[28.3px] m-0">
              日記やエッセイを書くのにちょうどいい、文章
            </p>
            <p className="text-[15.3px] text-[var(--color-text-secondary)] tracking-[0.483px] leading-[28.3px] m-0">
              書き散らしサービスです。
            </p>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleLogin}
            className="bg-white border border-[var(--color-border-button)] rounded-full flex gap-[7.64px] items-center justify-center w-full py-[15.087px] px-[48.3px] cursor-pointer hover:bg-[var(--color-bg-secondary)] transition-colors"
          >
            <Image
              src="/images/google.svg"
              alt=""
              width={18}
              height={18}
            />
            <span className="text-[15.3px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[16.82px]">
              Googleアカウントでログイン
            </span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
