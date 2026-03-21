"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, ChevronRight } from "lucide-react";
import { useAuth } from "@/app/_hooks/useAuth";
import { userMockRepo } from "@/infrastructure/repository/user/user.mock";
import { UserProfile, UserSettings } from "@/usecase/user/user.types";

type SettingsTab = "basic" | "sponsor";

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-[44px] h-[24px] rounded-full border-none cursor-pointer transition-colors ${
        checked ? "bg-emerald-500" : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute top-[2px] size-[20px] rounded-full bg-white shadow-sm transition-transform ${
          checked ? "left-[22px]" : "left-[2px]"
        }`}
      />
    </button>
  );
}

function Section({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="border border-[var(--color-border)] rounded-2xl p-6 mb-6">
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [tab, setTab] = useState<SettingsTab>("basic");

  useEffect(() => {
    userMockRepo.getProfile("user1").then(setProfile);
    userMockRepo.getSettings("user1").then(setSettings);
  }, []);

  if (!profile || !settings) return null;

  const updateSetting = <K extends keyof UserSettings>(
    key: K,
    value: UserSettings[K]
  ) => {
    setSettings((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  return (
    <>
      <h1 className="text-[20px] font-bold text-[var(--color-text-primary)] mb-6">
        設定
      </h1>

      {/* Tabs */}
      <div className="flex border-b border-[var(--color-border)] mb-6">
        <button
          onClick={() => setTab("basic")}
          className={`px-4 py-2.5 text-[14px] bg-transparent border-none cursor-pointer ${
            tab === "basic"
              ? "text-[var(--color-text-primary)] border-b-2 border-b-[var(--color-text-primary)] font-medium -mb-px"
              : "text-[var(--color-text-muted)]"
          }`}
        >
          基本設定
        </button>
        <button
          onClick={() => setTab("sponsor")}
          className={`px-4 py-2.5 text-[14px] bg-transparent border-none cursor-pointer flex items-center gap-1.5 ${
            tab === "sponsor"
              ? "text-[var(--color-text-primary)] border-b-2 border-b-[var(--color-text-primary)] font-medium -mb-px"
              : "text-[var(--color-text-muted)]"
          }`}
        >
          <Lock size={13} />
          スポンサー限定
        </button>
      </div>

      {tab === "basic" ? (
        <>
          {/* Profile image */}
          <Section>
            <div className="flex items-center gap-4">
              <div className="size-[56px] rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] shrink-0" />
              <button className="text-[14px] text-[var(--color-text-secondary)] bg-transparent border-none cursor-pointer p-0 hover:text-[var(--color-text-primary)]">
                プロフィール画像を変更
              </button>
            </div>
          </Section>

          {/* Display name */}
          <Section>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[14px] font-medium text-[var(--color-text-primary)] m-0 mb-1">
                  表示名
                </h3>
                <p className="text-[14px] text-[var(--color-text-secondary)] m-0">
                  {profile.name}
                </p>
              </div>
              <button className="text-[13px] text-[var(--color-text-secondary)] border border-[var(--color-border-button)] rounded-lg px-3 py-1.5 bg-transparent cursor-pointer hover:bg-[var(--color-bg-secondary)]">
                変更する
              </button>
            </div>
          </Section>

          {/* Bio */}
          <Section>
            <h3 className="text-[14px] font-medium text-[var(--color-text-primary)] m-0 mb-1">
              プロフィール文
            </h3>
            <p className="text-[14px] text-[var(--color-text-secondary)] m-0 mb-3">
              {profile.bio}
            </p>
            <button className="text-[13px] text-[var(--color-text-secondary)] border border-[var(--color-border-button)] rounded-lg px-3 py-1.5 bg-transparent cursor-pointer hover:bg-[var(--color-bg-secondary)]">
              登録する
            </button>
          </Section>

          {/* Default article title */}
          <Section>
            <h3 className="text-[14px] font-medium text-[var(--color-text-primary)] m-0 mb-1">
              デフォルトの記事タイトル
            </h3>
            <p className="text-[13px] text-[var(--color-text-muted)] m-0 mb-3">
              新しい記事を作成したとき、タイトルに自動で入力される文字列を設定できます。
            </p>
            <button className="text-[13px] text-[var(--color-text-secondary)] border border-[var(--color-border-button)] rounded-lg px-3 py-1.5 bg-transparent cursor-pointer hover:bg-[var(--color-bg-secondary)]">
              設定する
            </button>
          </Section>

          {/* Article appearance */}
          <Section>
            <h3 className="text-[14px] font-medium text-[var(--color-text-primary)] m-0 mb-4">
              記事の見た目
            </h3>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <label className="text-[14px] text-[var(--color-text-secondary)]">
                  段落間の余白の大きさ
                </label>
                <select
                  value={settings.paragraphSpacing}
                  onChange={(e) =>
                    updateSetting(
                      "paragraphSpacing",
                      e.target.value as "normal" | "wide"
                    )
                  }
                  className="text-[13px] text-[var(--color-text-secondary)] border border-[var(--color-border-button)] rounded-lg px-3 py-1.5 bg-transparent cursor-pointer"
                >
                  <option value="normal">ふつう</option>
                  <option value="wide">ゆったり</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-[14px] text-[var(--color-text-secondary)]">
                  強調の見た目
                </label>
                <select
                  value={settings.emphasisStyle}
                  onChange={(e) =>
                    updateSetting(
                      "emphasisStyle",
                      e.target.value as "bold" | "background"
                    )
                  }
                  className="text-[13px] text-[var(--color-text-secondary)] border border-[var(--color-border-button)] rounded-lg px-3 py-1.5 bg-transparent cursor-pointer"
                >
                  <option value="bold">太字</option>
                  <option value="background">蛍光マーカー</option>
                </select>
              </div>
            </div>
          </Section>

          {/* Letter settings */}
          <Section>
            <h3 className="text-[14px] font-medium text-[var(--color-text-primary)] m-0 mb-4">
              記事への感想レター
            </h3>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[var(--color-text-secondary)]">
                  受け取る
                </span>
                <Toggle
                  checked={settings.receiveLetters}
                  onChange={(v) => updateSetting("receiveLetters", v)}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[var(--color-text-secondary)]">
                  不快なレターを非表示にする
                </span>
                <Toggle
                  checked={settings.hideOffensiveLetters}
                  onChange={(v) => updateSetting("hideOffensiveLetters", v)}
                />
              </div>
            </div>
          </Section>

          {/* Email notifications */}
          <Section>
            <h3 className="text-[14px] font-medium text-[var(--color-text-primary)] m-0 mb-1">
              メール通知
            </h3>
            <p className="text-[13px] text-[var(--color-text-muted)] m-0 mb-4">
              お知らせやレポートをメールで受け取ります。
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[var(--color-text-secondary)]">
                  ニュースレター
                </span>
                <Toggle
                  checked={settings.newsletterNotification}
                  onChange={(v) => updateSetting("newsletterNotification", v)}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[var(--color-text-secondary)]">
                  振り返りレポート
                </span>
                <Toggle
                  checked={settings.reflectionReport}
                  onChange={(v) => updateSetting("reflectionReport", v)}
                />
              </div>
            </div>
          </Section>

          {/* Export */}
          <Section>
            <h3 className="text-[14px] font-medium text-[var(--color-text-primary)] m-0 mb-1">
              エクスポート
            </h3>
            <p className="text-[13px] text-[var(--color-text-muted)] m-0 mb-3">
              記事をMarkdown形式でエクスポートできます。
            </p>
            <Link
              href="#"
              className="text-[14px] text-[var(--color-text-secondary)] no-underline hover:text-[var(--color-text-primary)]"
            >
              エクスポートへ <ChevronRight size={14} className="inline" />
            </Link>
          </Section>

          {/* Email change */}
          <Section>
            <h3 className="text-[14px] font-medium text-[var(--color-text-primary)] m-0 mb-1">
              メールアドレスの変更
            </h3>
            <p className="text-[13px] text-[var(--color-text-muted)] m-0 mb-3">
              ログインに使用するメールアドレスを変更します。
            </p>
            <Link
              href="#"
              className="text-[14px] text-[var(--color-text-secondary)] no-underline hover:text-[var(--color-text-primary)]"
            >
              変更する <ChevronRight size={14} className="inline" />
            </Link>
          </Section>

          {/* Delete account */}
          <div className="text-center mb-8">
            <button className="text-[13px] text-red-500 bg-transparent border-none cursor-pointer p-0 hover:text-red-600">
              アカウントを削除する
            </button>
          </div>
        </>
      ) : (
        <div className="border border-[var(--color-border)] rounded-2xl p-6">
          <p className="text-[14px] text-[var(--color-text-muted)] m-0">
            スポンサー限定の設定はスポンサープランにご加入いただくとご利用いただけます。
          </p>
        </div>
      )}
    </>
  );
}
