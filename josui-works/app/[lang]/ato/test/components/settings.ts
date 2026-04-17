import persona2Photo from './photos/iStock-2247284535.jpg'
import persona3Photo from './photos/Gemini_Generated_Image_ait7chait7chait7.png'
import nukoDark from './photos/nuko_dark.jpg'

export type SectionKey = 'normal' | 'h1' | 'h2' | 'h3' | 'bold'

export const SECTIONS: { key: SectionKey; label: string }[] = [
  { key: 'normal', label: '通常文字' },
  { key: 'h1', label: '見出し1 (#)' },
  { key: 'h2', label: '見出し2 (##)' },
  { key: 'h3', label: '見出し3 (###)' },
  { key: 'bold', label: '太字 (****)' },
]

export type Settings = {
  // 文字
  fontKanji: string
  fontKana: string
  fontAlnum: string
  sectionSize: Record<SectionKey, number>      // px
  sectionOpacity: Record<SectionKey, number>   // 0-1
  letterSpacing: number                         // em（通常文字のみ）
  lineHeight: number
  columnGap: number // em
  width: number // エディター幅 %（10-100、100=全幅）
  direction: "horizontal-tb" | "vertical-rl"
  textColor: string
  subColor: string
  accent: string
  borderColor: string
  // 紙
  bgType: "color" | "pattern" | "image"
  bgColor: string
  bgImage: string | null  // dataURL or URL; null で画像なし
  imageFrame: "none" | "photo" | "letter" | "sns"
  imageRotate: number  // deg; 画像の傾き (-15 〜 +15)
  rule: "none" | "horizontal" | "dot"
  ruleColor: string
  // メニュー
  menuBg: string
  menuBorder: string
  menuShadow: string
  buttonBg: string
  // プリセット
  mode: "light" | "dark"
  // 機能
  menuPosition: { x: number; y: number } // % (0-100), ボタン中心の座標
  menuSlide: "top" | "bottom" | "left" | "right"
  buttonDesign: "dots" | "hamburger" | "text" | "seal" | "flower" | "upload"
  buttonImage: string | null
  buttonRadius: number // px; メニューボタンの角の丸み
  menuRadius: number   // px; メニュー欄の角の丸み
  files: boolean
  filesPosition: { x: number; y: number }
  filesSlide: "top" | "bottom" | "left" | "right"
  // ルビ: 漢字→よみ の辞書。定義された語が本文に出現したら <ruby> で表示する
  ruby?: Record<string, string>
  // セクション別の文字色。null なら textColor を使用
  sectionColors: Record<SectionKey, string | null>
  // メニュー上の文章色(null で textColor を継承)
  menuTextColor: string | null
}

/** normal サイズから 5 セクションの既定サイズを派生 */
export function sectionSizesFor(normal: number): Record<SectionKey, number> {
  return { normal, h1: normal + 13, h2: normal + 7, h3: normal + 3, bold: normal }
}

const defaultSectionOpacity: Record<SectionKey, number> = {
  normal: 0.9, h1: 1, h2: 0.95, h3: 0.9, bold: 1,
}

export type KanjiFontId = 'shippori-mincho' | 'noto-serif-jp' | 'zen-old-mincho'
export type KanaFontId = 'klee-one' | 'hina-mincho' | 'zen-kurenaido'
export type AlnumFontId = 'inter' | 'eb-garamond' | 'cormorant'

export const kanjiFonts: { id: KanjiFontId; label: string }[] = [
  { id: 'shippori-mincho', label: 'しっぽり明朝' },
  { id: 'noto-serif-jp', label: 'Noto明朝' },
  { id: 'zen-old-mincho', label: '禅古明朝' },
]

export const kanaFonts: { id: KanaFontId; label: string }[] = [
  { id: 'klee-one', label: 'くれー' },
  { id: 'hina-mincho', label: 'ひな' },
  { id: 'zen-kurenaido', label: 'くれない' },
]

export const alnumFonts: { id: AlnumFontId; label: string }[] = [
  { id: 'inter', label: 'Inter' },
  { id: 'eb-garamond', label: 'Garamond' },
  { id: 'cormorant', label: 'Cormorant' },
]

export const defaultSettings: Settings = {
  fontKanji: 'noto-serif-jp',
  fontKana: 'hina-mincho',
  fontAlnum: 'inter',
  sectionSize: sectionSizesFor(15),
  sectionOpacity: defaultSectionOpacity,
  letterSpacing: 0,
  lineHeight: 1.8,
  columnGap: 0,
  width: 100,
  direction: "horizontal-tb",
  textColor: "#111111",
  subColor: "#888888",
  accent: "#111111",
  borderColor: "#e4e4e7",
  bgType: "color",
  bgColor: "#ffffff",
  bgImage: null,
  imageFrame: "none",
  imageRotate: 0,
  rule: "none",
  ruleColor: "#d4d4d8",
  menuBg: "#ffffff",
  menuBorder: "#e5e5e5",
  menuShadow: "0 -12px 40px rgba(0, 0, 0, 0.08)",
  buttonBg: "#ffffff",
  mode: "light",
  menuPosition: { x: 91, y: 10 },
  menuSlide: "right",
  buttonDesign: "dots",
  buttonImage: null,
  buttonRadius: 12,
  menuRadius: 24,
  files: true,
  filesPosition: { x: 9, y: 10 },
  filesSlide: "left",
  sectionColors: { normal: null, h1: null, h2: null, h3: null, bold: null },
  menuTextColor: null,
}

export type PresetIcon = 'sun' | 'moon' | 'flower' | 'scroll' | 'book'

export const presets: Record<string, { label: string; icon: PresetIcon; settings: Settings; content: string[] }> = {
  default: {
    label: 'ライト',
    icon: 'sun',
    settings: {
      ...defaultSettings,
      lineHeight: 1.9,
      letterSpacing: 0.02,
      buttonRadius: 16,
      menuRadius: 20,
    },
    content: [
      "# 僕を書くためのノート",
      "ここは、あなたの感情や思考をそのまま書き留める場所です。",
      "## 書き方",
      "「あと、」では、書く内容に合わせて、**自由に変えることができます**。",
      "### 見た目を整える",
      "夜の静かな時間には暗い背景を。手紙のように想いを綴りたいときは、縦書きと明朝体を。",
      "右上の設定アイコンから、あなたに一番馴染む形を探してみてください。",
    ],
  },
  persona1: {
    label: 'ダーク',
    icon: 'moon',
    settings: {
      ...defaultSettings,
      fontKanji: 'noto-serif-jp',
      fontKana: 'klee-one',
      fontAlnum: 'inter',
      sectionSize: { ...sectionSizesFor(14), h1: 34, h2: 18, bold: 16 },
      lineHeight: 2.3,
      letterSpacing: 0.02,
      width: 92,
      textColor: "#e5e5ea",
      subColor: "#666666",
      accent: "#e5e5ea",
      borderColor: "#333333",
      bgColor: "#1c1c1e",
      rule: "dot",
      ruleColor: "#2a2a2a",
      menuBg: "#222224",
      menuBorder: "#333333",
      menuShadow: "0 -12px 40px rgba(0, 0, 0, 0.5)",
      buttonBg: "#222224",
      mode: "dark",
      buttonDesign: "hamburger",
      buttonRadius: 6,
      menuRadius: 14,
      menuSlide: "left",
      filesSlide: "left",
      menuPosition: { x: 9, y: 4 },
      filesPosition: { x: 9, y: 11 },
      sectionColors: { normal: null, h1: "#a8c7e8", h2: "#9b8b8b", h3: null, bold: null },
      menuTextColor: "#e5e5ea",
    },
    content: [
      "# 25:30",
      "終電を逃した。静かな部屋。",
      "窓を打つ雨音だけが響いてる。",
      "冷めた珈琲を飲みながら、今日の出来事を振り返る。",
      "## 焦燥",
      "何者かになりたいという思いだけが空回りしている気がする。ため息がこぼれる。",
      "明日こそは、何か変わるだろうか。",
      "https://josui.works/ja",
    ],
  },
  persona2: {
    label: '桜',
    icon: 'flower',
    settings: {
      ...defaultSettings,
      fontKanji: 'zen-old-mincho',
      fontKana: 'klee-one',
      fontAlnum: 'cormorant',
      sectionSize: { ...sectionSizesFor(14), h1: 24, h2: 18, bold: 17 },
      lineHeight: 2.3,
      letterSpacing: 0.04,
      width: 90,
      textColor: "#fce4ec",
      subColor: "#f5c8d5",
      accent: "#ffd6e0",
      borderColor: "#f2e1e6",
      bgColor: "#fdf2f5",
      bgType: "image",
      bgImage: nukoDark.src,
      rule: "horizontal",
      ruleColor: "#f5d9e0",
      imageFrame: "sns",
      imageRotate: -3,
      menuBg: "#fffafb",
      menuBorder: "#f2e1e6",
      menuShadow: "0 -12px 40px rgba(215, 190, 200, 0.25)",
      buttonBg: "#fffafb",
      buttonDesign: "hamburger",
      buttonRadius: 24,
      menuRadius: 32,
      files: false,
      menuPosition: { x: 88, y: 90 },
      menuSlide: "bottom",
      sectionColors: { normal: "#fce4ec", h1: "#ffb8ce", h2: "#ffd0dd", h3: null, bold: "#ffb8ce" },
      menuTextColor: "#6b5b60",
    },
    content: [
      "# さいこうの夜🌸",
      "今日のライブ、**本当に最高**だった！！",
      "推しと目が合った気がする(絶対合った！)💕",
      `![再結成ライブのワンシーン](${persona2Photo.src})`,
      "## セトリの神さ💗",
      "アンコールの一曲目、**ずっと聴きたかった曲**で号泣😭",
      "**一生ついていくって心に誓った日。**",
    ],
  },
  persona3: {
    label: '和紙',
    icon: 'scroll',
    settings: {
      ...defaultSettings,
      fontKanji: 'noto-serif-jp',
      fontKana: 'zen-kurenaido',
      fontAlnum: 'eb-garamond',
      sectionSize: { ...sectionSizesFor(15), h1: 22, h2: 18, bold: 17 },
      sectionOpacity: { normal: 0.82, h1: 0.95, h2: 0.9, h3: 0.85, bold: 0.95 },
      lineHeight: 2.8,
      letterSpacing: 0.08,
      columnGap: 0.6,
      width: 85,
      direction: "vertical-rl",
      textColor: "#3d3934",
      subColor: "#8c8279",
      accent: "#a69c8e",
      borderColor: "#e6decf",
      bgColor: "#fcfaf2",
      bgType: "image",
      bgImage: persona3Photo.src,
      rule: "horizontal",
      ruleColor: "#d4c8b8",
      imageFrame: "letter",
      imageRotate: 2,
      menuBg: "#fcfaf2",
      menuBorder: "#e6decf",
      menuShadow: "0 -12px 40px rgba(100, 90, 70, 0.08)",
      buttonBg: "#fcfaf2",
      buttonDesign: "text",
      buttonRadius: 4,
      menuRadius: 8,
      menuSlide: "left",
      files: false,
      menuPosition: { x: 8, y: 50 },
      sectionColors: { normal: null, h1: "#8c4a3a", h2: "#8c4a3a", h3: null, bold: "#c97a3f" },
      menuTextColor: "#3d3934",
    },
    content: [
      "# 秋の午後",
      "縁側で温かいお茶をすすりながら、庭の秋桜が風に揺れるのを眺めている。",
      "## 孫からの手紙",
      "**ぼくは元気です。おばあちゃんに会いたいです。**",
      "そんな一文だけで、今日はもう、じゅうぶん。",
    ],
  },
  persona4: {
    label: '和装',
    icon: 'book',
    settings: {
      ...defaultSettings,
      fontKanji: 'shippori-mincho',
      fontKana: 'hina-mincho',
      fontAlnum: 'eb-garamond',
      sectionSize: { ...sectionSizesFor(17), h1: 32, h2: 22, bold: 20 },
      lineHeight: 3.0,
      letterSpacing: 0.12,
      columnGap: 0.8,
      width: 80,
      direction: "vertical-rl",
      textColor: "#2c2b29",
      subColor: "#8c8279",
      accent: "#5c4a44",
      borderColor: "#5c4a44",
      bgColor: "#f2ede4",
      rule: "horizontal",
      ruleColor: "#c4baa8",
      menuBg: "#ebe3d5",
      menuBorder: "#5c4a44",
      menuShadow: "0 -12px 40px rgba(0, 0, 0, 0.12)",
      buttonBg: "#ebe3d5",
      buttonDesign: "seal",
      buttonRadius: 2,
      menuRadius: 4,
      menuSlide: "bottom",
      filesSlide: "bottom",
      files: false,
      menuPosition: { x: 50, y: 92 },
      ruby: {
        "晩秋": "ばんしゅう",
        "感慨": "かんがい",
        "憂鬱": "ゆううつ",
        "珈琲": "コーヒー",
        "喧騒": "けんそう",
        "書斎": "しょさい",
        "籠": "こも",
      },
      sectionColors: { normal: null, h1: "#8c2e2e", h2: "#8c2e2e", h3: "#8c2e2e", bold: "#8c2e2e" },
      menuTextColor: "#2c2b29",
    },
    content: [
      "# 晩秋の感慨",
      "風立ちぬ、いざ生きめやも。",
      "古人の言葉が身に染みる季節となった。",
      "## 憂鬱なる日々",
      "世間の喧騒から離れ、独り書斎に籠もる。",
      "珈琲の苦味が、今の私には心地よい。",
    ],
  },
}
