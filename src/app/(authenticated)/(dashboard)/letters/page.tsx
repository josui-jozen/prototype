"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Modal } from "@/app/_components/ui/Modal";
import { letterMockRepo } from "@/infrastructure/repository/letter/letter.mock";
import { Letter, LetterTab } from "@/usecase/letter/letter.types";

function formatDate(date: Date) {
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function LetterCard({
  letter,
  onClick,
}: {
  letter: Letter;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-transparent border-none p-0 cursor-pointer text-left"
    >
      <div className="relative">
        {/* Angled card effect */}
        <div
          className="bg-white border border-[var(--color-border)] rounded-xl p-6 shadow-[2px_4px_12px_-4px_rgba(0,0,0,0.08)] transform rotate-[-1deg] hover:rotate-0 transition-transform"
        >
          {/* Heart */}
          <div className="absolute top-3 right-4">
            <Heart
              size={18}
              className={
                letter.hearted
                  ? "text-red-500 fill-red-500"
                  : "text-[var(--color-text-muted)]"
              }
            />
          </div>

          {/* Stamp */}
          <div className="text-[28px] mb-3">{letter.stampEmoji}</div>

          {/* Message */}
          <p className="text-[14px] text-[var(--color-text-primary)] leading-relaxed m-0 mb-4 pr-6">
            {letter.message}
          </p>

          {/* Postmark line */}
          <div className="border-t border-dashed border-[var(--color-border)] pt-3 flex items-center gap-2">
            <div className="size-[28px] rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] shrink-0" />
            <span className="text-[13px] text-[var(--color-text-secondary)]">
              {letter.senderName}
            </span>
            <span className="text-[12px] text-[var(--color-text-muted)] ml-auto">
              {formatDate(letter.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Source */}
      <p className="text-[12px] text-[var(--color-text-muted)] mt-2 ml-1">
        「{letter.articleTitle}」から送信
      </p>
    </button>
  );
}

function LetterDetailModal({
  letter,
  isOpen,
  onClose,
}: {
  letter: Letter | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!letter) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-2xl p-8 max-w-[480px] w-[90vw] shadow-[var(--shadow-modal)]">
        {/* Heart */}
        <div className="flex justify-end mb-2">
          <Heart
            size={20}
            className={
              letter.hearted
                ? "text-red-500 fill-red-500"
                : "text-[var(--color-text-muted)]"
            }
          />
        </div>

        {/* Stamp */}
        <div className="text-[40px] mb-4">{letter.stampEmoji}</div>

        {/* Message */}
        <p className="text-[16px] text-[var(--color-text-primary)] leading-relaxed mb-6">
          {letter.message}
        </p>

        {/* Sender */}
        <div className="border-t border-dashed border-[var(--color-border)] pt-4 flex items-center gap-3">
          <div className="size-[36px] rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] shrink-0" />
          <div>
            <div className="text-[14px] text-[var(--color-text-primary)]">
              {letter.senderName}
            </div>
            <div className="text-[12px] text-[var(--color-text-muted)]">
              @{letter.senderHandle}
            </div>
          </div>
          <span className="text-[13px] text-[var(--color-text-muted)] ml-auto">
            {formatDate(letter.createdAt)}
          </span>
        </div>

        {/* Source */}
        <p className="text-[12px] text-[var(--color-text-muted)] mt-4 mb-0">
          「{letter.articleTitle}」から送信
        </p>
      </div>
    </Modal>
  );
}

export default function LettersPage() {
  const [tab, setTab] = useState<LetterTab>("received");
  const [receivedLetters, setReceivedLetters] = useState<Letter[]>([]);
  const [sentLetters, setSentLetters] = useState<Letter[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);

  useEffect(() => {
    letterMockRepo.findReceived().then(setReceivedLetters);
    letterMockRepo.findSent().then(setSentLetters);
  }, []);

  const letters = tab === "received" ? receivedLetters : sentLetters;

  return (
    <>
      <h1 className="text-[20px] font-bold text-[var(--color-text-primary)] mb-6">
        感想レター
      </h1>

      {/* Tabs */}
      <div className="flex border-b border-[var(--color-border)] mb-6">
        <button
          onClick={() => setTab("received")}
          className={`px-4 py-2.5 text-[14px] bg-transparent border-none cursor-pointer ${
            tab === "received"
              ? "text-[var(--color-text-primary)] border-b-2 border-b-[var(--color-text-primary)] font-medium -mb-px"
              : "text-[var(--color-text-muted)]"
          }`}
        >
          あなた宛
        </button>
        <button
          onClick={() => setTab("sent")}
          className={`px-4 py-2.5 text-[14px] bg-transparent border-none cursor-pointer ${
            tab === "sent"
              ? "text-[var(--color-text-primary)] border-b-2 border-b-[var(--color-text-primary)] font-medium -mb-px"
              : "text-[var(--color-text-muted)]"
          }`}
        >
          送った
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex items-center justify-between mb-6">
        <select className="text-[13px] text-[var(--color-text-secondary)] bg-transparent border border-[var(--color-border-button)] rounded-lg px-3 py-1.5 cursor-pointer">
          <option>すべて</option>
        </select>
        <button className="text-[13px] text-[var(--color-text-secondary)] bg-transparent border-none cursor-pointer p-0 hover:text-[var(--color-text-primary)]">
          設定
        </button>
      </div>

      {/* Letters list */}
      <div className="flex flex-col gap-6">
        {letters.map((letter) => (
          <LetterCard
            key={letter.id}
            letter={letter}
            onClick={() => setSelectedLetter(letter)}
          />
        ))}
      </div>

      {/* Hint box */}
      {tab === "received" && (
        <div className="mt-8 bg-[var(--color-bg-secondary)] rounded-xl p-5">
          <span className="inline-block text-[11px] text-white bg-emerald-500 rounded-full px-2.5 py-0.5 font-medium mb-2">
            ヒント
          </span>
          <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed m-0">
            レターに
            <Heart
              size={12}
              className="inline text-red-500 fill-red-500 mx-0.5"
            />
            をつけると、送信者にお気持ちが伝わります。匿名で送られたレターでもハートは届きます。
          </p>
        </div>
      )}

      {/* Detail modal */}
      <LetterDetailModal
        letter={selectedLetter}
        isOpen={!!selectedLetter}
        onClose={() => setSelectedLetter(null)}
      />
    </>
  );
}
