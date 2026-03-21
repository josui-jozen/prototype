"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/app/_hooks/useAuth";
import { userMockRepo } from "@/infrastructure/repository/user/user.mock";
import { UserProfile } from "@/usecase/user/user.types";

function ActivityGrid({ year }: { year: number }) {
  // Generate a simple activity grid similar to GitHub contribution graph
  const months = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ];

  // Generate pseudo-random activity data based on year
  const getActivity = (month: number, week: number) => {
    if (year === 2026) {
      // Some activity in Jan-Mar 2026
      if (month <= 2 && week <= 3) {
        const seed = (month * 7 + week * 13) % 5;
        return seed > 2 ? 1 : 0;
      }
      return 0;
    }
    return 0;
  };

  return (
    <div className="mt-4">
      <div className="flex gap-1 mb-2">
        {months.map((m) => (
          <span
            key={m}
            className="text-[10px] text-[var(--color-text-muted)] w-[calc((100%-44px)/12)] text-center"
          >
            {m}
          </span>
        ))}
      </div>
      <svg width="100%" viewBox="0 0 504 44" className="block">
        {months.map((_, monthIdx) =>
          [0, 1, 2, 3].map((weekIdx) => {
            const activity = getActivity(monthIdx, weekIdx);
            const x = monthIdx * 42 + weekIdx * 11;
            const y = 0;
            return (
              <rect
                key={`${monthIdx}-${weekIdx}`}
                x={x}
                y={y + (weekIdx * 11)}
                width={9}
                height={9}
                rx={2}
                fill={
                  activity > 0
                    ? "#4ade80"
                    : "#f0f0f0"
                }
              />
            );
          })
        )}
      </svg>
    </div>
  );
}

function formatMonth(date: Date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activityYear, setActivityYear] = useState(2026);

  useEffect(() => {
    userMockRepo.getProfile("user1").then(setProfile);
  }, []);

  if (!profile) return null;

  return (
    <>
      <h1 className="text-[20px] font-bold text-[var(--color-text-primary)] mb-6">
        執筆ダッシュボード
      </h1>

      {/* Profile Card */}
      <div className="border border-[var(--color-border)] rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="size-[48px] rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)]" />
            <div>
              <div className="text-[16px] font-medium text-[var(--color-text-primary)]">
                {profile.name}
              </div>
              <div className="text-[13px] text-[var(--color-text-muted)]">
                sizu.me/{profile.handle}
              </div>
            </div>
          </div>
          <Link
            href="/settings"
            className="text-[13px] text-[var(--color-text-secondary)] border border-[var(--color-border-button)] rounded-lg px-3 py-1.5 no-underline hover:bg-[var(--color-bg-secondary)]"
          >
            設定
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[14px] text-[var(--color-text-secondary)]">
            <Calendar size={15} className="text-[var(--color-text-muted)]" />
            <span>利用開始: {formatMonth(profile.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2 text-[14px] text-[var(--color-text-secondary)]">
            <FileText size={15} className="text-[var(--color-text-muted)]" />
            <span>
              記事数: {profile.articleCount} うち{profile.publicArticleCount}
              つが公開中
            </span>
          </div>
        </div>

        <p className="text-[12px] text-[var(--color-text-muted)] mt-4 mb-0">
          月に3.5回のペースで更新しています
        </p>
      </div>

      {/* Activity Card */}
      <div className="border border-[var(--color-border)] rounded-2xl p-6 mb-6">
        <h2 className="text-[16px] font-medium text-[var(--color-text-primary)] mb-1 mt-0">
          アクティビティ
        </h2>
        <p className="text-[13px] text-[var(--color-text-muted)] mt-0 mb-0">
          {activityYear}年に2つの記事を書いています
        </p>

        <ActivityGrid year={activityYear} />

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setActivityYear((y) => y - 1)}
            className="flex items-center gap-1 text-[13px] text-[var(--color-text-secondary)] bg-transparent border-none cursor-pointer p-0 hover:text-[var(--color-text-primary)]"
          >
            <ChevronLeft size={14} />
            {activityYear - 1}年
          </button>
          <button className="text-[13px] text-[var(--color-text-secondary)] bg-transparent border border-[var(--color-border-button)] rounded-lg px-3 py-1 cursor-pointer hover:bg-[var(--color-bg-secondary)]">
            拡大
          </button>
        </div>
      </div>

      {/* Trash Card */}
      <div className="border border-[var(--color-border)] rounded-2xl p-6 mb-6">
        <h2 className="text-[16px] font-medium text-[var(--color-text-primary)] mt-0 mb-2">
          ごみ箱
        </h2>
        <p className="text-[14px] text-[var(--color-text-muted)] m-0">
          ごみ箱は空です
        </p>
      </div>

      {/* Tags Card */}
      <div className="border border-[var(--color-border)] rounded-2xl p-6 mb-6">
        <h2 className="text-[16px] font-medium text-[var(--color-text-primary)] mt-0 mb-2">
          タグ
        </h2>
        <p className="text-[14px] text-[var(--color-text-muted)] mb-3 mt-0">
          タグ機能を使って記事を分類できます。
        </p>
        <Link
          href="#"
          className="text-[14px] text-[var(--color-text-secondary)] no-underline hover:text-[var(--color-text-primary)]"
        >
          タグを管理 <ChevronRight size={14} className="inline" />
        </Link>
      </div>
    </>
  );
}
