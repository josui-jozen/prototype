"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { subscriptionMockRepo } from "@/infrastructure/repository/subscription/subscription.mock";
import {
  TimelineEntry,
  Subscription,
  SubscriptionTab,
} from "@/usecase/subscription/subscription.types";

function formatPublishDate(date: Date) {
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

function TimelineCard({ entry }: { entry: TimelineEntry }) {
  return (
    <div className="border border-[var(--color-border)] rounded-xl overflow-hidden">
      {/* Author header */}
      <div className="flex items-center gap-2 px-4 py-3">
        <div className="size-[28px] rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] shrink-0" />
        <span className="text-[13px] text-[var(--color-text-secondary)]">
          {entry.userName}さんが{formatPublishDate(entry.publishedAt)}に公開
        </span>
      </div>

      {/* Article preview */}
      <Link
        href="#"
        className="flex items-center gap-4 px-4 pb-4 no-underline"
      >
        <div className="w-[72px] h-[52px] rounded-lg bg-[#f1f6f9] shrink-0" />
        <span className="text-[15px] text-[var(--color-text-primary)] leading-snug">
          {entry.articleTitle}
        </span>
      </Link>
    </div>
  );
}

function SubscriptionListItem({ sub }: { sub: Subscription }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="size-[40px] rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-[14px] text-[var(--color-text-primary)] font-medium">
          {sub.userName}
        </div>
        {sub.latestArticleTitle && (
          <div className="text-[12px] text-[var(--color-text-muted)] truncate">
            最新: {sub.latestArticleTitle}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SubscriptionsPage() {
  const [tab, setTab] = useState<SubscriptionTab>("timeline");
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    subscriptionMockRepo.getTimeline().then(setTimeline);
    subscriptionMockRepo.getSubscriptions().then(setSubscriptions);
  }, []);

  return (
    <>
      <h1 className="text-[20px] font-bold text-[var(--color-text-primary)] mb-6">
        購読中
      </h1>

      {/* Tabs */}
      <div className="flex border-b border-[var(--color-border)] mb-6">
        <button
          onClick={() => setTab("timeline")}
          className={`px-4 py-2.5 text-[14px] bg-transparent border-none cursor-pointer ${
            tab === "timeline"
              ? "text-[var(--color-text-primary)] border-b-2 border-b-[var(--color-text-primary)] font-medium -mb-px"
              : "text-[var(--color-text-muted)]"
          }`}
        >
          タイムライン
        </button>
        <button
          onClick={() => setTab("list")}
          className={`px-4 py-2.5 text-[14px] bg-transparent border-none cursor-pointer ${
            tab === "list"
              ? "text-[var(--color-text-primary)] border-b-2 border-b-[var(--color-text-primary)] font-medium -mb-px"
              : "text-[var(--color-text-muted)]"
          }`}
        >
          購読リスト
        </button>
      </div>

      {tab === "timeline" ? (
        <>
          {/* Timeline entries */}
          <div className="flex flex-col gap-4">
            {timeline.map((entry) => (
              <TimelineCard key={entry.id} entry={entry} />
            ))}
          </div>

          {/* End message */}
          <p className="text-[13px] text-[var(--color-text-muted)] text-center mt-8">
            すべて読み込みました
          </p>
        </>
      ) : (
        <div className="flex flex-col divide-y divide-[var(--color-border)]">
          {subscriptions.map((sub) => (
            <SubscriptionListItem key={sub.id} sub={sub} />
          ))}
        </div>
      )}
    </>
  );
}
