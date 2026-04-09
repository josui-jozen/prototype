export const DOMAIN = "https://josui.works";

export const messages = {
  ja: {
    title: "如水工作所",
    ruby: "じょすいこうさくしょ",
    description: "今日をちょっと豊かにするモノづくり。\nアプリなどのデジタルコンテンツを中心とした制作活動を行っています。",
    creatorsLabel: "Creators",
    creators: [
      { name: "きっちゃん", note: "https://note.com/sego_nyan", x: "https://x.com/sego_nyan" },
      { name: "kazu", note: "https://note.com/open_sorrel1550", x: "https://x.com/kazu65162990830" },
    ],
    label: "日本語",
    htmlLang: "ja",
  },
  en: {
    title: "Josui Works",
    ruby: "",
    description: "Crafting things that enrich your everyday life. We create digital content, primarily apps.",
    creatorsLabel: "Creators",
    creators: [
      { name: "Kicchan", note: "https://note.com/sego_nyan", x: "https://x.com/sego_nyan" },
      { name: "kazu", note: "https://note.com/open_sorrel1550", x: "https://x.com/kazu65162990830" },
    ],
    label: "English",
    htmlLang: "en",
  },
  ko: {
    title: "Josui Works",
    ruby: "",
    description: "오늘의 일상을 조금 더 풍요롭게 만드는 모노즈쿠리. 앱 등 디지털 콘텐츠를 중심으로 제작 활동을 하고 있습니다.",
    creatorsLabel: "Creators",
    creators: [
      { name: "Kicchan", note: "https://note.com/sego_nyan", x: "https://x.com/sego_nyan" },
      { name: "kazu", note: "https://note.com/open_sorrel1550", x: "https://x.com/kazu65162990830" },
    ],
    label: "한국어",
    htmlLang: "ko",
  },
  zh: {
    title: "Josui Works",
    ruby: "",
    description: "让今天的生活更加丰富的创作。以应用等数字内容为中心进行制作活动。",
    creatorsLabel: "Creators",
    creators: [
      { name: "Kicchan", note: "https://note.com/sego_nyan", x: "https://x.com/sego_nyan" },
      { name: "kazu", note: "https://note.com/open_sorrel1550", x: "https://x.com/kazu65162990830" },
    ],
    label: "中文",
    htmlLang: "zh-Hans",
  },
  "zh-tw": {
    title: "Josui Works",
    ruby: "",
    description: "讓今天的生活更加豐富的創作。以應用程式等數位內容為中心進行製作活動。",
    creatorsLabel: "Creators",
    creators: [
      { name: "Kicchan", note: "https://note.com/sego_nyan", x: "https://x.com/sego_nyan" },
      { name: "kazu", note: "https://note.com/open_sorrel1550", x: "https://x.com/kazu65162990830" },
    ],
    label: "繁體中文",
    htmlLang: "zh-Hant",
  },
} as const;

export type Lang = keyof typeof messages;

export const langs = Object.keys(messages) as Lang[];
