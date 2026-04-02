import { createContext, useContext, useMemo } from "react";
import ja from "./locales/ja";
import en from "./locales/en";
import ko from "./locales/ko";
import zh from "./locales/zh";
import zhTw from "./locales/zh-tw";

export const LOCALES = ["ja", "en", "ko", "zh", "zh-tw"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  ja: "日本語",
  en: "English",
  ko: "한국어",
  zh: "简体中文",
  "zh-tw": "繁體中文",
};

const messages: Record<Locale, Record<string, string>> = { ja, en, ko, zh, "zh-tw": zhTw };

type TranslationKey = keyof typeof ja;

const I18nContext = createContext<Locale>("ja");

export function I18nProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <I18nContext.Provider value={locale}>{children}</I18nContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(I18nContext);
}

export function useT() {
  const locale = useContext(I18nContext);
  const t = useMemo(() => {
    const dict = messages[locale];
    return (key: TranslationKey) => dict[key] ?? messages.ja[key] ?? key;
  }, [locale]);
  return t;
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
