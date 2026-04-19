'use client'

import { useEffect } from 'react'
import './tailwind.css'
import './page.css'
import { FolderOpen, Search, FileText } from 'lucide-react'
import { presets, defaultSettings as D, type Settings } from '@/app/[lang]/ato/test/components/settings'
import { Editor } from '@/app/[lang]/ato/test/components/Editor'
import { IconButton } from '@/app/[lang]/ato/test/components/Button'
import { Panel } from '@/app/[lang]/ato/test/components/Panel'
import { MenuButtonIcon } from '@/app/[lang]/ato/test/components/MenuButtonIcon'

const PRESET_KEYS = ['default', 'persona1', 'persona2', 'persona3'] as const

export default function AtoDesignSystemPage() {
  useEffect(() => {
    document.documentElement.style.setProperty('--ato-root-bg', D.editorBgColor)
  }, [])

  const content = [
    '# 「あと、」デザインシステム',

    '## 1. 概要',

    '### プロダクトについて',
    '「あと、」は、情報伝達のための文字ではなく、自己の感情表現のためのエディターである。日記・エッセイ・ポエム・手紙など、書き手がその瞬間の感情を、その瞬間に書き留める行為を支える。既存エディター（Notion・Obsidian・VSCode等）が情報の整理・蓄積・効率性を軸に置くのに対し、「あと、」は**自分の言語表現と自身に対する肯定と愛着**を軸に据える。',
    'このプロダクトでは、課題の解決ではなく、共感できる思想の提案によって価値を届ける。「書く → 自分の言葉が自分好みに表示される → 自分の言葉だと感じられる → 自分の表現に愛着が湧く → また書きたくなる」このループを回すため、機能ではなく見た目（UIのカスタム性）に比重を置く。',

    '### 価値提供対象について',
    '本ドキュメントでは価値提供の対象を明示するため、ユーザーではなく**書き手**と表記する。これは、このプロダクトが「使う人」ではなく「書く人」のためのものであるという立場を、用語レベルで保つためである。',

    '## 2. 思想',

    '### 1. まず「変更不可領域」を定義する',
    'このプロダクトは、書き手の個性を尊重し、高い自由度を価値として訴求する。だが、高過ぎる自由度は設計・実装を破綻させてしまう。故に、固定するべき最低限の要素（変更不可領域）をまず言語化することで、実装可能性と自由度が自ずと両立するような設計の土台を築く。',
    '【具体的な変更不可領域】',
    <ul key="immutable">
      <li>・全画面をエディタとし、常に書き手の文章にスポットを当てる</li>
      <li>・画面上のどこかに必ずメニューボタンを存在させ、行動不能状態を防ぐ</li>
      <li>・テキスト選択/IME変換色などはデバイスに従い、認知可能性を担保する</li>
      <li>・ロゴや広告の表示は強制せず、書き手の世界観を壊さない</li>
    </ul>,

    '### 2. 書き手の世界を破壊しない',
    'このプロダクトは、書き手の内面を何よりも尊重する。故に、ロゴや広告など、開発側の都合の要素を書き手に強制してはならない。',

    '### 3. 書き手の認知に基づき設計する',
    '例えば機能分類を行う場合、モーダルやボタンなどのシステム開発の概念ではなく、文字や紙などの書き手の認知に寄り添った概念を用いる。開発の正しさよりも、書き手の「わかる」を優先する。',

    '### 4. 書き手の選択肢を奪わない',
    '雰囲気や装飾の決定権は常に書き手にあり、実装はその要望をできる限り実現する。選択肢を増やせば認知コストも増大するため、書き手に負担を与えることなく、その上で求められれば選択肢を提供する。',

    '## 3. トークン',
    'トークンは、書き手が設定を触っていない「素の状態」の初期値として定義する。通常のデザインシステムと違い、**これらは固定パレットではなく、書き手の設定によってすべて上書きされる**。実装者は「何もカスタムされていないときの基準」として、また書き手の設定が部分的にしか与えられないときのフォールバックとして、この値を参照する。',

    '### 色',
    <table key="tbl-color">
      <thead>
        <tr><th>名前</th><th>初期値</th><th>プレビュー</th><th>意味</th></tr>
      </thead>
      <tbody>
        <tr><td><code>textColor</code></td><td><code>{D.textColor}</code></td><td><DesignTokenPreview.Swatch color={D.textColor} /></td><td>本文の文字色</td></tr>
        <tr><td><code>sectionColors.h1-3 / bold</code></td><td><code>{D.sectionColors.h1 ?? D.textColor}</code></td><td><DesignTokenPreview.Swatch color={D.sectionColors.h1 ?? D.textColor} /></td><td>見出し・強調の個別色</td></tr>
        <tr><td><code>editorBgColor</code></td><td><code>{D.editorBgColor}</code></td><td><DesignTokenPreview.Swatch color={D.editorBgColor} /></td><td>Editorの背景色</td></tr>
        <tr><td><code>uiBgColor</code></td><td><code>{D.uiBgColor}</code></td><td><DesignTokenPreview.Swatch color={D.uiBgColor} /></td><td>Button/Panelの背景色</td></tr>
      </tbody>
    </table>,

    '### タイポ',
    <table key="tbl-typo">
      <thead>
        <tr><th>名前</th><th>初期値</th><th>プレビュー</th><th>意味</th></tr>
      </thead>
      <tbody>
        <tr><td><code>fontKanji</code></td><td><code>{D.fontKanji}</code></td><td><span style={{ fontFamily: `'${D.fontKanji}'`, fontSize: 18 }}>漢字表示例</span></td><td>漢字の字体</td></tr>
        <tr><td><code>fontKana</code></td><td><code>{D.fontKana}</code></td><td><span style={{ fontFamily: `'${D.fontKana}'`, fontSize: 18 }}>あいうえお</span></td><td>かなの字体</td></tr>
        <tr><td><code>fontAlnum</code></td><td><code>{D.fontAlnum}</code></td><td><span style={{ fontFamily: `'${D.fontAlnum}'`, fontSize: 18 }}>Aa Bb 123</span></td><td>英数字の字体</td></tr>
        <tr><td><code>sectionSize.normal</code></td><td><code>{D.sectionSize.normal}px</code></td><td><span style={{ fontSize: D.sectionSize.normal }}>本文</span></td><td>本文サイズ</td></tr>
        <tr><td><code>sectionSize.h1</code></td><td><code>{D.sectionSize.h1}px</code></td><td><span style={{ fontSize: D.sectionSize.h1, fontWeight: 700 }}>見出</span></td><td>見出し1</td></tr>
        <tr><td><code>sectionSize.h2</code></td><td><code>{D.sectionSize.h2}px</code></td><td><span style={{ fontSize: D.sectionSize.h2, fontWeight: 700 }}>見出</span></td><td>見出し2</td></tr>
        <tr><td><code>sectionSize.h3</code></td><td><code>{D.sectionSize.h3}px</code></td><td><span style={{ fontSize: D.sectionSize.h3, fontWeight: 700 }}>見出</span></td><td>見出し3</td></tr>
        <tr><td><code>sectionSize.bold</code></td><td><code>{D.sectionSize.bold}px</code></td><td><span style={{ fontSize: D.sectionSize.bold, fontWeight: 700 }}>太字</span></td><td>太字</td></tr>
        <tr><td><code>sectionLineHeight.normal</code></td><td><code>{D.sectionLineHeight.normal}</code></td><td><DesignTokenPreview.LineHeight value={D.sectionLineHeight.normal} /></td><td>本文の行間</td></tr>
        <tr><td><code>sectionLineHeight.h1</code></td><td><code>{D.sectionLineHeight.h1}</code></td><td><DesignTokenPreview.LineHeight value={D.sectionLineHeight.h1} bold /></td><td>見出し1の行間</td></tr>
        <tr><td><code>sectionLineHeight.h2</code></td><td><code>{D.sectionLineHeight.h2}</code></td><td><DesignTokenPreview.LineHeight value={D.sectionLineHeight.h2} bold /></td><td>見出し2の行間</td></tr>
        <tr><td><code>sectionLineHeight.h3</code></td><td><code>{D.sectionLineHeight.h3}</code></td><td><DesignTokenPreview.LineHeight value={D.sectionLineHeight.h3} bold /></td><td>見出し3の行間</td></tr>
        <tr><td><code>sectionLineHeight.bold</code></td><td><code>{D.sectionLineHeight.bold}</code></td><td><DesignTokenPreview.LineHeight value={D.sectionLineHeight.bold} bold /></td><td>太字の行間</td></tr>
        <tr><td><code>sectionLetterSpacing.normal</code></td><td><code>{D.sectionLetterSpacing.normal}em</code></td><td><span style={{ letterSpacing: `${D.sectionLetterSpacing.normal}em` }}>あいうえお abc</span></td><td>本文の文字間</td></tr>
        <tr><td><code>sectionLetterSpacing.h1</code></td><td><code>{D.sectionLetterSpacing.h1}em</code></td><td><span style={{ letterSpacing: `${D.sectionLetterSpacing.h1}em`, fontWeight: 700 }}>あいうえお abc</span></td><td>見出し1の文字間</td></tr>
        <tr><td><code>sectionLetterSpacing.h2</code></td><td><code>{D.sectionLetterSpacing.h2}em</code></td><td><span style={{ letterSpacing: `${D.sectionLetterSpacing.h2}em`, fontWeight: 700 }}>あいうえお abc</span></td><td>見出し2の文字間</td></tr>
        <tr><td><code>sectionLetterSpacing.h3</code></td><td><code>{D.sectionLetterSpacing.h3}em</code></td><td><span style={{ letterSpacing: `${D.sectionLetterSpacing.h3}em`, fontWeight: 700 }}>あいうえお abc</span></td><td>見出し3の文字間</td></tr>
        <tr><td><code>sectionLetterSpacing.bold</code></td><td><code>{D.sectionLetterSpacing.bold}em</code></td><td><span style={{ letterSpacing: `${D.sectionLetterSpacing.bold}em`, fontWeight: 700 }}>あいうえお abc</span></td><td>太字の文字間</td></tr>
      </tbody>
    </table>,

    '### 角丸',
    <table key="tbl-radius">
      <thead>
        <tr><th>名前</th><th>初期値</th><th>プレビュー</th><th>意味</th></tr>
      </thead>
      <tbody>
        <tr><td><code>buttonBorderRadius</code></td><td><code>{D.buttonBorderRadius}px</code></td><td><DesignTokenPreview.Box style={{ borderRadius: D.buttonBorderRadius }} /></td><td>Buttonの角丸</td></tr>
        <tr><td><code>panelBorderRadius</code></td><td><code>{D.panelBorderRadius}px</code></td><td><DesignTokenPreview.Box style={{ borderRadius: D.panelBorderRadius }} /></td><td>Panelの角丸</td></tr>
      </tbody>
    </table>,

    '### 枠線',
    <table key="tbl-border">
      <thead>
        <tr><th>名前</th><th>初期値</th><th>プレビュー</th><th>意味</th></tr>
      </thead>
      <tbody>
        <tr><td><code>buttonBorder.size</code></td><td><code>1px</code>（全辺）</td><td><DesignTokenPreview.Box style={{ border: '1px solid var(--ato-sumi)' }} /></td><td>Button枠線の太さ（4辺個別指定可）</td></tr>
        <tr><td><code>buttonBorder.color</code></td><td><code>rgba(17,17,17,0.1)</code></td><td><DesignTokenPreview.Box style={{ border: '1px solid rgba(17,17,17,0.1)' }} /></td><td>Button枠線の色（4辺個別指定可）</td></tr>
        <tr><td><code>panelBorder.size</code></td><td><code>1px</code>（全辺）</td><td><DesignTokenPreview.Box style={{ border: '1px solid var(--ato-sumi)' }} /></td><td>Panel枠線の太さ（4辺個別指定可）</td></tr>
        <tr><td><code>panelBorder.color</code></td><td><code>#e5e5e5</code></td><td><DesignTokenPreview.Box style={{ border: '1px solid #e5e5e5' }} /></td><td>Panel枠線の色（4辺個別指定可）</td></tr>
      </tbody>
    </table>,

    '### 影',
    <table key="tbl-shadow">
      <thead>
        <tr><th>名前</th><th>初期値</th><th>プレビュー</th><th>意味</th></tr>
      </thead>
      <tbody>
        <tr><td><code>buttonBorder.shadow</code></td><td>下<code>2px</code> / <code>rgba(0,0,0,0.14)</code> / ぼかし<code>10px</code></td><td><DesignTokenPreview.Box style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.14)' }} /></td><td>Buttonの影</td></tr>
        <tr><td><code>panelBorder.shadow</code></td><td>下<code>2px</code> / <code>rgba(0,0,0,0.14)</code> / ぼかし<code>10px</code></td><td><DesignTokenPreview.Box style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.14)' }} /></td><td>Panelの影（Buttonと同じ）</td></tr>
      </tbody>
    </table>,

    '### サイズ',
    <table key="tbl-size">
      <thead>
        <tr><th>名前</th><th>初期値</th><th>プレビュー</th><th>意味</th></tr>
      </thead>
      <tbody>
        <tr><td><code>editorWidth</code></td><td><code>100%</code></td><td></td><td>Editorのコンテンツ幅</td></tr>
      </tbody>
    </table>,

    '## 4. コンポーネントと状態',

    '### Editor',
    '全画面の入力エリア。背景・文字色・フォントは上記トークンで制御。',
    <div key="demo-editor" className="demo">
      {PRESET_KEYS.map((k) => {
        const s = presets[k].settings
        return (
          <div key={k} className="demo-cell">
            <DesignComponentPreview.Editor settings={s} />
            <div>{presets[k].label}</div>
          </div>
        )
      })}
    </div>,

    '### Button',
    '全機能共通のアイコンボタン。枠線・影・角丸・背景色・位置・アイコン画像が可変。',
    <div key="demo-button" className="demo">
      {PRESET_KEYS.map((k) => {
        const s = presets[k].settings
        const fg = s.panelTextColor ?? s.textColor
        return (
          <div key={k} className="demo-cell">
            <div style={{ display: 'flex', gap: 8 }}>
              <IconButton settings={s}>
                <MenuButtonIcon design={s.menuButtonDesign} image={s.menuButtonImage} color={fg} />
              </IconButton>
              <IconButton settings={s}>
                <FolderOpen size={20} strokeWidth={1.4} style={{ color: fg }} />
              </IconButton>
            </div>
            <div>{presets[k].label}</div>
          </div>
        )
      })}
    </div>,

    '### Panel',
    'Buttonから開かれる面。枠線・影・角丸・背景色・開く方向が可変。',
    <div key="demo-panel" className="demo">
      {PRESET_KEYS.map((k) => {
        const s = presets[k].settings
        return (
          <div key={k} className="demo-cell">
            <div className="panel-wrap">
              <Panel settings={s}>
                <DesignComponentPreview.PanelContent settings={s} />
              </Panel>
            </div>
            <div>{presets[k].label}</div>
          </div>
        )
      })}
    </div>,

    '### 状態',
    '（hover / focus / disabled / loading — 実装追加時に記述）',

    '## 5. 禁則',
    '（随時追加）',
  ]

  return (
    <article className="ds">
      <Editor settings={D} content={content} />
    </article>
  )
}

const DesignTokenPreview = {
  Swatch({ color }: { color: string }) {
    return (
      <span
        style={{
          display: 'inline-block',
          width: 36,
          height: 20,
          borderRadius: 2,
          background: color,
          border: '1px solid var(--ato-border)',
          verticalAlign: 'middle',
        }}
      />
    )
  },

  Box({ style }: { style: React.CSSProperties }) {
    return (
      <span
        style={{
          display: 'inline-block',
          width: 48,
          height: 28,
          background: 'color-mix(in srgb, var(--ato-sumi) 18%, var(--ato-tsukishiro))',
          verticalAlign: 'middle',
          ...style,
        }}
      />
    )
  },

  LineHeight({ value, bold = false }: { value: number; bold?: boolean }) {
    return (
      <span
        style={{
          display: 'inline-block',
          lineHeight: value,
          fontSize: 12,
          fontWeight: bold ? 700 : 400,
          whiteSpace: 'pre-line',
          verticalAlign: 'middle',
        }}
      >
        {'一行目\n二行目'}
      </span>
    )
  },
}

const DesignComponentPreview = {
  PanelContent({ settings }: { settings: Settings }) {
    const fg = settings.panelTextColor ?? settings.textColor
    const sub = `color-mix(in srgb, ${fg} 55%, ${settings.uiBgColor} 45%)`
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 8px', borderRadius: 6, border: `1px solid ${settings.panelBorder.color.top}` }}>
          <Search size={11} style={{ color: sub }} />
          <span style={{ fontSize: 10, color: sub }}>検索...</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 8 }}>
          {['無題のノート', '雨の日のこと', '新しい始まり'].map((n) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 6px' }}>
              <FileText size={11} style={{ color: sub }} />
              <span style={{ fontSize: 10, color: fg }}>{n}</span>
            </div>
          ))}
        </div>
      </>
    )
  },

  Editor({ settings }: { settings: Settings }) {
    const bg = settings.editorBgImage
      ? `url("${settings.editorBgImage}") center/cover`
      : settings.editorBgColor
    const ruleBg =
      settings.editorRule === 'horizontal'
        ? `repeating-linear-gradient(to bottom, transparent 0, transparent 13px, ${settings.editorRuleColor} 13px, ${settings.editorRuleColor} 14px)`
        : settings.editorRule === 'dot'
        ? `radial-gradient(circle, ${settings.editorRuleColor} 1px, transparent 1px) 0 0 / 10px 10px`
        : 'none'
    const h1Color = settings.sectionColors.h1 ?? settings.textColor
    return (
      <div
        style={{
          width: 130,
          height: 90,
          background: bg,
          color: settings.textColor,
          borderRadius: 4,
          overflow: 'hidden',
          position: 'relative',
          fontFamily: `'${settings.fontKanji}', 'Shippori Mincho', serif`,
          border: '1px solid var(--ato-border)',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundImage: ruleBg, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', padding: 10, fontSize: 9, lineHeight: 1.6 }}>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: h1Color, lineHeight: 1.3 }}>見出し</div>
          <div>本文が流れる。</div>
        </div>
      </div>
    )
  },
}
