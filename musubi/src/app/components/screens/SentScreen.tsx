import { motion } from "motion/react";
import Send from "@/imports/送信";
import Reply from "@/imports/返信";
import Rest from "@/imports/やすみ";

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

export default function SentScreen() {
  return (
    <div className="min-h-[100dvh] relative bg-app-bg">
      <header className="fixed top-0 left-0 right-0 max-w-md mx-auto pt-12 px-6 pb-4 bg-app-bg z-30 after:content-[''] after:absolute after:left-0 after:right-0 after:top-full after:h-4 after:bg-gradient-to-b after:from-app-bg after:to-transparent after:pointer-events-none">
        <h1 className="text-3xl font-bold text-app-text mb-2 tracking-widest">便箋</h1>
        <p className="text-app-sub text-sm tracking-widest">あなたの日記のゆくえ</p>
      </header>

      <div>
        {/* Street Animation Scene */}
        <div className="h-16 w-full relative overflow-hidden mb-6 bg-app-bg border-b border-app-sub/20">
          <div className="absolute right-4 bottom-2 z-0 w-14 h-14">
            <Rest />
          </div>
          <motion.div
            animate={{ x: ["-10vw", "120vw"] }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            className="absolute bottom-2 z-10"
          >
            <motion.div animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 0.5 }}>
              <div className="w-14 h-14">
                <Send />
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            animate={{ x: ["-10vw", "120vw"] }}
            transition={{ repeat: Infinity, duration: 18, ease: "linear", delay: 8 }}
            className="absolute bottom-4 z-10 scale-75 opacity-80"
          >
            <motion.div animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 0.6 }}>
              <div className="w-14 h-14">
                <Send />
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            animate={{ x: ["120vw", "-20vw"] }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear", delay: 2 }}
            className="absolute bottom-1 z-20"
          >
            <div className="w-20 h-14">
              <Reply />
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col gap-4 px-6 pb-6">
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
    </div>
  );
}
