import { motion } from "motion/react";

const MOCK_SENT = [
  {
    id: "1",
    date: "3月24日",
    status: "誰かがリアクションしてくれました",
    statusColor: "text-app-accent",
    text: "今日、帰り道にふと空を見上げたら...",
  },
  {
    id: "2",
    date: "3月22日",
    status: "誰かが読みました",
    statusColor: "text-[#4A90E2]",
    text: "最近ずっと考えていることがあって...",
  },
  {
    id: "3",
    date: "3月20日",
    status: "誰かのもとに届きました",
    statusColor: "text-[#808080]",
    text: "子供の頃に好きだった場所のことを思い出し...",
  },
  {
    id: "4",
    date: "3月18日",
    status: "むすびが運んでいます",
    statusColor: "text-[#C0C0C0]",
    text: "雨の音を聞きながらぼんやりしてた...",
  },
];

const SmallMusubiCarry = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
    <rect x="25" y="10" width="50" height="30" fill="white" stroke="var(--app-text)" strokeWidth="2.5" transform="rotate(-10 50 25)" />
    <path d="M 25 10 L 50 25 L 75 10" fill="none" stroke="var(--app-text)" strokeWidth="2.5" transform="rotate(-10 50 25)" />
    <path d="M 15 65 C 15 35, 85 35, 85 65 C 85 95, 15 95, 15 65 Z" fill="var(--app-musubi)" stroke="var(--app-text)" strokeWidth="3" />
    <path d="M 33 60 C 37 57, 43 60, 41 65" fill="none" stroke="var(--app-text)" strokeWidth="3" strokeLinecap="round" />
    <path d="M 67 60 C 63 57, 57 60, 59 65" fill="none" stroke="var(--app-text)" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const SmallMusubiCart = () => (
  <svg viewBox="0 0 120 100" className="w-16 h-12" xmlns="http://www.w3.org/2000/svg">
    <path d="M 10 70 L 100 70 L 105 80 L 5 80 Z" fill="var(--app-wood)" stroke="var(--app-text)" strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx="30" cy="85" r="10" fill="var(--app-musubi)" stroke="var(--app-text)" strokeWidth="2.5" />
    <circle cx="80" cy="85" r="10" fill="var(--app-musubi)" stroke="var(--app-text)" strokeWidth="2.5" />
    <g transform="translate(15, 30) rotate(-5)">
      <rect x="0" y="0" width="60" height="40" fill="white" stroke="var(--app-text)" strokeWidth="2.5" />
      <path d="M 0 0 L 30 20 L 60 0" fill="none" stroke="var(--app-text)" strokeWidth="2.5" />
      <circle cx="30" cy="18" r="5" fill="var(--app-accent)" />
    </g>
    <path d="M 80 50 C 80 20, 120 20, 120 50 C 120 80, 80 80, 80 50 Z" fill="var(--app-musubi)" stroke="var(--app-text)" strokeWidth="3" />
    <path d="M 85 45 L 91 48" fill="none" stroke="var(--app-text)" strokeWidth="3" strokeLinecap="round" />
    <path d="M 102 45 L 96 48" fill="none" stroke="var(--app-text)" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const SmallMusubiSleep = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
    <path d="M 15 65 C 15 35, 85 35, 85 65 C 85 95, 15 95, 15 65 Z" fill="var(--app-musubi)" stroke="var(--app-text)" strokeWidth="3" />
    <path d="M 33 60 Q 38 65, 43 60" fill="none" stroke="var(--app-text)" strokeWidth="3" strokeLinecap="round" />
    <path d="M 57 60 Q 62 65, 67 60" fill="none" stroke="var(--app-text)" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export default function SentScreen() {
  return (
    <div className="min-h-full flex flex-col pt-12 pb-24 relative bg-app-bg">
      <header className="mb-6 px-6">
        <h1 className="text-3xl font-bold text-app-text mb-2 tracking-widest">便箋</h1>
        <p className="text-app-sub text-sm tracking-widest">あなたの日記のゆくえ</p>
      </header>

      {/* Street Animation Scene */}
      <div className="h-24 w-full relative overflow-hidden mb-6 bg-[#F5F0E8] border-b border-[#E8DFD1]">
        {/* Sleeping Musubi (Right, z-0) */}
        <div className="absolute right-4 bottom-2 z-0">
          <SmallMusubiSleep />
        </div>

        {/* Carry Musubi (Left to Right, z-10) */}
        <motion.div
          animate={{ x: ["-10vw", "120vw"] }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="absolute bottom-2 z-10"
        >
          <motion.div animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 0.5 }}>
            <SmallMusubiCarry />
          </motion.div>
        </motion.div>

        {/* Carry Musubi 2 */}
        <motion.div
          animate={{ x: ["-10vw", "120vw"] }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear", delay: 8 }}
          className="absolute bottom-4 z-10 scale-75 opacity-80"
        >
          <motion.div animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 0.6 }}>
            <SmallMusubiCarry />
          </motion.div>
        </motion.div>

        {/* Cart Musubi (Right to Left, z-20) */}
        <motion.div
          animate={{ x: ["120vw", "-20vw"] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear", delay: 2 }}
          className="absolute bottom-1 z-20"
        >
          <SmallMusubiCart />
        </motion.div>
      </div>

      <div className="flex flex-col gap-4 px-6">
        {MOCK_SENT.map((diary) => (
          <div
            key={diary.id}
            className="bg-white rounded-2xl p-5 shadow-sm border border-app-bg flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-app-sub text-xs font-medium">{diary.date}</span>
              <span className={`text-[10px] font-medium tracking-wide ${diary.statusColor}`}>
                {diary.status}
              </span>
            </div>
            <p className="text-app-text text-sm truncate">{diary.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
