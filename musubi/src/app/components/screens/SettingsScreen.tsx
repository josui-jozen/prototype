import { useState } from "react";
import { motion } from "motion/react";

const RANGE_OPTIONS = [
  {
    id: "local",
    title: "この街だけ",
    desc: "近い感性の人と繋がる",
    icon: (
      <svg viewBox="0 0 100 100" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
        <path d="M 15 65 C 15 35, 85 35, 85 65 C 85 95, 15 95, 15 65 Z" fill="var(--app-musubi)" stroke="var(--app-text)" strokeWidth="3" />
        <path d="M 33 60 Q 38 65, 43 60" fill="none" stroke="var(--app-text)" strokeWidth="3" strokeLinecap="round" />
        <path d="M 57 60 Q 62 65, 67 60" fill="none" stroke="var(--app-text)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "neighbor",
    title: "となり町まで",
    desc: "少し違う出会いも",
    icon: (
      <svg viewBox="0 0 100 100" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="10" width="50" height="30" fill="white" stroke="var(--app-text)" strokeWidth="2.5" transform="rotate(-10 50 25)" />
        <path d="M 25 10 L 50 25 L 75 10" fill="none" stroke="var(--app-text)" strokeWidth="2.5" transform="rotate(-10 50 25)" />
        <path d="M 15 65 C 15 35, 85 35, 85 65 C 85 95, 15 95, 15 65 Z" fill="var(--app-musubi)" stroke="var(--app-text)" strokeWidth="3" />
        <path d="M 33 60 C 37 57, 43 60, 41 65" fill="none" stroke="var(--app-text)" strokeWidth="3" strokeLinecap="round" />
        <path d="M 67 60 C 63 57, 57 60, 59 65" fill="none" stroke="var(--app-text)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "far",
    title: "どこか遠くまで冒険",
    desc: "意外な出会いがあるかも",
    icon: (
      <svg viewBox="0 0 120 100" className="w-10 h-8" xmlns="http://www.w3.org/2000/svg">
        <path d="M 10 70 L 100 70 L 105 80 L 5 80 Z" fill="var(--app-wood)" stroke="var(--app-text)" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="30" cy="85" r="10" fill="var(--app-musubi)" stroke="var(--app-text)" strokeWidth="2.5" />
        <circle cx="80" cy="85" r="10" fill="var(--app-musubi)" stroke="var(--app-text)" strokeWidth="2.5" />
        <g transform="translate(15, 30) rotate(-5)">
          <rect x="0" y="0" width="60" height="40" fill="white" stroke="var(--app-text)" strokeWidth="2.5" />
        </g>
        <path d="M 80 50 C 80 20, 120 20, 120 50 C 120 80, 80 80, 80 50 Z" fill="var(--app-musubi)" stroke="var(--app-text)" strokeWidth="3" />
        <path d="M 92 45 L 98 48" fill="none" stroke="var(--app-text)" strokeWidth="3" strokeLinecap="round" />
        <path d="M 112 45 L 106 48" fill="none" stroke="var(--app-text)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function SettingsScreen() {
  const [range, setRange] = useState("neighbor");
  const [notifyDiary, setNotifyDiary] = useState(true);
  const [notifyStamp, setNotifyStamp] = useState(true);

  return (
    <div className="min-h-full flex flex-col pt-12 px-6 pb-24 relative">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-app-text tracking-widest">設定</h1>
      </header>

      <section className="mb-10">
        <p className="text-app-text text-sm mb-4 font-medium">
          ムスビがどこまで日記を探しに行くか決められます
        </p>
        <div className="flex flex-col gap-3">
          {RANGE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setRange(opt.id)}
              className={`flex items-center gap-4 p-4 rounded-2xl bg-white border transition-all ${
                range === opt.id
                  ? "border-app-accent shadow-md ring-1 ring-app-accent/20"
                  : "border-transparent shadow-sm"
              }`}
            >
              <div className="w-12 h-10 flex items-center justify-center shrink-0">
                {opt.icon}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-app-text font-medium text-[15px] mb-1">{opt.title}</span>
                <span className="text-app-sub text-xs">{opt.desc}</span>
              </div>
              <div className="ml-auto">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    range === opt.id ? "border-app-accent" : "border-app-sub"
                  }`}
                >
                  {range === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-app-accent" />}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-app-sub text-sm mb-4 font-medium tracking-wider">通知</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-app-bg divide-y divide-app-bg">
          <div className="flex items-center justify-between p-5">
            <span className="text-app-text text-[15px]">日記が届いたとき</span>
            <Toggle checked={notifyDiary} onChange={setNotifyDiary} />
          </div>
          <div className="flex items-center justify-between p-5">
            <span className="text-app-text text-[15px]">スタンプが届いたとき</span>
            <Toggle checked={notifyStamp} onChange={setNotifyStamp} />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-app-sub text-sm mb-4 font-medium tracking-wider">アカウント</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-app-bg divide-y divide-app-bg">
          <button className="w-full flex items-center justify-between p-5 text-left active:bg-gray-50 transition-colors">
            <span className="text-app-text text-[15px]">アカウント管理</span>
          </button>
          <button className="w-full flex items-center justify-between p-5 text-left active:bg-gray-50 transition-colors">
            <span className="text-app-accent text-[15px] font-medium">ログアウト</span>
          </button>
        </div>
      </section>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-7 rounded-full transition-colors duration-300 ease-in-out ${
        checked ? "bg-app-accent" : "bg-app-sub"
      }`}
    >
      <motion.div
        animate={{ x: checked ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-5 h-5 bg-white rounded-full ml-1 shadow-sm"
      />
    </button>
  );
}
