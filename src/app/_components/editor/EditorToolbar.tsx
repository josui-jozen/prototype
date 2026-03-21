"use client";

import { useRef } from "react";
import { HelpCircle, Image, Clock, Music } from "lucide-react";

type EditorToolbarProps = {
  charCount: number;
  onGuideClick: () => void;
  onImageInsert: (file: File) => void;
  onVersionHistoryClick: () => void;
  onMoodClick: () => void;
  showGuideHint?: boolean;
};

export function EditorToolbar({
  charCount,
  onGuideClick,
  onImageInsert,
  onVersionHistoryClick,
  onMoodClick,
  showGuideHint,
}: EditorToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      onImageInsert(file);
      e.target.value = "";
    }
  }

  return (
    <div className="flex items-center justify-between px-[24px] py-[24px] shrink-0 border-t border-[var(--color-border)]">
      {/* 左: ガイド / 画像 / バージョン */}
      <div className="flex items-center gap-[2px]">
        <div className="relative">
          {showGuideHint && (
            <div className="absolute bottom-full left-0 mb-[4px]">
              <p className="text-[13.5px] text-[#8d9298] tracking-[0.483px] leading-[20px] whitespace-nowrap opacity-60 m-0">
                書き方はここから
              </p>
              {/* 手書き風矢印 */}
              <svg width="10" height="33" viewBox="0 0 10 33" fill="none" className="ml-[5px] opacity-40">
                <path d="M5 0C5 0 4 20 5 28M5 28C3 26 1 25 1 25M5 28C7 26 9 25 9 25" stroke="#8d9298" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
          )}
          <ToolbarButton onClick={onGuideClick} label="ガイド">
            <HelpCircle size={20} />
          </ToolbarButton>
        </div>
        <ToolbarButton onClick={handleImageClick} label="画像を挿入">
          <Image size={22} />
        </ToolbarButton>
        <ToolbarButton onClick={onVersionHistoryClick} label="バージョン履歴">
          <Clock size={22} />
        </ToolbarButton>
      </div>

      {/* 右: ムード / 文字数 */}
      <div className="flex items-center gap-[16px]">
        <button
          onClick={onMoodClick}
          className="flex items-center gap-[2px] h-[36px] px-[13px] rounded-full border border-[#e6e8e9] text-[14.5px] text-[var(--color-text-muted)] tracking-[0.483px] cursor-pointer bg-transparent hover:bg-[var(--color-bg-secondary)] transition-colors"
        >
          <Music size={16} />
          <span>ムード</span>
        </button>
        <div className="relative size-[36px] flex items-center justify-center">
          <svg viewBox="0 0 36 36" className="size-full absolute">
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="1"
            />
          </svg>
          <span className="text-[9.9px] text-[var(--color-text-muted)] tracking-[-0.25px] relative z-10">
            {charCount}
          </span>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

function ToolbarButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      className="flex items-center justify-center size-[36px] rounded-full text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)] transition-colors cursor-pointer bg-transparent border-none"
    >
      {children}
    </button>
  );
}
