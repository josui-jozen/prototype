export type Settings = {
  // 文字
  font: string
  size: number // px
  lineHeight: number
  columnGap: number // em
  width: string // max-width css
  textOpacity: number // 0-1
  direction: "horizontal-tb" | "vertical-rl"
  // 紙
  bgType: "color" | "pattern" | "image"
  bgColor: string
  rule: "none" | "horizontal" | "grid" | "manuscript" | "dot"
  // プリセット
  mode: "light" | "dark"
  // 機能
  menuPosition: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  menuSlide: "top" | "bottom" | "left" | "right"
  buttonDesign: "dots" | "hamburger" | "text" | "seal" | "flower"
  ai: boolean
  files: boolean
}

export const defaultSettings: Settings = {
  font: "'Inter', 'Noto Sans JP', sans-serif",
  size: 15,
  lineHeight: 1.8,
  columnGap: 0,
  width: "100%",
  textOpacity: 0.9,
  direction: "horizontal-tb",
  bgType: "color",
  bgColor: "#ffffff",
  rule: "none",
  mode: "light",
  menuPosition: "top-right",
  menuSlide: "bottom",
  buttonDesign: "dots",
  ai: true,
  files: true,
}

export const presets: Record<string, { theme: string; settings: Settings; content: string[] }> = {
  default: {
    theme: "theme-default",
    settings: defaultSettings,
    content: [
      "ここは、あなたの感情や思考をそのまま書き留める場所です。",
      "「あと、」では、書く内容に合わせて、この画面の背景色や文字の形、書字方向を自由に変えることができます。",
      "たとえば、夜の静かな時間には暗い背景を。手紙のように想いを綴りたいときは、縦書きと明朝体を。",
      "右上の設定アイコンから、あなたに一番馴染む形を探してみてください。",
    ],
  },
  persona1: {
    theme: "theme-persona1",
    settings: {
      ...defaultSettings,
      font: "'Noto Sans JP', sans-serif",
      size: 14,
      lineHeight: 2.2,
      bgColor: "#1c1c1e",
      textOpacity: 0.9,
      mode: "dark",
      buttonDesign: "dots",
      menuSlide: "right",
    },
    content: [
      "終電、今日も逃した。",
      "駅のベンチで缶コーヒー。冷えたやつ。",
      "なんで俺、こんなに頑張ってるんだっけ。",
      "気づいたら30が見えてきてる。",
      "同期はもう転職して、SNSで楽しそうにしてる。",
      "俺はまだここで、何かを掴もうとしてる。何を?",
      "それでも、書くと少し落ち着く。",
    ],
  },
  persona2: {
    theme: "theme-persona2",
    settings: {
      ...defaultSettings,
      font: "'Zen Maru Gothic', sans-serif",
      size: 14,
      lineHeight: 2.1,
      bgColor: "#fdf2f5",
      buttonDesign: "hamburger",
    },
    content: [
      "今日のLIVE、最高だった",
      "3年待った再結成ライブ。",
      "ようやく、ようやく、目の前にいた。",
      "1曲目のイントロが鳴った瞬間、会場ぜんぶ泣いてた。",
      "帰り道、まだ手が震えてる。",
      "あの瞬間のために、また1年がんばれる。",
    ],
  },
  persona3: {
    theme: "theme-persona3",
    settings: {
      ...defaultSettings,
      font: "'Noto Serif JP', serif",
      size: 15,
      lineHeight: 2.6,
      direction: "vertical-rl",
      bgColor: "#fcfaf2",
      buttonDesign: "text",
      menuSlide: "left",
    },
    content: [
      "十月のある夜に",
      "娘からの電話が、ぷつりと途切れた。",
      "通信が悪かったらしい。",
      "元気で暮らしているらしい。それだけで、もう、じゅうぶん。",
      "窓を開けると、金木犀の香りが入ってきた。",
    ],
  },
  persona4: {
    theme: "theme-persona4",
    settings: {
      ...defaultSettings,
      font: "'Shippori Mincho', serif",
      size: 16,
      lineHeight: 2.8,
      direction: "vertical-rl",
      bgColor: "#f2ede4",
      buttonDesign: "seal",
    },
    content: [
      "令和七年 晩秋",
      "窓辺の椿が、今年も咲いた。",
      "戦後すぐ、植えたのは父だったか、母だったか。",
      "記憶は次第に薄れゆくが、花の色だけは変わらぬ。",
      "時の流れは早い。",
      "あと何度、この椿を見られるだろうか。",
    ],
  },
}
