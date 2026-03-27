import { useState } from "react";
import { motion } from "motion/react";
import Rest from "@/imports/やすみ";
import Send from "@/imports/送信";
import Reply from "@/imports/返信";

const RANGE_OPTIONS = [
  {
    id: "local",
    title: "この街だけ",
    desc: "近い感性の人と繋がる",
    Icon: Rest,
  },
  {
    id: "neighbor",
    title: "となり町まで",
    desc: "少し違う出会いも",
    Icon: Send,
  },
  {
    id: "far",
    title: "どこか遠くまで冒険",
    desc: "意外な出会いがあるかも",
    Icon: Reply,
  },
];

export default function SettingsScreen() {
  const [range, setRange] = useState("neighbor");
  const [notifyDiary, setNotifyDiary] = useState(true);
  const [notifyStamp, setNotifyStamp] = useState(true);

  return (
    <div className="min-h-[100dvh] relative">
      <header className="fixed top-0 left-0 right-0 max-w-md mx-auto pt-12 px-6 pb-4 bg-app-bg z-30">
        <h1 className="text-3xl font-bold text-app-text tracking-widest">設定</h1>
      </header>

      <div className="pt-[100px] pb-[112px] px-6">
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
                <div className="flex flex-col items-start">
                  <span className="text-app-text font-medium text-[15px] mb-1">{opt.title}</span>
                  <span className="text-app-sub text-xs">{opt.desc}</span>
                </div>
                <div className="ml-auto flex items-center gap-3">
                  <div className="w-15 h-15 flex items-center justify-center shrink-0">
                    <opt.Icon />
                  </div>
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
