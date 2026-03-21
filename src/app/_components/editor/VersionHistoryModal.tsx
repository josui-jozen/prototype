"use client";

import { Modal } from "@/app/_components/ui/Modal";
import { FileText } from "lucide-react";

type VersionHistoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type Version = {
  time: string;
};

type VersionGroup = {
  date: string;
  versions: Version[];
};

const mockVersionGroups: VersionGroup[] = [
  {
    date: "2026/3/20",
    versions: [{ time: "16:24" }, { time: "14:08" }, { time: "11:32" }],
  },
  {
    date: "2026/2/26",
    versions: [{ time: "22:15" }, { time: "19:47" }],
  },
  {
    date: "2025/11/25",
    versions: [{ time: "09:03" }],
  },
];

export function VersionHistoryModal({
  isOpen,
  onClose,
}: VersionHistoryModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-[16px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_10px_24px_-10px_rgba(0,0,0,0.12)] overflow-hidden w-[600px] max-h-[500px] flex">
        {/* Left panel: Timeline */}
        <div className="w-[240px] border-r border-[#ebeef2] overflow-y-auto p-[16px]">
          <h3 className="text-[14.5px] text-[var(--color-text-primary)] tracking-[0.483px] mb-[16px] font-normal">
            バージョン履歴
          </h3>

          <div className="flex flex-col gap-[16px]">
            {mockVersionGroups.map((group) => (
              <div key={group.date}>
                <div className="text-[12px] text-[var(--color-text-muted)] mb-[8px]">
                  {group.date}
                </div>
                <div className="relative pl-[20px]">
                  {/* Timeline line */}
                  <div className="absolute left-[7px] top-[8px] bottom-[8px] w-[1px] bg-[#ebeef2]" />

                  <div className="flex flex-col gap-[4px]">
                    {group.versions.map((version, i) => (
                      <button
                        key={`${group.date}-${i}`}
                        className="relative flex items-center gap-[8px] h-[32px] bg-transparent border-none cursor-pointer rounded-[8px] px-[8px] hover:bg-[var(--color-bg-secondary)] transition-colors text-left"
                      >
                        {/* Timeline dot */}
                        <div className="absolute left-[-13px] top-1/2 -translate-y-1/2 size-[7px] rounded-full bg-[#d8dadf]" />
                        <FileText
                          size={14}
                          className="text-[var(--color-text-muted)] shrink-0"
                        />
                        <span className="text-[13px] text-[var(--color-text-primary)]">
                          {version.time}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel: Description */}
        <div className="flex-1 p-[24px] flex flex-col items-center justify-center text-center">
          <h3 className="text-[14.5px] text-[var(--color-text-primary)] tracking-[0.483px] mb-[12px] font-normal">
            バージョンを選択
          </h3>
          <p className="text-[13px] text-[var(--color-text-muted)] leading-[1.8] max-w-[260px]">
            記事は100文字以上の状態で保存するたびに、そのときのバージョンが保持されます（過去10件、スポンサーは100件）。
          </p>
        </div>
      </div>
    </Modal>
  );
}
