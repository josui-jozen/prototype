"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MusubiButton } from "@/components/ui/musubi-button";
import { AnimatedDeliveryCharacter } from "@/components/ui/animated-delivery-character";

type DiaryEntry = {
  id: string;
  text: string;
  date: string;
};

const MOCK_DIARIES: DiaryEntry[] = [
  {
    id: "1",
    text: "今日、帰り道にふと空を見上げたら、夕焼けがすごく綺麗だった。なんでもない日なのに、なんだか泣きそうになった。",
    date: "3月25日",
  },
  {
    id: "2",
    text: "最近ずっと考えていることがあって、でもうまく言葉にできない。こうやって書いてみると少しだけ整理される気がする。",
    date: "3月22日",
  },
  {
    id: "3",
    text: "子供の頃に好きだった場所のことを思い出した。あの公園のベンチ、まだあるのかな。",
    date: "3月20日",
  },
];

type Screen = "list" | "menu" | "write";

export function DiaryScreen({
  onFullscreenChange,
}: {
  onFullscreenChange: (fullscreen: boolean) => void;
}) {
  const [screen, setScreen] = useState<Screen>("list");

  useEffect(() => {
    onFullscreenChange(screen === "write");
  }, [screen, onFullscreenChange]);

  if (screen === "write") {
    return <WriteScreen onBack={() => setScreen("list")} />;
  }

  return (
    <div className="p-6 space-y-6 relative min-h-full">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold">日記</h1>
        <p className="text-sm text-muted">あなたの綴った言葉たち</p>
      </div>

      {/* Diary List */}
      <div className="space-y-3">
        {MOCK_DIARIES.map((diary) => (
          <div
            key={diary.id}
            className="bg-card rounded-2xl p-4 shadow-sm border border-muted/20 space-y-2"
          >
            <span className="text-xs text-muted">{diary.date}</span>
            <p className="text-sm leading-relaxed line-clamp-3">{diary.text}</p>
          </div>
        ))}
      </div>

      {/* FAB + Menu */}
      <div className="fixed bottom-24 right-6 max-w-md flex flex-col items-end gap-2">
        {screen === "menu" && (
          <div className="bg-card rounded-2xl shadow-lg border border-muted/20 overflow-hidden">
            <button
              onClick={() => setScreen("write")}
              className="w-full px-5 py-3 text-sm text-left hover:bg-muted/5 transition-colors flex items-center gap-3"
            >
              <span>✏️</span>
              <span>文字で書く</span>
            </button>
            <div className="border-t border-muted/10" />
            <button className="w-full px-5 py-3 text-sm text-left hover:bg-muted/5 transition-colors flex items-center gap-3">
              <span>📷</span>
              <span>写真で読み込む</span>
            </button>
          </div>
        )}
        <button
          onClick={() => setScreen(screen === "menu" ? "list" : "menu")}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl text-white transition-all ${
            screen === "menu"
              ? "bg-muted rotate-45"
              : "bg-accent hover:opacity-90"
          }`}
        >
          +
        </button>
      </div>

      {/* Overlay to close menu */}
      {screen === "menu" && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setScreen("list")}
        />
      )}
    </div>
  );
}

const SUGGESTIONS = [
  "最近、ふとした瞬間に思い出すこと",
  "子供の頃に好きだった場所",
  "誰かに言いたいけど言えなかったこと",
  "今日いちばん心が動いた瞬間",
  "最近ほっとしたこと",
];

type SubmitPhase = "saving" | "done" | null;

function SubmitOverlay({
  phase,
  onComplete,
}: {
  phase: SubmitPhase;
  onComplete: () => void;
}) {
  useEffect(() => {
    if (phase === "done") {
      const timer = setTimeout(onComplete, 2500);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  if (!phase) return null;

  return (
    <div className="fixed inset-0 z-60 flex flex-col items-center justify-start pt-[10vh] bg-black/50 overflow-hidden">
      {/* キャラ（大きく表示） */}
      <motion.div
        className="w-48 h-48"
        style={{ scaleX: -1 }}
        animate={
          phase === "done"
            ? { x: [0, -40, 500], opacity: [1, 1, 0], scaleX: -1 }
            : { x: 0, opacity: 1, scaleX: -1 }
        }
        transition={
          phase === "done"
            ? { duration: 1.2, delay: 0.5, times: [0, 0.2, 1], ease: [0.2, 0, 0.6, 1] }
            : { duration: 0.3 }
        }
      >
        <AnimatedDeliveryCharacter />
      </motion.div>

      {/* メッセージ（下） */}
      <AnimatePresence mode="wait">
        <motion.p
          key={phase}
          className="mt-6 text-base font-medium text-white text-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {phase === "saving" ? "保存中..." : "保存完了"}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function WriteScreen({ onBack }: { onBack: () => void }) {
  const [text, setText] = useState("");
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [submitPhase, setSubmitPhase] = useState<SubmitPhase>(null);

  const handleSubmit = () => {
    setSubmitPhase("saving");
    // 保存処理のシミュレーション
    setTimeout(() => {
      setSubmitPhase("done");
    }, 2000);
  };

  const handleSubmitComplete = () => {
    setSubmitPhase(null);
    onBack();
  };

  const handleMusubiClick = () => {
    const random =
      SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)];
    setSuggestion(random);
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 shrink-0">
        <button
          onClick={onBack}
          className="text-muted hover:text-foreground transition-colors text-lg"
        >
          ←
        </button>
        <h1 className="text-lg font-bold">日記を書く</h1>
        <div className="flex-1" />
        <button
          disabled={text.length === 0 || submitPhase !== null}
          onClick={handleSubmit}
          className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors bg-foreground text-background disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90"
        >
          託す
        </button>
      </div>

      {/* Musubi + Suggestion */}
      <div className="px-4 pb-2 shrink-0">
        <div className="flex items-end justify-between mb-1">
          <p className="text-xs text-muted">
            おもいつかない時はムスビに聞いてみましょう
          </p>
          <MusubiButton size={56} onClick={handleMusubiClick} />
        </div>
        {suggestion && (
          <div className="bg-card rounded-2xl p-3 shadow-sm border border-muted/20 w-full text-center">
            <p className="text-sm font-medium text-accent">
              「{suggestion}」
            </p>
            <button
              onClick={handleMusubiClick}
              className="text-xs text-muted mt-1 hover:text-foreground transition-colors"
            >
              別のお題を聞く
            </button>
          </div>
        )}
      </div>

      {/* Text Area - fills remaining space */}
      <div className="flex-1 px-4 pb-2 min-h-0">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setKeyboardOpen(true)}
          placeholder="今日あったこと、感じたこと..."
          className="w-full h-full bg-transparent text-sm leading-relaxed resize-none focus:outline-none placeholder:text-muted/60"
        />
      </div>

      {/* Character count */}
      <div className="px-4 py-1 shrink-0 flex justify-end">
        <span className="text-xs text-muted">{text.length} 文字</span>
      </div>

      {/* Keyboard */}
      <div
        className={`shrink-0 transition-all duration-300 ease-out overflow-hidden ${
          keyboardOpen ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className="bg-[#D1D3D9] px-1 pt-2 pb-4">
          {/* Row 1 */}
          <div className="flex gap-1 mb-1">
            <KeyButton label="☆123" gray wide />
            <KeyButton label="あ" />
            <KeyButton label="か" />
            <KeyButton label="さ" />
            <KeyButton label="⌫" gray wide />
          </div>
          {/* Row 2 */}
          <div className="flex gap-1 mb-1">
            <KeyButton label="ABC" gray wide />
            <KeyButton label="た" />
            <KeyButton label="な" />
            <KeyButton label="は" />
            <KeyButton label="空白" gray wide />
          </div>
          {/* Row 3 */}
          <div className="flex gap-1 mb-1">
            <KeyButton label="あいう" gray wide tall />
            <KeyButton label="ま" />
            <KeyButton label="や" />
            <KeyButton label="ら" />
            <KeyButton label="改行" gray wide tall />
          </div>
          {/* Row 4 */}
          <div className="flex gap-1 mb-1">
            <div className="flex-[1.2]" />
            <KeyButton label="^^" />
            <KeyButton label="わ" />
            <KeyButton label="、。?!" />
            <div className="flex-[1.2]" />
          </div>
          {/* Bottom bar */}
          <div className="flex justify-between px-3 pt-2">
            <span className="text-lg">😊</span>
            <span className="text-lg">🎤</span>
          </div>
        </div>
      </div>

      {/* 投稿オーバーレイ */}
      <SubmitOverlay phase={submitPhase} onComplete={handleSubmitComplete} />
    </div>
  );
}

function KeyButton({
  label,
  gray,
  wide,
  tall,
}: {
  label: string;
  gray?: boolean;
  wide?: boolean;
  tall?: boolean;
}) {
  return (
    <button
      className={`rounded-md text-sm font-medium shadow-sm flex items-center justify-center ${
        gray ? "bg-[#AEB3BE] text-black" : "bg-white text-black"
      } ${wide ? "flex-[1.2]" : "flex-1"} ${tall ? "h-22" : "h-11"}`}
    >
      {label}
    </button>
  );
}
