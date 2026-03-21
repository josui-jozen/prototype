"use client";

import { useState } from "react";
import { Modal } from "@/app/_components/ui/Modal";
import { X } from "lucide-react";

type TagModalProps = {
  isOpen: boolean;
  onClose: () => void;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
};

export function TagModal({ isOpen, onClose, tags, onTagsChange }: TagModalProps) {
  const [inputValue, setInputValue] = useState("");

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (!tags.includes(newTag)) {
        onTagsChange([...tags, newTag]);
      }
      setInputValue("");
    }
  }

  function handleRemoveTag(tagToRemove: string) {
    onTagsChange(tags.filter((t) => t !== tagToRemove));
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-[16px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_10px_24px_-10px_rgba(0,0,0,0.12)] overflow-hidden w-[340px]">
        {/* Input */}
        <div className="bg-[#f7fafc] border-b border-[#ebeef2]">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="タグを追加"
            className="w-full px-[16px] py-[14px] bg-transparent border-none outline-none text-[14.5px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
          />
        </div>

        {/* Tags / Empty state */}
        <div className="px-[16px] py-[16px] min-h-[80px]">
          {tags.length === 0 ? (
            <p className="text-[13px] text-[var(--color-text-muted)]">
              最初のタグを作成しましょう。
            </p>
          ) : (
            <div className="flex flex-wrap gap-[8px]">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-[4px] px-[10px] py-[5px] rounded-full bg-[var(--color-bg-secondary)] text-[13px] text-[var(--color-text-primary)]"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="flex items-center justify-center size-[16px] rounded-full bg-transparent border-none cursor-pointer text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
