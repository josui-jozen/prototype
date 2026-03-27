import { useState } from "react";
import { Plus, Pencil, Camera } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import WriteOverlay from "./WriteOverlay";

const MOCK_DIARIES = [
  {
    id: "1",
    date: "3月25日",
    text: "今日、帰り道にふと空を見上げたら、夕焼けがすごく綺麗だった。なんでもない日なのに、なんだか泣きそうになった。",
  },
  {
    id: "2",
    date: "3月22日",
    text: "最近ずっと考えていることがあって、でもうまく言葉にできない。こうやって書いてみると少しだけ整理される気がする。",
  },
  {
    id: "3",
    date: "3月20日",
    text: "子供の頃に好きだった場所のことを思い出した。あの公園のベンチ、まだあるのかな。",
  },
];

export default function WriteListScreen() {
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [isWriting, setIsWriting] = useState(false);

  return (
    <div className="min-h-[100dvh] relative">
      <header className="fixed top-0 left-0 right-0 max-w-md mx-auto pt-12 px-6 pb-4 bg-app-bg z-30">
        <h1 className="text-3xl font-bold text-app-text mb-2 tracking-widest">日記</h1>
        <p className="text-app-sub text-sm tracking-widest">あなたの綴った言葉たち</p>
      </header>

      <div className="pt-[120px] pb-[112px] px-6">
        <div className="flex flex-col gap-4">
          {MOCK_DIARIES.map((diary) => (
            <div
              key={diary.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-app-bg leading-relaxed"
            >
              <p className="text-app-sub text-xs mb-3 font-medium">{diary.date}</p>
              <p className="text-app-text text-[15px]">{diary.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAB Overlay Background */}
      <AnimatePresence>
        {isFabOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-app-bg/40 backdrop-blur-[1px]"
            onClick={() => setIsFabOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* FAB Options */}
      <AnimatePresence>
        {isFabOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed bottom-44 right-6 z-50 bg-white rounded-2xl shadow-xl overflow-hidden min-w-[180px]"
          >
            <button
              className="flex items-center gap-3 w-full p-4 text-app-text border-b border-app-bg hover:bg-black/5 transition-colors"
              onClick={() => {
                setIsFabOpen(false);
                setIsWriting(true);
              }}
            >
              <Pencil size={18} className="text-app-sub hand-drawn-icon" />
              <span className="text-sm font-medium">文字で書く</span>
            </button>
            <button
              className="flex items-center gap-3 w-full p-4 text-app-text hover:bg-black/5 transition-colors"
              onClick={() => {
                setIsFabOpen(false);
                alert("写真で読み込むUIは要件外です");
              }}
            >
              <Camera size={18} className="text-app-sub hand-drawn-icon" />
              <span className="text-sm font-medium">写真で読み込む</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <button
        onClick={() => setIsFabOpen(!isFabOpen)}
        className={`fixed bottom-28 right-6 w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-colors z-50 duration-300 ${
          isFabOpen ? "bg-app-sub" : "bg-app-accent"
        }`}
      >
        <motion.div
          animate={{ rotate: isFabOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Plus color="white" size={28} strokeWidth={2.5} className="hand-drawn-icon" />
        </motion.div>
      </button>

      {/* Write Overlay Modal */}
      <AnimatePresence>
        {isWriting && <WriteOverlay onClose={() => setIsWriting(false)} />}
      </AnimatePresence>
    </div>
  );
}
