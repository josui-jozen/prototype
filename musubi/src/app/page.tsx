"use client";

import { useState, useCallback } from "react";
import { DiaryScreen } from "@/components/screens/diary";
import { RecommendScreen } from "@/components/screens/recommend";
import { LetterBoxScreen } from "@/components/screens/letterbox";
import { SettingsScreen } from "@/components/screens/settings";

type Tab = "diary" | "recommend" | "letterbox" | "settings";

export default function Home() {
  const [tab, setTab] = useState<Tab>("diary");
  const [hideTabBar, setHideTabBar] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);

  const handleRecommendTab = useCallback(() => {
    if (tab !== "recommend") {
      setShowDelivery(true);
      setTab("recommend");
    }
  }, [tab]);

  return (
    <div className="flex flex-col flex-1 max-w-md mx-auto w-full">
      {/* Screen */}
      <main className={`flex-1 overflow-y-auto ${hideTabBar ? "" : "pb-20"}`}>
        {tab === "diary" && (
          <DiaryScreen onFullscreenChange={setHideTabBar} />
        )}
        {tab === "recommend" && (
          <RecommendScreen
            showDelivery={showDelivery}
            onDeliveryComplete={() => setShowDelivery(false)}
          />
        )}
        {tab === "letterbox" && <LetterBoxScreen />}
        {tab === "settings" && <SettingsScreen />}
      </main>

      {/* Tab Bar */}
      {!hideTabBar && (
        <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-muted/30 max-w-md mx-auto">
          <div className="flex justify-around py-2">
            <TabButton
              label="書く"
              icon="✏️"
              active={tab === "diary"}
              onClick={() => setTab("diary")}
            />
            <TabButton
              label="届いた"
              icon="📨"
              active={tab === "recommend"}
              onClick={handleRecommendTab}
            />
            <TabButton
              label="便箋"
              icon="💌"
              active={tab === "letterbox"}
              onClick={() => setTab("letterbox")}
            />
            <TabButton
              label="設定"
              icon="⚙️"
              active={tab === "settings"}
              onClick={() => setTab("settings")}
            />
          </div>
        </nav>
      )}
    </div>
  );
}

function TabButton({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-0.5 px-4 py-1 text-xs transition-colors ${
        active ? "text-accent" : "text-muted"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
