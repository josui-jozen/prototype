"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedCartDelivery } from "@/components/ui/animated-cart-delivery";
import { AnimatedRestingCharacter } from "@/components/ui/animated-resting-character";

type DiaryStatus = "unread" | "read" | "stamped" | "delivered";

type ReceivedDiary = {
  id: string;
  text: string;
  date: string;
  status: DiaryStatus;
};

const STATUS_LABEL: Record<DiaryStatus, string> = {
  unread: "未読",
  read: "読みました",
  stamped: "スタンプを押しました",
  delivered: "スタンプが相手に伝わりました",
};

const STATUS_COLOR: Record<DiaryStatus, string> = {
  unread: "bg-muted/30 text-muted",
  read: "bg-blue-100 text-blue-600",
  stamped: "bg-orange-100 text-orange-600",
  delivered: "bg-green-100 text-green-600",
};

const MOCK_DIARIES: ReceivedDiary[] = [
  {
    id: "1",
    text: "今日、帰り道にふと空を見上げたら、夕焼けがすごく綺麗だった。なんでもない日なのに、なんだか泣きそうになった。こういう気持ちを誰かに伝えたいけど、わざわざ連絡するほどでもない。でも、ここに書けるのはちょっと嬉しい。",
    date: "2026-03-26",
    status: "unread",
  },
  {
    id: "2",
    text: "コンビニで肉まん買ったら、店員さんが「温めますか？」って聞いてくれて、なんかそれだけで救われた気持ちになった。疲れてたのかな。",
    date: "2026-03-26",
    status: "read",
  },
  {
    id: "3",
    text: "久しぶりに早起きして散歩した。朝の空気ってこんなに気持ちよかったっけ。明日も起きれたらいいな。",
    date: "2026-03-25",
    status: "delivered",
  },
];

type DeliveryPhase = "arriving" | "done" | null;

function DeliveryOverlay({
  phase,
  onComplete,
}: {
  phase: DeliveryPhase;
  onComplete: () => void;
}) {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (phase === "done") {
      const timer = setTimeout(() => onCompleteRef.current(), 2500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  if (!phase) return null;

  return (
    <div className="fixed inset-0 z-60 flex flex-col items-center justify-start pt-[10vh] bg-black/50">
      {/* キャラ＋荷車（大きく表示） */}
      <motion.div
        className="w-80 h-56 shrink-0"
        animate={
          phase === "done"
            ? { x: [0, 30, -500], opacity: [1, 1, 0] }
            : { x: 0, opacity: 1 }
        }
        transition={
          phase === "done"
            ? { duration: 1.4, delay: 0.5, times: [0, 0.2, 1], ease: [0.2, 0, 0.6, 1] }
            : { duration: 0.3 }
        }
      >
        <AnimatedCartDelivery />
      </motion.div>

      {/* メッセージ（下） */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          className="mt-6 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-base font-medium text-white">
            {phase === "arriving"
              ? "受け取り中..."
              : "結びが誰かの日記を持ってきました！"}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const weekday = weekdays[date.getDay()];
  return `${month}月${day}日（${weekday}）`;
}

function DiaryCard({
  diary,
  onStamp,
}: {
  diary: ReceivedDiary;
  onStamp: (id: string) => void;
}) {
  const isStamped = diary.status === "stamped" || diary.status === "delivered";
  return (
    <div className="bg-card rounded-2xl p-5 shadow-sm border border-muted/20 space-y-3">
      <div className="flex items-center gap-2">
        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${STATUS_COLOR[diary.status]}`}>
          {STATUS_LABEL[diary.status]}
        </span>
      </div>
      <p className="text-sm leading-relaxed whitespace-pre-wrap">
        {diary.text}
      </p>
      <div className="flex justify-end">
        {isStamped ? (
          <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">みたよ</span>
          </div>
        ) : (
          <button
            onClick={() => onStamp(diary.id)}
            className="w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center hover:bg-muted/50 transition-colors"
          >
            <span className="text-[10px] font-medium text-muted">みたよ</span>
          </button>
        )}
      </div>
    </div>
  );
}

export function RecommendScreen({
  showDelivery,
  onDeliveryComplete,
}: {
  showDelivery: boolean;
  onDeliveryComplete: () => void;
}) {
  const [diaries, setDiaries] = useState(MOCK_DIARIES);
  const [deliveryPhase, setDeliveryPhase] = useState<DeliveryPhase>(null);

  useEffect(() => {
    if (showDelivery) {
      setDeliveryPhase("arriving");
      setTimeout(() => {
        setDeliveryPhase("done");
      }, 2000);
    }
  }, [showDelivery]);

  const handleDeliveryComplete = () => {
    setDeliveryPhase(null);
    onDeliveryComplete();
  };

  const handleStamp = (id: string) => {
    setDiaries((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "stamped" as DiaryStatus } : d))
    );
  };

  // Group by date
  const grouped = diaries.reduce<Record<string, ReceivedDiary[]>>(
    (acc, diary) => {
      if (!acc[diary.date]) acc[diary.date] = [];
      acc[diary.date].push(diary);
      return acc;
    },
    {}
  );

  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <>
      <DeliveryOverlay phase={deliveryPhase} onComplete={handleDeliveryComplete} />
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-xl font-bold">届いた日記</h1>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted">ムスビが持ってきてくれました</p>
            <div className="w-20 h-14 shrink-0">
              <AnimatedRestingCharacter />
            </div>
          </div>
        </div>

        {/* Diary list grouped by date */}
        {sortedDates.map((date) => (
          <div key={date} className="space-y-3">
            <h2 className="text-sm font-medium text-muted">
              {formatDate(date)}
            </h2>
            {grouped[date].map((diary) => (
              <DiaryCard
                key={diary.id}
                diary={diary}
                onStamp={handleStamp}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
