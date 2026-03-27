import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Rest from "@/imports/やすみ";
import Reply from "@/imports/返信";

const MOCK_RECEIVED = [
  {
    id: "1",
    date: "3月26日（木）",
    text: "今日、帰り道にふと空を見上げたら、夕焼けがすごく綺麗だった。なんでもない日なのに、なんだか泣きそうになった。こういう気持ちを誰かに伝えたいけど、わざわざ連絡するほどでもない。でも、ここに書けるのはちょっと嬉しい。",
    status: "unread",
  },
  {
    id: "2",
    date: "3月26日（木）",
    text: "コンビニで肉まん買ったら、店員さんが「温めますか？」って聞いてくれて、なんかそれだけで救われた気持ちになった。疲れてたのかな。",
    status: "read",
  },
  {
    id: "3",
    date: "3月25日（水）",
    text: "久しぶりに早起きして散歩した。朝の空気ってこんなに気持ちよかったっけ。明日も起きれたらいいな。",
    status: "delivered",
  },
];

export default function ReceivedScreen() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [diaries, setDiaries] = useState(MOCK_RECEIVED);

  useEffect(() => {
    const t1 = setTimeout(() => setAnimationPhase(1), 1500);
    const t2 = setTimeout(() => setAnimationPhase(2), 3000);
    const t3 = setTimeout(() => setShowAnimation(false), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const handleStamp = (id: string) => {
    setDiaries(diaries.map(d => {
      if (d.id === id && (d.status === "unread" || d.status === "read")) {
        return { ...d, status: "stamped" };
      }
      return d;
    }));
    setTimeout(() => {
      setDiaries(prev => prev.map(d =>
        d.id === id ? { ...d, status: "delivered" } : d
      ));
    }, 2000);
  };

  const markAsRead = (id: string) => {
    setDiaries(diaries.map(d => {
      if (d.id === id && d.status === "unread") {
        return { ...d, status: "read" };
      }
      return d;
    }));
  };

  return (
    <div className="min-h-[100dvh] relative">
      <header className="fixed top-0 left-0 right-0 max-w-md mx-auto pt-12 px-6 pb-4 bg-app-bg z-30 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-app-text mb-2 tracking-widest">届いた日記</h1>
          <p className="text-app-sub text-sm tracking-widest">ムスビが持ってきてくれました</p>
        </div>
        <div className="-mt-4 -mr-4 w-16 h-16">
          <Rest />
        </div>
      </header>

      <div className="pt-[120px] pb-[112px] px-6">
        <div className="flex flex-col gap-8">
          {diaries.map((diary, index) => {
            const showDate = index === 0 || diaries[index-1].date !== diary.date;
            return (
              <div key={diary.id} className="flex flex-col gap-3">
                {showDate && <h3 className="text-app-sub text-sm font-medium">{diary.date}</h3>}
                <div
                  className="bg-white rounded-2xl p-6 shadow-sm border border-app-bg flex flex-col relative"
                  onMouseEnter={() => markAsRead(diary.id)}
                  onTouchStart={() => markAsRead(diary.id)}
                >
                  <div className="mb-4">
                    {diary.status === "unread" && (
                      <span className="bg-[#E5E5E5] text-[#808080] text-[10px] px-3 py-1 rounded-full font-medium tracking-wider">未読</span>
                    )}
                    {diary.status === "read" && (
                      <span className="bg-[#E0F0FF] text-[#4A90E2] text-[10px] px-3 py-1 rounded-full font-medium tracking-wider">読みました</span>
                    )}
                    {diary.status === "stamped" && (
                      <span className="bg-[#FFF0E0] text-app-accent text-[10px] px-3 py-1 rounded-full font-medium tracking-wider">スタンプを押しました</span>
                    )}
                    {diary.status === "delivered" && (
                      <span className="bg-[#E5F5E5] text-[#4CAF50] text-[10px] px-3 py-1 rounded-full font-medium tracking-wider">スタンプが相手に伝わりました</span>
                    )}
                  </div>
                  <p className="text-app-text text-[15px] leading-relaxed mb-6">{diary.text}</p>
                  <button
                    onClick={() => handleStamp(diary.id)}
                    disabled={diary.status === "stamped" || diary.status === "delivered"}
                    className={`self-end w-16 h-16 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      (diary.status === "stamped" || diary.status === "delivered")
                        ? "bg-app-accent text-white"
                        : "bg-[#E6E1DA] text-app-sub"
                    }`}
                  >
                    みたよ
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delivery Animation Overlay */}
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-black/50 flex flex-col items-center justify-start pt-[25vh] pointer-events-auto max-w-md mx-auto"
          >
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={
                animationPhase === 2 ? { x: [0, 20, -300], opacity: [1, 1, 0] }
                : animationPhase === 1 ? { x: 0, opacity: 1 }
                : { x: 0, opacity: 1 }
              }
              transition={{
                duration: animationPhase === 2 ? 0.8 : 0.5,
                times: animationPhase === 2 ? [0, 0.3, 1] : undefined,
                ease: animationPhase === 2 ? "easeIn" : "easeOut"
              }}
              className="flex flex-col items-center gap-8"
            >
              <div className="w-40 h-32 drop-shadow-lg">
                <Reply />
              </div>
              <p className="text-white text-lg tracking-widest font-medium">
                {animationPhase === 0 ? "受け取り中..." : "ムスビが誰かの日記を持ってきました！"}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
