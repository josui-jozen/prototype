"use client";

import { motion } from "framer-motion";
import { AnimatedCartDeliveryMini } from "@/components/ui/animated-cart-delivery";
import { AnimatedDeliveryCharacter } from "@/components/ui/animated-delivery-character";
import { AnimatedRestingCharacter } from "@/components/ui/animated-resting-character";

function StreetScene() {
  return (
    <div className="relative -mx-6 h-20 bg-[#F5F0E8]">
      {/* 寝てるキャラ — 固定（最背面） */}
      <div className="absolute bottom-0 right-6 w-10 h-9 z-0">
        <AnimatedRestingCharacter />
      </div>

      {/* 手紙運びキャラ1 */}
      <motion.div
        className="absolute bottom-0 left-0 w-16 h-14 z-10"
        style={{ scaleX: -1 }}
        initial={{ x: "-100%" }}
        animate={{ x: "calc(100vw)" }}
        transition={{ duration: 11, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 3 }}
      >
        <AnimatedDeliveryCharacter />
      </motion.div>

      {/* 手紙運びキャラ2 */}
      <motion.div
        className="absolute bottom-0 left-0 w-16 h-14 z-10"
        style={{ scaleX: -1 }}
        initial={{ x: "-100%" }}
        animate={{ x: "calc(100vw)" }}
        transition={{ duration: 9, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 8 }}
      >
        <AnimatedDeliveryCharacter />
      </motion.div>

      {/* 荷車キャラ1 */}
      <motion.div
        className="absolute -bottom-2 right-0 w-16 h-14 z-20"
        initial={{ x: "100%" }}
        animate={{ x: "calc(-100vw)" }}
        transition={{ duration: 7, repeat: Infinity, repeatType: "loop", ease: "linear" }}
      >
        <AnimatedCartDeliveryMini />
      </motion.div>

      {/* 荷車キャラ2 */}
      <motion.div
        className="absolute -bottom-2 right-0 w-16 h-14 z-20"
        initial={{ x: "100%" }}
        animate={{ x: "calc(-100vw)" }}
        transition={{ duration: 9, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 3 }}
      >
        <AnimatedCartDeliveryMini />
      </motion.div>
    </div>
  );
}

type LetterStatus = "delivering" | "delivered" | "read" | "reacted";

type Letter = {
  id: string;
  preview: string;
  date: string;
  status: LetterStatus;
};

const STATUS_LABEL: Record<LetterStatus, string> = {
  delivering: "むすびが運んでいます",
  delivered: "誰かのもとに届きました",
  read: "誰かが読みました",
  reacted: "誰かがリアクションしてくれました",
};

const STATUS_COLOR: Record<LetterStatus, string> = {
  delivering: "text-muted/60",
  delivered: "text-muted",
  read: "text-blue-600",
  reacted: "text-accent",
};

const MOCK_LETTERS: Letter[] = [
  {
    id: "1",
    preview: "今日、帰り道にふと空を見上げたら...",
    date: "3月24日",
    status: "reacted",
  },
  {
    id: "2",
    preview: "最近ずっと考えていることがあって...",
    date: "3月22日",
    status: "read",
  },
  {
    id: "3",
    preview: "子供の頃に好きだった場所のことを思い出した...",
    date: "3月20日",
    status: "delivered",
  },
  {
    id: "4",
    preview: "雨の音を聞きながらぼんやりしてた...",
    date: "3月18日",
    status: "delivering",
  },
];

export function LetterBoxScreen() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <div className="space-y-1">
          <h1 className="text-xl font-bold">便箋</h1>
          <p className="text-sm text-muted">あなたの日記のゆくえ</p>
        </div>
        <StreetScene />
      </div>

      {/* Letter List */}
      <div className="space-y-3">
        {MOCK_LETTERS.map((letter) => (
          <div
            key={letter.id}
            className="bg-card rounded-2xl p-4 shadow-sm border border-muted/20 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">{letter.date}</span>
              <span className={`text-xs font-medium ${STATUS_COLOR[letter.status]}`}>
                {STATUS_LABEL[letter.status]}
              </span>
            </div>
            <p className="text-sm truncate">{letter.preview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

