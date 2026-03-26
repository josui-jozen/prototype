import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const SLEEPING_MUSUBI = (
  <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-sm" xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <motion.path 
      animate={{ d: [
        "M 15 65 C 15 35, 85 35, 85 65 C 85 95, 15 95, 15 65 Z", 
        "M 10 65 C 10 30, 90 30, 90 65 C 90 100, 10 100, 10 65 Z", 
        "M 15 65 C 15 35, 85 35, 85 65 C 85 95, 15 95, 15 65 Z"
      ] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      fill="var(--app-musubi)" stroke="var(--app-text)" strokeWidth="2.5" 
    />
    {/* Ahoge */}
    <path d="M 50 35 Q 55 20, 65 25" fill="none" stroke="var(--app-text)" strokeWidth="2" strokeLinecap="round" />
    {/* Closed Eyes */}
    <path d="M 33 60 Q 38 65, 43 60" fill="none" stroke="var(--app-text)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 57 60 Q 62 65, 67 60" fill="none" stroke="var(--app-text)" strokeWidth="2.5" strokeLinecap="round" />
    {/* Cheeks */}
    <ellipse cx="25" cy="68" rx="5" ry="3" fill="var(--app-accent)" opacity="0.4" />
    <ellipse cx="75" cy="68" rx="5" ry="3" fill="var(--app-accent)" opacity="0.4" />
    {/* Zzz */}
    <motion.text x="70" y="30" fontSize="12" fill="var(--app-sub)" animate={{ y: [30, 20, 30], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 3 }}>Z</motion.text>
    <motion.text x="80" y="20" fontSize="8" fill="var(--app-sub)" animate={{ y: [20, 10, 20], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}>z</motion.text>
  </svg>
);

const CART_MUSUBI = (
  <svg viewBox="0 0 120 100" className="w-40 h-32 drop-shadow-lg" xmlns="http://www.w3.org/2000/svg">
    {/* Wood Cart */}
    <path d="M 10 70 L 100 70 L 105 80 L 5 80 Z" fill="var(--app-wood)" stroke="var(--app-text)" strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx="30" cy="85" r="10" fill="var(--app-musubi)" stroke="var(--app-text)" strokeWidth="2.5" />
    <circle cx="80" cy="85" r="10" fill="var(--app-musubi)" stroke="var(--app-text)" strokeWidth="2.5" />
    
    {/* Giant Envelope on Cart */}
    <g transform="translate(15, 30) rotate(-5)">
      <rect x="0" y="0" width="60" height="40" fill="white" stroke="var(--app-text)" strokeWidth="2.5" />
      <path d="M 0 0 L 30 20 L 60 0" fill="none" stroke="var(--app-text)" strokeWidth="2.5" />
      <circle cx="30" cy="18" r="5" fill="var(--app-accent)" />
    </g>

    {/* Body pushing */}
    <path d="M 80 50 C 80 20, 120 20, 120 50 C 120 80, 80 80, 80 50 Z" fill="var(--app-musubi)" stroke="var(--app-text)" strokeWidth="3" />
    {/* Eyes focused left */}
    <path d="M 85 45 L 91 48" fill="none" stroke="var(--app-text)" strokeWidth="3" strokeLinecap="round" />
    <path d="M 102 45 L 96 48" fill="none" stroke="var(--app-text)" strokeWidth="3" strokeLinecap="round" />
    
    <ellipse cx="88" cy="55" rx="4" ry="3" fill="var(--app-accent)" opacity="0.6" />
    {/* Sweat drop */}
    <path d="M 115 35 Q 118 40, 115 42 Q 112 40, 115 35" fill="#87CEEB" opacity="0.7" />
  </svg>
);

const MOCK_RECEIVED = [
  {
    id: "1",
    date: "3月26日（木）",
    text: "今日、帰り道にふと空を見上げたら、夕焼けがすごく綺麗だった。なんでもない日なのに、なんだか泣きそうになった。こういう気持ちを誰かに伝えたいけど、わざわざ連絡するほどでもない。でも、ここに書けるのはちょっと嬉しい。",
    status: "unread", // unread, read, stamped, delivered
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
  const [animationPhase, setAnimationPhase] = useState(0); // 0: enter, 1: text, 2: exit
  const [diaries, setDiaries] = useState(MOCK_RECEIVED);

  useEffect(() => {
    // Sequence
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
    
    // Simulate changing to "delivered" after a few seconds
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
    <div className="min-h-full flex flex-col pt-12 px-6 pb-24 relative">
      <header className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-app-text mb-2 tracking-widest">届いた日記</h1>
          <p className="text-app-sub text-sm tracking-widest">ムスビが持ってきてくれました</p>
        </div>
        <div className="-mt-4 -mr-4">
          {SLEEPING_MUSUBI}
        </div>
      </header>

      <div className="flex flex-col gap-8">
        {/* Group by date in real app, here we just map and show headers if changed */}
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

      {/* Delivery Animation Overlay */}
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-30 bg-black/50 flex flex-col items-center justify-start pt-[25vh] pointer-events-auto max-w-md mx-auto"
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
              {CART_MUSUBI}
              <p className="text-white text-lg tracking-widest font-medium">
                {animationPhase === 0 ? "受け取り中..." : "結びが誰かの日記を持ってきました！"}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
