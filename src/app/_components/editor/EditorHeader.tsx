"use client";

import Link from "next/link";
import { X, Check, Tag, Globe, Lock } from "lucide-react";
import { ArticleVisibility, VISIBILITY_LABELS } from "@/usecase/article/article.types";
import { VisibilityDropdown } from "@/app/_components/article/VisibilityDropdown";

type SaveStatus = "saved" | "saving" | "unsaved";

type EditorHeaderProps = {
  saveStatus: SaveStatus;
  visibility: ArticleVisibility;
  onVisibilityChange: (v: ArticleVisibility) => void;
  onTagClick: () => void;
};

export function EditorHeader({
  saveStatus,
  visibility,
  onVisibilityChange,
  onTagClick,
}: EditorHeaderProps) {
  return (
    <header className="flex items-center justify-between h-[56px] px-[14px] shrink-0">
      {/* 左: 戻るボタン */}
      <div className="w-[412px]">
        <Link
          href="/home"
          className="inline-flex items-center justify-center rounded-full size-[32px] hover:bg-[var(--color-bg-secondary)] transition-colors"
        >
          <X size={20} className="text-[var(--color-text-muted)]" />
        </Link>
      </div>

      {/* 中央: 保存状態 */}
      <div className="flex items-center justify-center">
        <div
          className={`flex items-center gap-[4px] h-[32px] px-[14px] rounded-full text-[12.9px] tracking-[0.483px] ${
            saveStatus === "saved"
              ? "bg-[rgba(104,115,120,0.6)] text-white backdrop-blur-sm"
              : saveStatus === "saving"
              ? "bg-[rgba(104,115,120,0.4)] text-white/70 backdrop-blur-sm"
              : "bg-transparent text-[var(--color-text-muted)]"
          }`}
        >
          {saveStatus === "saved" && <Check size={14} />}
          <span>
            {saveStatus === "saved"
              ? "保存済み"
              : saveStatus === "saving"
              ? "保存中..."
              : "未保存"}
          </span>
        </div>
      </div>

      {/* 右: タグ + 公開範囲 */}
      <div className="flex items-center gap-[8px] justify-end w-[412px]">
        <button
          onClick={onTagClick}
          className="flex items-center gap-[2px] px-[10px] py-[7.5px] rounded-full text-[15.3px] text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)] transition-colors cursor-pointer bg-transparent border-none"
        >
          <Tag size={18} />
          <span>タグ</span>
        </button>
        <VisibilityDropdown
          value={visibility}
          onChange={onVisibilityChange}
        />
      </div>
    </header>
  );
}
