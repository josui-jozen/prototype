import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const PROMPTS = [
  "最近、ふとした瞬間に思い出すこと",
  "子供の頃に好きだった場所",
  "今の自分にかけてあげたい言葉",
  "誰かに話したいけど、話せていないこと",
  "今日、一番心が動いた瞬間",
];

const MUSUBI_SVG = (
  <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-sm" xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <path d="M 15 55 C 15 25, 85 25, 85 55 C 85 85, 15 85, 15 55 Z" fill="var(--app-musubi)" stroke="var(--app-text)" strokeWidth="2.5" />
    {/* Ahoge */}
    <path d="M 50 25 Q 55 10, 65 15" fill="none" stroke="var(--app-text)" strokeWidth="2" strokeLinecap="round" />
    {/* Eyes */}
    <path d="M 33 50 C 37 47, 43 50, 41 55" fill="none" stroke="var(--app-text)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 67 50 C 63 47, 57 50, 59 55" fill="none" stroke="var(--app-text)" strokeWidth="2.5" strokeLinecap="round" />
    {/* Cheeks */}
    <ellipse cx="28" cy="58" rx="5" ry="3" fill="var(--app-accent)" opacity="0.6" />
    <ellipse cx="72" cy="58" rx="5" ry="3" fill="var(--app-accent)" opacity="0.6" />
    {/* Mouth */}
    <path d="M 46 62 Q 50 65, 54 62" fill="none" stroke="var(--app-text)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function WriteOverlay({ onClose }: { onClose: () => void }) {
  const [text, setText] = useState("");
  const [promptIndex, setPromptIndex] = useState(-1);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleMusubiClick = () => {
    // Show random prompt
    setPromptIndex(Math.floor(Math.random() * PROMPTS.length));
  };

  const handleSubmit = () => {
    if (text.trim() === "") return;
    setIsSaving(true);
    
    // Simulate save animation
    setTimeout(() => {
      setIsSaved(true);
      setTimeout(() => {
        onClose();
      }, 1500); // Wait for fade out animation
    }, 2000);
  };

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-0 z-50 bg-app-bg flex flex-col max-w-md mx-auto"
      style={{ fontFamily: '"Zen Maru Gothic", sans-serif' }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-4 h-16 shrink-0">
        <button onClick={onClose} className="p-2 text-app-text -ml-2">
          <ArrowLeft size={24} strokeWidth={2.5} className="hand-drawn-icon" />
        </button>
        <h2 className="text-lg font-bold text-app-text tracking-wider">日記を書く</h2>
        <button
          onClick={handleSubmit}
          disabled={text.trim() === ""}
          className={`bg-[#8A7974] text-white px-4 py-1.5 rounded-full text-sm font-medium transition-opacity ${
            text.trim() === "" ? "opacity-30" : "opacity-100"
          }`}
        >
          託す
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col relative">
        {/* Musubi Prompt Area */}
        <div className="flex justify-end mb-4 relative">
          <div className="flex flex-col items-end">
            <motion.button
              whileTap={{ scale: 0.9, rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.4 }}
              onClick={handleMusubiClick}
              className="mb-2"
            >
              {MUSUBI_SVG}
            </motion.button>
            {promptIndex === -1 ? (
              <p className="text-app-sub text-xs leading-relaxed text-right">
                おもいつかない時はムスビに聞いてみましょう
              </p>
            ) : (
              <div className="bg-white px-4 py-3 rounded-2xl rounded-tr-none shadow-sm max-w-[80%]">
                <p className="text-app-text text-sm leading-relaxed mb-2">
                  {PROMPTS[promptIndex]}
                </p>
                <button
                  onClick={handleMusubiClick}
                  className="text-app-sub text-[10px] underline underline-offset-2"
                >
                  別のお題を聞く
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Text Area */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="今日あったこと、感じたこと..."
          className="w-full flex-1 bg-transparent border-none outline-none resize-none text-app-text placeholder:text-app-sub/60 leading-relaxed text-[15px]"
        />

        {/* Character Count */}
        <div className="absolute bottom-4 right-6 text-app-sub text-xs">
          {text.length} 文字
        </div>
      </div>

      {/* Save Animation Overlay */}
      <AnimatePresence>
        {(isSaving || isSaved) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 flex flex-col items-center justify-start pt-[25vh] pointer-events-auto max-w-md mx-auto"
          >
            <motion.div
              initial={{ x: 0 }}
              animate={isSaved ? { x: [0, -20, 300] } : { y: [-10, 10, -10] }}
              transition={isSaved ? { duration: 0.6, times: [0, 0.2, 1], ease: "anticipate" } : { repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="flex flex-col items-center gap-6"
            >
              {/* Carry Musubi */}
              <div className="relative">
                <svg viewBox="0 0 100 100" className="w-32 h-32 drop-shadow-lg" xmlns="http://www.w3.org/2000/svg">
                  {/* Letter on head */}
                  <rect x="25" y="10" width="50" height="30" fill="white" stroke="var(--app-text)" strokeWidth="2.5" transform="rotate(-10 50 25)" />
                  <path d="M 25 10 L 50 25 L 75 10" fill="none" stroke="var(--app-text)" strokeWidth="2.5" transform="rotate(-10 50 25)" />
                  <circle cx="50" cy="22" r="4" fill="var(--app-accent)" transform="rotate(-10 50 25)" />
                  
                  {/* Body */}
                  <path d="M 15 65 C 15 35, 85 35, 85 65 C 85 95, 15 95, 15 65 Z" fill="var(--app-musubi)" stroke="var(--app-text)" strokeWidth="3" />
                  {/* Eyes */}
                  <path d="M 33 60 C 37 57, 43 60, 41 65" fill="none" stroke="var(--app-text)" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 67 60 C 63 57, 57 60, 59 65" fill="none" stroke="var(--app-text)" strokeWidth="3" strokeLinecap="round" />
                  {/* Cheeks */}
                  <ellipse cx="28" cy="68" rx="6" ry="4" fill="var(--app-accent)" opacity="0.6" />
                  <ellipse cx="72" cy="68" rx="6" ry="4" fill="var(--app-accent)" opacity="0.6" />
                  {/* Mouth - determined face */}
                  <path d="M 45 72 Q 50 70, 55 72" fill="none" stroke="var(--app-text)" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-white text-lg tracking-widest font-medium">
                {isSaved ? "保存完了" : "保存中..."}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
