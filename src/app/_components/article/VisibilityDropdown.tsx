"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArticleVisibility, VISIBILITY_LABELS } from "@/usecase/article/article.types";

const options: ArticleVisibility[] = ["private", "public"];

type Props = {
  value: ArticleVisibility;
  onChange?: (value: ArticleVisibility) => void;
};

export function VisibilityDropdown({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(v: ArticleVisibility) {
    setSelected(v);
    setIsOpen(false);
    onChange?.(v);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex shrink-0 items-center rounded-[12px] border border-[#e6e8e9] pl-2 pr-1 py-1.5 leading-[1.25] tracking-[0.025em] text-[0.84rem] text-[#798184] bg-transparent cursor-pointer transition-[0.25s]"
      >
        <span className="text-[13.5px] text-[var(--color-text-secondary)] tracking-[0.338px] leading-[16.91px] whitespace-nowrap">
          {VISIBILITY_LABELS[selected]}
        </span>
        <Image
          src="/images/icons/chevron-down.svg"
          alt=""
          width={16}
          height={16}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-[4px] bg-white rounded-[16.1px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_10px_24px_-10px_rgba(0,0,0,0.12)] overflow-hidden z-20 min-w-[180px] p-[6.04px]">
          <div className="flex flex-col gap-[2px]">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`flex items-center justify-between w-full px-[8.05px] py-[10.06px] rounded-[12.08px] border-none cursor-pointer bg-transparent ${
                  selected === opt
                    ? "hover:bg-[var(--color-bg-secondary)]"
                    : "hover:bg-[var(--color-bg-secondary)]"
                }`}
              >
                <span
                  className={`text-[15.3px] tracking-[0.483px] leading-[22.94px] whitespace-nowrap ${
                    selected === opt
                      ? "text-[var(--color-text-primary)]"
                      : "text-[var(--color-text-muted)]"
                  }`}
                >
                  {VISIBILITY_LABELS[opt]}
                </span>
                {selected === opt && (
                  <Image
                    src="/images/icons/check.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
