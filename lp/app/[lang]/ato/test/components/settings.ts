import persona2PhotoSrc from '../assets/photos/iStock-2247284535.jpg'
import persona3PhotoSrc from '../assets/photos/Gemini_Generated_Image_ait7chait7chait7.png'
import nukoDarkSrc from '../assets/photos/nuko_dark.jpg'
const persona2Photo = persona2PhotoSrc.src
const persona3Photo = persona3PhotoSrc.src
const nukoDark = nukoDarkSrc.src

/* ============================================================
 * Ato Settings
 * - "Editor"    : 全画面の入力エリア
 * - "{機能}Button": エディター上に配置するトリガー (menu/files)
 * - "{機能}Panel" : Button によって開かれる内容 (menu/files)
 * - 命名規則:
 *   - {ui}BgColor       UIパーツの背景色
 *   - {ui}BorderRadius  UIパーツの角丸
 *   - button/panel 配下のスタイルは機能間で共通
 *   - 機能名プレフィックス (menu/files) が付くものは機能固有
 * ============================================================ */

export type SectionKey = 'normal' | 'h1' | 'h2' | 'h3' | 'bold'

export const SECTIONS: { key: SectionKey; label: string }[] = [
  { key: 'normal', label: '通常文字' },
  { key: 'h1', label: '見出し1 (#)' },
  { key: 'h2', label: '見出し2 (##)' },
  { key: 'h3', label: '見出し3 (###)' },
  { key: 'bold', label: '太字 (****)' },
]

export type Sides<T> = { top: T; right: T; bottom: T; left: T }
const sides = <T>(v: T): Sides<T> => ({ top: v, right: v, bottom: v, left: v })

export type UiBorder = {
  size: Sides<number>          // 枠線の太さ (px, 4辺別々)
  color: Sides<string>         // 枠線の色 (4辺別々)
  shadow: {
    offset: Sides<number>      // 影が各辺に伸びる距離 (px)
    color: string              // 影の色 (共通)
    blur: number               // 影のぼかし半径 (共通)
  }
}

export type Settings = {
  // フォント
  fontKanji: string
  fontKana: string
  fontAlnum: string

  // セクション
  sectionSize: Record<SectionKey, number>
  sectionColors: Record<SectionKey, string | null>  // null なら textColor 継承
  sectionLineHeight: Record<SectionKey, number>
  sectionLetterSpacing: Record<SectionKey, number>

  // テキスト装飾
  direction: 'horizontal-tb' | 'vertical-rl'
  textColor: string

  // Editor (全画面の入力エリア)
  editorWidth: number                              // %
  editorBgColor: string
  editorBgImage: string | null
  editorRule: 'none' | 'horizontal' | 'dot'
  editorRuleColor: string
  editorImageFrame: 'none' | 'photo' | 'letter' | 'sns'
  editorImageRotate: number

  // UI 共通
  uiBgColor: string                                // Button/Panel の背景色
  buttonBorderRadius: number                       // 全ButtonUI共通
  panelBorderRadius: number                        // 全PanelUI共通
  buttonBorder: UiBorder                           // 全ButtonUI共通
  panelBorder: UiBorder                            // 全PanelUI共通
  panelTextColor: string | null                    // 全PanelUI内の文字色 (null=textColor継承)

  // Menu 機能
  menuPosition: { x: number; y: number }           // %
  menuSlide: 'top' | 'bottom' | 'left' | 'right'
  menuButtonDesign: 'dots' | 'hamburger' | 'text' | 'seal' | 'flower' | 'upload'
  menuButtonImage: string | null

  // Files 機能
  files: boolean
  filesPosition: { x: number; y: number }
  filesSlide: 'top' | 'bottom' | 'left' | 'right'

  // その他
  mode: 'light' | 'dark'
  editorRuby?: Record<string, string>
}

function sectionSizesFor(normal: number): Record<SectionKey, number> {
  return { normal, h1: normal + 16, h2: normal + 12, h3: normal + 4, bold: normal + 3 }
}

function sectionLineHeightsFor(normal: number): Record<SectionKey, number> {
  return { normal, h1: 3.2, h2: 3.6, h3: 4.2, bold: 1 }
}

function sectionLetterSpacingsFor(normal: number): Record<SectionKey, number> {
  return { normal, h1: 0.08, h2: 0.06, h3: 0.04, bold: normal }
}

/** 全UIパーツ共通の影（Button / Panel 共通、全プリセット共通）。 */
const SHARED_SHADOW = {
  offset: { top: 0, right: 0, bottom: 2, left: 0 },
  color: 'rgba(0,0,0,0.14)',
  blur: 10,
}

/** 薄い一辺ボーダー + 共通の影。Panel 用。 */
function panelBorderOf(borderColor: string, _shadowColor?: string, _shadowBlur?: number): UiBorder {
  return {
    size: sides(1),
    color: sides(borderColor),
    shadow: SHARED_SHADOW,
  }
}

/** 薄い縁取り + 共通の影。Button 用。 */
function buttonBorderOf(borderColor: string, _shadowColor?: string): UiBorder {
  return {
    size: sides(1),
    color: sides(borderColor),
    shadow: SHARED_SHADOW,
  }
}

type KanjiFontId = 'shippori-mincho' | 'noto-serif-jp' | 'zen-old-mincho'
type KanaFontId = 'klee-one' | 'hina-mincho' | 'zen-kurenaido'
type AlnumFontId = 'inter' | 'eb-garamond' | 'cormorant'

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
  fontKanji: 'shippori-mincho',
  fontKana: 'shippori-mincho',
  fontAlnum: 'shippori-mincho',
  sectionSize: sectionSizesFor(16),
  sectionColors: { normal: '#373737', h1: '#949495', h2: '#949495', h3: '#949495', bold: '#373737' },
  sectionLineHeight: sectionLineHeightsFor(2.0),
  sectionLetterSpacing: sectionLetterSpacingsFor(0.02),
  direction: 'horizontal-tb',
  textColor: '#373737',
  editorWidth: 100,
  editorBgColor: '#fbfaf3',
  editorBgImage: null,
  editorRule: 'none',
  editorRuleColor: '#d4d4d8',
  editorImageFrame: 'none',
  editorImageRotate: 0,
  uiBgColor: '#fbfaf3',
  buttonBorderRadius: 8,
  panelBorderRadius: 24,
  buttonBorder: buttonBorderOf('rgba(17,17,17,0.1)'),
  panelBorder: panelBorderOf('#e5e5e5'),
  panelTextColor: null,
  menuPosition: { x: 91, y: 10 },
  menuSlide: 'right',
  menuButtonDesign: 'dots',
  menuButtonImage: null,
  files: true,
  filesPosition: { x: 9, y: 10 },
  filesSlide: 'left',
  mode: 'light',
}

export type PresetIcon = 'sun' | 'moon' | 'flower' | 'scroll' | 'book'

export const presets: Record<string, { label: string; icon: PresetIcon; settings: Settings; content: string[] }> = {
  default: {
    label: 'ライト',
    icon: 'sun',
    settings: {
      ...defaultSettings,
      sectionLineHeight: sectionLineHeightsFor(1.9),
      sectionLetterSpacing: sectionLetterSpacingsFor(0.02),
      buttonBorderRadius: 16,
      panelBorderRadius: 20,
    },
    content: [
      '# 僕を書くためのノート',
      'ここは、あなたの感情や思考をそのまま書き留める場所です。',
      '## 書き方',
      '「あと、」では、書く内容に合わせて、**自由に変えることができます**。',
      '### 見た目を整える',
      '夜の静かな時間には暗い背景を。手紙のように想いを綴りたいときは、縦書きと明朝体を。',
      '右上の設定アイコンから、あなたに一番馴染む形を探してみてください。',
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
      sectionLineHeight: sectionLineHeightsFor(2.3),
      sectionLetterSpacing: sectionLetterSpacingsFor(0.02),
      editorWidth: 92,
      textColor: '#e5e5ea',
      editorBgColor: '#1c1c1e',
      editorRule: 'dot',
      editorRuleColor: '#2a2a2a',
      uiBgColor: '#222224',
      buttonBorder: buttonBorderOf('rgba(229,229,234,0.15)', 'rgba(0,0,0,0.5)'),
      panelBorder: panelBorderOf('#333333', 'rgba(0,0,0,0.5)'),
      mode: 'dark',
      menuButtonDesign: 'hamburger',
      buttonBorderRadius: 6,
      panelBorderRadius: 14,
      menuSlide: 'left',
      filesSlide: 'left',
      menuPosition: { x: 9, y: 4 },
      filesPosition: { x: 9, y: 11 },
      sectionColors: { normal: null, h1: '#a8c7e8', h2: '#9b8b8b', h3: null, bold: null },
      panelTextColor: '#e5e5ea',
    },
    content: [
      '# 25:30',
      '終電を逃した。静かな部屋。',
      '窓を打つ雨音だけが響いてる。',
      '冷めた珈琲を飲みながら、今日の出来事を振り返る。',
      '## 焦燥',
      '何者かになりたいという思いだけが空回りしている気がする。ため息がこぼれる。',
      '明日こそは、何か変わるだろうか。',
      'https://josui.works/ja',
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
      sectionLineHeight: sectionLineHeightsFor(2.3),
      sectionLetterSpacing: sectionLetterSpacingsFor(0.04),
      editorWidth: 90,
      textColor: '#fce4ec',
      editorBgColor: '#fdf2f5',
      editorBgImage: nukoDark,
      editorRule: 'horizontal',
      editorRuleColor: '#f5d9e0',
      editorImageFrame: 'sns',
      editorImageRotate: -3,
      uiBgColor: '#fffafb',
      buttonBorder: buttonBorderOf('rgba(215,190,200,0.3)', 'rgba(215,190,200,0.25)'),
      panelBorder: panelBorderOf('#f2e1e6', 'rgba(215,190,200,0.25)'),
      menuButtonDesign: 'hamburger',
      buttonBorderRadius: 24,
      panelBorderRadius: 32,
      files: false,
      menuPosition: { x: 88, y: 90 },
      menuSlide: 'bottom',
      sectionColors: { normal: '#fce4ec', h1: '#ffb8ce', h2: '#ffd0dd', h3: null, bold: '#ffb8ce' },
      panelTextColor: '#6b5b60',
    },
    content: [
      '# さいこうの夜🌸',
      '今日のライブ、**本当に最高**だった！！',
      '推しと目が合った気がする(絶対合った！)💕',
      `![再結成ライブのワンシーン](${persona2Photo})`,
      '## セトリの神さ💗',
      'アンコールの一曲目、**ずっと聴きたかった曲**で号泣😭',
      '**一生ついていくって心に誓った日。**',
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
      sectionLineHeight: sectionLineHeightsFor(2.8),
      sectionLetterSpacing: sectionLetterSpacingsFor(0.08),
      editorWidth: 85,
      direction: 'vertical-rl',
      textColor: '#3d3934',
      editorBgColor: '#fcfaf2',
      editorBgImage: persona3Photo,
      editorRule: 'horizontal',
      editorRuleColor: '#d4c8b8',
      editorImageFrame: 'letter',
      editorImageRotate: 2,
      uiBgColor: '#fcfaf2',
      buttonBorder: buttonBorderOf('rgba(100,90,70,0.18)', 'rgba(100,90,70,0.12)'),
      panelBorder: panelBorderOf('#e6decf', 'rgba(100,90,70,0.08)'),
      menuButtonDesign: 'text',
      buttonBorderRadius: 4,
      panelBorderRadius: 8,
      menuSlide: 'left',
      files: false,
      menuPosition: { x: 8, y: 50 },
      sectionColors: { normal: null, h1: '#8c4a3a', h2: '#8c4a3a', h3: null, bold: '#c97a3f' },
      panelTextColor: '#3d3934',
    },
    content: [
      '# 秋の午後',
      '縁側で温かいお茶をすすりながら、庭の秋桜が風に揺れるのを眺めている。',
      '## 孫からの手紙',
      '**ぼくは元気です。おばあちゃんに会いたいです。**',
      'そんな一文だけで、今日はもう、じゅうぶん。',
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
      sectionLineHeight: sectionLineHeightsFor(3.0),
      sectionLetterSpacing: sectionLetterSpacingsFor(0.12),
      editorWidth: 80,
      direction: 'vertical-rl',
      textColor: '#2c2b29',
      editorBgColor: '#f2ede4',
      editorRule: 'horizontal',
      editorRuleColor: '#c4baa8',
      uiBgColor: '#ebe3d5',
      buttonBorder: buttonBorderOf('#5c4a44', 'rgba(0,0,0,0.18)'),
      panelBorder: panelBorderOf('#5c4a44', 'rgba(0,0,0,0.12)'),
      menuButtonDesign: 'seal',
      buttonBorderRadius: 2,
      panelBorderRadius: 4,
      menuSlide: 'bottom',
      filesSlide: 'bottom',
      files: false,
      menuPosition: { x: 50, y: 92 },
      editorRuby: {
        '晩秋': 'ばんしゅう',
        '感慨': 'かんがい',
        '憂鬱': 'ゆううつ',
        '珈琲': 'コーヒー',
        '喧騒': 'けんそう',
        '書斎': 'しょさい',
        '籠': 'こも',
      },
      sectionColors: { normal: null, h1: '#8c2e2e', h2: '#8c2e2e', h3: '#8c2e2e', bold: '#8c2e2e' },
      panelTextColor: '#2c2b29',
    },
    content: [
      '# 晩秋の感慨',
      '風立ちぬ、いざ生きめやも。',
      '古人の言葉が身に染みる季節となった。',
      '## 憂鬱なる日々',
      '世間の喧騒から離れ、独り書斎に籠もる。',
      '珈琲の苦味が、今の私には心地よい。',
    ],
  },
}

/* ============================================================
 * CSS 合成ヘルパ: UiBorder → inline style
 * ============================================================ */

export function borderToStyle(b: UiBorder): React.CSSProperties {
  const shadows: string[] = []
  const { offset, color, blur } = b.shadow
  if (offset.top > 0)    shadows.push(`0 -${offset.top}px ${blur}px ${color}`)
  if (offset.bottom > 0) shadows.push(`0 ${offset.bottom}px ${blur}px ${color}`)
  if (offset.right > 0)  shadows.push(`${offset.right}px 0 ${blur}px ${color}`)
  if (offset.left > 0)   shadows.push(`-${offset.left}px 0 ${blur}px ${color}`)
  return {
    borderTopWidth: b.size.top,
    borderRightWidth: b.size.right,
    borderBottomWidth: b.size.bottom,
    borderLeftWidth: b.size.left,
    borderTopColor: b.color.top,
    borderRightColor: b.color.right,
    borderBottomColor: b.color.bottom,
    borderLeftColor: b.color.left,
    borderStyle: 'solid',
    boxShadow: shadows.length > 0 ? shadows.join(', ') : undefined,
  }
}
