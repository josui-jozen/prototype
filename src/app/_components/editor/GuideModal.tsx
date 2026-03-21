"use client";

import { useState } from "react";
import { Modal } from "@/app/_components/ui/Modal";
import { Eye } from "lucide-react";

type GuideModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const shortcuts = [
  { symbol: "##", label: "見出し" },
  { symbol: "###", label: "小見出し" },
  { symbol: "-", label: "リスト" },
  { symbol: "1.", label: "番号付きリスト" },
  { symbol: ">", label: "引用" },
  { symbol: "---", label: "区切り線" },
  { symbol: null, label: "リンク", keys: ["⌘", "K"] },
  { symbol: null, label: "強調", keys: ["⌘", "B"] },
  { symbol: null, label: "｜ルビ《るび》", keys: ["⌘", "Shift", "|"] },
  { symbol: null, label: "取り消す", keys: ["⌘", "Z"] },
  { symbol: null, label: "やり直す", keys: ["⌘", "Shift", "Z"] },
];

export function GuideModal({ isOpen, onClose }: GuideModalProps) {
  const [showDesc, setShowDesc] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-[16px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_10px_24px_-10px_rgba(0,0,0,0.12)] overflow-hidden w-[246px]">
        {/* ヘッダー */}
        <div className="flex items-center justify-between bg-[var(--color-bg-secondary)] border-b border-[#f1f6f9] px-[14px] pt-[10px] pb-[13px]">
          <span className="text-[14.5px] tracking-[0.483px] text-[var(--color-text-primary)]">
            操作一覧
          </span>
          <button
            onClick={() => setShowDesc(!showDesc)}
            className="flex items-center gap-[2px] px-[11px] py-[9px] rounded-full border border-[#d8dadf] bg-white text-[12.9px] text-[var(--color-text-primary)] tracking-[0.483px] cursor-pointer"
          >
            <Eye size={16} className="text-[var(--color-text-secondary)]" />
            <span>説明を表示</span>
          </button>
        </div>

        {/* ショートカット一覧 */}
        <div className="flex flex-col gap-[2px] px-[14px] py-[12px]">
          {shortcuts.map((item, i) => (
            <div
              key={i}
              className="flex items-center h-[36px]"
            >
              {item.symbol && (
                <span className="text-[14.3px] text-[var(--color-link-underline,#a7abb1)] pr-[4px] font-[SF_Pro,sans-serif]">
                  {item.symbol}
                </span>
              )}
              <span className="text-[14.5px] text-[var(--color-text-primary)]">
                {item.label}
              </span>
              {item.keys && (
                <div className="flex items-center pl-[10px] gap-[4px]">
                  {item.keys.map((key, j) => (
                    <span key={j}>
                      {j > 0 && (
                        <span className="text-[14.5px] text-[var(--color-text-muted)] px-[4px]">
                          +
                        </span>
                      )}
                      <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-[4px] bg-[#ebeef2] rounded-[8px] text-[11px] text-[var(--color-text-secondary)] text-center">
                        {key}
                      </span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
