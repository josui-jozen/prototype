"use client";

import { Modal } from "@/app/_components/ui/Modal";
import { Check } from "lucide-react";
import Image from "next/image";

type MoodModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedMood: string | null;
  onMoodChange: (mood: string | null) => void;
};

const moods = [
  { id: "summer-night", label: "夏の夜" },
  { id: "river", label: "川" },
  { id: "bonfire", label: "焚き火" },
  { id: "rain", label: "雨" },
  { id: "snow", label: "雪" },
  { id: "spring-water", label: "湧き水" },
  { id: "beach", label: "砂浜" },
  { id: "forest", label: "森" },
  { id: "meditation", label: "瞑想" },
];

export function MoodModal({
  isOpen,
  onClose,
  selectedMood,
  onMoodChange,
}: MoodModalProps) {
  function handleSelect(moodId: string) {
    if (selectedMood === moodId) {
      onMoodChange(null);
    } else {
      onMoodChange(moodId);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-[16px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_10px_24px_-10px_rgba(0,0,0,0.12)] overflow-hidden w-[300px] max-h-[480px] overflow-y-auto">
        <div className="flex flex-col">
          {moods.map((mood) => {
            const isSelected = selectedMood === mood.id;
            return (
              <button
                key={mood.id}
                onClick={() => handleSelect(mood.id)}
                className={`flex items-center gap-[12px] px-[12px] py-[8px] border-none bg-transparent cursor-pointer transition-colors hover:bg-[var(--color-bg-secondary)] ${
                  isSelected ? "bg-[var(--color-bg-secondary)]" : ""
                }`}
              >
                <div className="relative size-[56px] rounded-[8px] overflow-hidden shrink-0 bg-[var(--color-bg-secondary)]">
                  <Image
                    src={`/images/moods/${mood.id}.jpg`}
                    alt={mood.label}
                    fill
                    className="object-cover"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-[8px]">
                      <Check size={20} className="text-white" />
                    </div>
                  )}
                </div>
                <span className="text-[14.5px] text-[var(--color-text-primary)]">
                  {mood.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
