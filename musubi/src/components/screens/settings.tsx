"use client";

import { useState, type ReactNode } from "react";
import { AnimatedRestingCharacter } from "@/components/ui/animated-resting-character";
import { AnimatedDeliveryCharacter } from "@/components/ui/animated-delivery-character";
import { AnimatedCartDeliveryMini } from "@/components/ui/animated-cart-delivery";

const RANGES: { value: string; label: string; description: string; animation: () => ReactNode }[] = [
  {
    value: "local",
    label: "この街だけ",
    description: "近い感性の人と繋がる",
    animation: () => (
      <div className="w-10 h-8">
        <AnimatedRestingCharacter />
      </div>
    ),
  },
  {
    value: "neighbor",
    label: "となり町まで",
    description: "少し違う出会いも",
    animation: () => (
      <div className="w-10 h-8">
        <AnimatedDeliveryCharacter />
      </div>
    ),
  },
  {
    value: "far",
    label: "どこか遠くまで冒険",
    description: "意外な出会いがあるかも",
    animation: () => (
      <div className="w-10 h-8">
        <AnimatedCartDeliveryMini />
      </div>
    ),
  },
];

export function SettingsScreen() {
  const [range, setRange] = useState<string>("local");

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold">設定</h1>
      </div>

      {/* Musubi Range */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold">ムスビの行動範囲</h2>
        <p className="text-xs text-muted">
          ムスビがどこまで日記を探しに行くか決められます
        </p>
        <div className="space-y-2">
          {RANGES.map((r) => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={`w-full text-left p-4 rounded-2xl border transition-all ${
                range === r.value
                  ? "bg-card border-accent/40 shadow-sm"
                  : "bg-card border-muted/20 hover:border-muted/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-sm font-medium">{r.label}</p>
                  <p className="text-xs text-muted mt-0.5">{r.description}</p>
                </div>
                <div className="shrink-0">
                  {r.animation()}
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    range === r.value ? "border-accent" : "border-muted/40"
                  }`}
                >
                  {range === r.value && (
                    <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Notifications */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold">通知</h2>
        <div className="bg-card rounded-2xl border border-muted/20 divide-y divide-muted/10">
          <div className="flex items-center justify-between p-4">
            <span className="text-sm">日記が届いたとき</span>
            <ToggleSwitch defaultOn />
          </div>
          <div className="flex items-center justify-between p-4">
            <span className="text-sm">スタンプが届いたとき</span>
            <ToggleSwitch defaultOn />
          </div>
        </div>
      </section>

      {/* Account */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold">アカウント</h2>
        <div className="bg-card rounded-2xl border border-muted/20 divide-y divide-muted/10">
          <button className="w-full text-left p-4 text-sm hover:bg-muted/5 transition-colors">
            アカウント管理
          </button>
          <button className="w-full text-left p-4 text-sm text-accent hover:bg-muted/5 transition-colors">
            ログアウト
          </button>
        </div>
      </section>
    </div>
  );
}

function ToggleSwitch({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`w-11 h-6 rounded-full transition-colors relative ${
        on ? "bg-accent" : "bg-muted/30"
      }`}
    >
      <div
        className={`w-5 h-5 rounded-full bg-white shadow absolute top-0.5 transition-transform ${
          on ? "translate-x-5.5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
