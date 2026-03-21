/**
 * マークダウン装飾拡張
 * Mark/Line Decorationでマークダウン記法にスタイルを適用
 */

import {
  Decoration,
  DecorationSet,
  EditorView,
  ViewPlugin,
  ViewUpdate,
  WidgetType,
} from '@codemirror/view'
import { createElement } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { Tweet } from 'react-tweet'
import { syntaxTree } from '@codemirror/language'
import { type EditorState, RangeSetBuilder, StateField } from '@codemirror/state'

// 見出しのスタイル定義（## 見出し / ### 小見出し のみ）
const headingStyles: Record<number, Decoration> = {
  2: Decoration.line({ class: 'cm-heading cm-heading-2' }),
  3: Decoration.line({ class: 'cm-heading cm-heading-3' }),
}

// Mark Decorationの定義
const boldMark = Decoration.mark({ class: 'cm-bold' })
const italicMark = Decoration.mark({ class: 'cm-italic' })
const strikethroughMark = Decoration.mark({ class: 'cm-strikethrough' })
const inlineCodeMark = Decoration.mark({ class: 'cm-inline-code' })
const linkMark = Decoration.mark({ class: 'cm-link' })
const codeBlockLine = Decoration.line({ class: 'cm-code-block' })
const syntaxMarkerMark = Decoration.mark({ class: 'cm-syntax-marker' })
const syntaxMarkerHidden = Decoration.replace({})

// リスト・番号付きリスト・引用のLine Decoration
const blockquoteLine = Decoration.line({ class: 'cm-blockquote' })

// 引用スペーサーウィジェット（`> ` を左マージンに置換）
class BlockquoteSpacerWidget extends WidgetType {
  toDOM(): HTMLElement {
    const span = document.createElement('span')
    span.className = 'cm-blockquote-spacer'
    span.setAttribute('aria-hidden', 'true')
    return span
  }
  override eq(): boolean { return true }
}

// リストビュレットウィジェット
class BulletWidget extends WidgetType {
  toDOM(): HTMLElement {
    const span = document.createElement('span')
    span.className = 'cm-list-marker'
    span.setAttribute('aria-hidden', 'true')
    // CSSで描画する丸ドット
    const dot = document.createElement('span')
    dot.className = 'cm-list-disc'
    span.appendChild(dot)
    return span
  }
  override eq(): boolean { return true }
}

// 番号付きリストウィジェット
class OrderedListMarkerWidget extends WidgetType {
  constructor(readonly num: number) { super() }
  toDOM(): HTMLElement {
    const span = document.createElement('span')
    span.className = 'cm-list-marker cm-list-marker-ordered'
    span.textContent = `${this.num}.`
    span.setAttribute('aria-hidden', 'true')
    return span
  }
  override eq(other: OrderedListMarkerWidget): boolean { return this.num === other.num }
}

// 区切り線ウィジェット（`---` → hr.svgイラスト）
class HorizontalRuleWidget extends WidgetType {
  toDOM(): HTMLElement {
    const container = document.createElement('div')
    container.className = 'cm-hr-preview'
    const img = document.createElement('img')
    img.src = '/images/hr.svg'
    img.alt = ''
    img.className = 'cm-hr-image'
    container.appendChild(img)
    return container
  }
  override eq(): boolean { return true }
  override get estimatedHeight(): number { return 29 }
}

// 画像プレビューウィジェット
class ImageWidget extends WidgetType {
  constructor(readonly url: string, readonly alt: string) {
    super()
  }

  override get estimatedHeight(): number {
    return 216
  }

  toDOM(): HTMLElement {
    const container = document.createElement('div')
    container.className = 'cm-image-preview cm-image-loading'

    const img = document.createElement('img')
    img.src = this.url
    img.alt = this.alt
    img.loading = 'lazy'
    img.onload = () => {
      container.classList.remove('cm-image-loading')
    }
    img.onerror = () => {
      container.classList.remove('cm-image-loading')
      container.classList.add('cm-image-error')
      container.textContent = '画像を読み込めませんでした'
    }

    container.appendChild(img)
    return container
  }

  override eq(other: ImageWidget): boolean {
    return this.url === other.url && this.alt === other.alt
  }
}

// 動画プレビューウィジェット（YouTube/Vimeo）
class VideoWidget extends WidgetType {
  constructor(
    readonly embedUrl: string,
    readonly title: string,
  ) {
    super()
  }

  override get estimatedHeight(): number {
    return 216
  }

  toDOM(): HTMLElement {
    const container = document.createElement('div')
    container.className = 'cm-video-preview'

    const iframe = document.createElement('iframe')
    iframe.src = this.embedUrl
    iframe.title = this.title
    iframe.allow =
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
    iframe.allowFullscreen = true
    iframe.loading = 'lazy'
    container.appendChild(iframe)

    return container
  }

  override eq(other: VideoWidget): boolean {
    return this.embedUrl === other.embedUrl
  }
}

/**
 * X/Twitter URLからツイートIDを抽出
 */
function getTweetId(url: string): string | null {
  const match = url.match(/(?:x\.com|twitter\.com)\/(?:\w+)\/status\/(\d+)/)
  return match?.[1] ?? null
}

// ツイート埋め込みウィジェット（react-tweetで描画）
class TweetWidget extends WidgetType {
  private root: Root | null = null

  constructor(readonly tweetId: string, readonly url: string) {
    super()
  }

  override get estimatedHeight(): number {
    return 300
  }

  toDOM(): HTMLElement {
    const container = document.createElement('div')
    container.className = 'cm-tweet-embed'
    container.setAttribute('data-theme', 'light')

    this.root = createRoot(container)
    this.root.render(
      createElement(Tweet, { id: this.tweetId }),
    )

    return container
  }

  override destroy(): void {
    const root = this.root
    if (root) {
      this.root = null
      queueMicrotask(() => root.unmount())
    }
  }

  override eq(other: TweetWidget): boolean {
    return this.tweetId === other.tweetId
  }
}

/**
 * 構文ツリーから装飾を構築
 */
function buildDecorations(view: EditorView): DecorationSet {
  const markDecs: { from: number; to: number; deco: Decoration }[] = []
  const lineDecorations: { pos: number; deco: Decoration }[] = []

  // --- 見出し検出: パーサーに頼らず行テキストから直接判定 ---
  for (let i = 1; i <= view.state.doc.lines; i++) {
    const line = view.state.doc.line(i)
    const match = line.text.match(/^(#{2,3}) /)
    if (match) {
      const level = match[1].length
      const prefixLen = match[0].length
      const headingDeco = headingStyles[level]
      if (headingDeco) {
        lineDecorations.push({ pos: line.from, deco: headingDeco })
      }
      // `## ` を非表示（replace）
      markDecs.push({
        from: line.from,
        to: line.from + prefixLen,
        deco: syntaxMarkerHidden,
      })
    }

    // リスト: `- text` → `- ` をビュレットウィジェットに置換
    const listMatch = line.text.match(/^(- )/)
    if (listMatch && !match) {
      markDecs.push({
        from: line.from,
        to: line.from + listMatch[0].length,
        deco: Decoration.replace({ widget: new BulletWidget() }),
      })
    }

    // 番号付きリスト: `1. text` → `1. ` を番号ウィジェットに置換
    const olMatch = line.text.match(/^(\d+)\. /)
    if (olMatch && !match) {
      const num = parseInt(olMatch[1], 10)
      markDecs.push({
        from: line.from,
        to: line.from + olMatch[0].length,
        deco: Decoration.replace({ widget: new OrderedListMarkerWidget(num) }),
      })
    }

    // 引用: `> text` → 引用ボックス（`> `をスペーサーに置換してテキストを右にずらす）
    const quoteMatch = line.text.match(/^> /)
    if (quoteMatch && !match) {
      lineDecorations.push({ pos: line.from, deco: blockquoteLine })
      markDecs.push({
        from: line.from,
        to: line.from + quoteMatch[0].length,
        deco: Decoration.replace({ widget: new BlockquoteSpacerWidget() }),
      })
    }

    // 区切り線: `---` → hr.svgウィジェット
    if (line.text === '---' && !match) {
      markDecs.push({
        from: line.from,
        to: line.to,
        deco: Decoration.replace({
          widget: new HorizontalRuleWidget(),
        }),
      })
    }

  }

  // --- 構文ツリーベース: 見出し以外の装飾 ---
  syntaxTree(view.state).iterate({
    from: 0,
    to: view.state.doc.length,
    enter(node) {
      const nodeType = node.type.name

      // 取り消し線
      if (nodeType === 'Strikethrough') {
        markDecs.push({ from: node.from, to: node.to, deco: strikethroughMark })
      }

      // インラインコード
      if (nodeType === 'InlineCode') {
        markDecs.push({ from: node.from, to: node.to, deco: inlineCodeMark })
      }

      // リンク（完成した構文のみ）: `[text](url)` → `text`（リンクスタイル、記号非表示）
      if (nodeType === 'Link') {
        const text = view.state.sliceDoc(node.from, node.to)
        const linkMatch = text.match(/^\[([^\]]*)\]\(([^)]+)\)$/)
        if (linkMatch) {
          const bracketOpen = node.from          // `[`
          const textStart = node.from + 1        // text開始
          const textEnd = textStart + linkMatch[1].length  // text終了
          const bracketCloseAndUrl = textEnd     // `](url)`
          const end = node.to                    // `)`の後
          // `[` を非表示
          markDecs.push({ from: bracketOpen, to: textStart, deco: syntaxMarkerHidden })
          // テキスト部分にリンクスタイル
          markDecs.push({ from: textStart, to: textEnd, deco: linkMark })
          // `](url)` を非表示
          markDecs.push({ from: bracketCloseAndUrl, to: end, deco: syntaxMarkerHidden })
        }
      }

      // 画像: `![alt](url)` → テキスト全体を非表示（プレビューウィジェットのみ表示）
      if (nodeType === 'Image') {
        const lastChar = view.state.sliceDoc(node.to - 1, node.to)
        if (lastChar === ')') {
          markDecs.push({ from: node.from, to: node.to, deco: syntaxMarkerHidden })
        }
      }

      // コードブロック
      if (nodeType === 'FencedCode') {
        const startLine = view.state.doc.lineAt(node.from)
        const endLine = view.state.doc.lineAt(node.to)
        for (let i = startLine.number; i <= endLine.number; i++) {
          const line = view.state.doc.line(i)
          lineDecorations.push({ pos: line.from, deco: codeBlockLine })
        }
      }

      // マークダウン記号の非表示（EmphasisMark = ** / *）
      if (nodeType === 'EmphasisMark') {
        markDecs.push({ from: node.from, to: node.to, deco: syntaxMarkerHidden })
      }
      // その他の記号（表示のみ変更）
      if (nodeType === 'CodeMark' || nodeType === 'StrikethroughMark') {
        markDecs.push({ from: node.from, to: node.to, deco: syntaxMarkerMark })
      }
    },
  })

  // 正規表現ベース: 太字・斜体（全角記号隣接などツリーが取りこぼすケースを補完）
  const codeRanges: { from: number; to: number }[] = []
  syntaxTree(view.state).iterate({
    from: 0,
    to: view.state.doc.length,
    enter(node) {
      if (node.type.name === 'InlineCode' || node.type.name === 'FencedCode') {
        codeRanges.push({ from: node.from, to: node.to })
      }
    },
  })
  const inCode = (from: number, to: number) =>
    codeRanges.some((r) => from >= r.from && to <= r.to)

  for (let lineNum = 1; lineNum <= view.state.doc.lines; lineNum++) {
    const line = view.state.doc.line(lineNum)
    // 太字: **...**
    for (const match of line.text.matchAll(/\*\*([^*\n]+)\*\*/g)) {
      const from = line.from + match.index!
      const to = from + match[0].length
      if (!inCode(from, to)) {
        markDecs.push({ from, to, deco: boldMark })
      }
    }
    // 斜体: *...* （** は除外）
    for (const match of line.text.matchAll(/(?<!\*)\*(?!\*)([^*\n]+?)(?<!\*)\*(?!\*)/g)) {
      const from = line.from + match.index!
      const to = from + match[0].length
      if (!inCode(from, to)) {
        markDecs.push({ from, to, deco: italicMark })
      }
    }
  }

  // Mark Decorationをソートして RangeSetBuilder に追加
  markDecs.sort((a, b) => a.from - b.from || (a.deco as any).startSide - (b.deco as any).startSide || a.to - b.to)
  const markBuilder = new RangeSetBuilder<Decoration>()
  for (const { from, to, deco } of markDecs) {
    markBuilder.add(from, to, deco)
  }
  const markDecorations = markBuilder.finish()

  // Line Decoration をマージして返す
  if (lineDecorations.length === 0) {
    return markDecorations
  }

  return markDecorations.update({
    add: lineDecorations.map(({ pos, deco }) => deco.range(pos)),
    sort: true,
  })
}

/**
 * URLが画像かどうかを判定
 */
function isImageUrl(url: string): boolean {
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.bmp', '.ico']
  const lowerUrl = url.toLowerCase()
  return imageExtensions.some((ext) => lowerUrl.endsWith(ext))
}

/**
 * URLがHTTP/HTTPSかどうかを判定
 */
function isHttpUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('blob:')
}

/**
 * YouTube URLから埋め込みURLを取得
 */
function getYouTubeEmbedUrl(url: string): string | null {
  const watchMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/)
  if (watchMatch?.[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`
  }
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (shortMatch?.[1]) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`
  }
  const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/)
  if (embedMatch?.[1]) {
    return url
  }
  return null
}

/**
 * Vimeo URLから埋め込みURLを取得
 */
function getVimeoEmbedUrl(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/)
  if (match?.[1]) {
    return `https://player.vimeo.com/video/${match[1]}`
  }
  return null
}

/**
 * 動画の埋め込みURLを取得
 */
function getVideoEmbedUrl(url: string): string | null {
  return getYouTubeEmbedUrl(url) || getVimeoEmbedUrl(url)
}

/**
 * ブロックウィジェットデコレーションを構築（画像・動画・ツイート）
 */
function buildBlockWidgetDecorations(state: EditorState): DecorationSet {
  const decorations: { pos: number; widget: Decoration }[] = []

  syntaxTree(state).iterate({
    from: 0,
    to: state.doc.length,
    enter(node) {
      // 画像
      if (node.type.name === 'Image') {
        const text = state.sliceDoc(node.from, node.to)
        const match = text.match(/!\[([^\]]*)\]\(([^)]+)\)/)
        if (match) {
          const alt = match[1] ?? ''
          const rawUrl = match[2]
          if (rawUrl && (isImageUrl(rawUrl) || rawUrl.startsWith('blob:'))) {
            const line = state.doc.lineAt(node.to)
            decorations.push({
              pos: line.to,
              widget: Decoration.widget({
                widget: new ImageWidget(rawUrl, alt),
                block: true,
                side: 1,
              }),
            })
          }
        }
      }

      // リンク → 動画 / ツイート
      if (node.type.name === 'Link') {
        const text = state.sliceDoc(node.from, node.to)
        const match = text.match(/\[([^\]]*)\]\(([^)]+)\)/)
        if (match?.[2]) {
          const title = match[1] ?? ''
          const url = match[2]

          if (isImageUrl(url)) {
            // 画像URLはImageノードで処理済み
          } else if (getVideoEmbedUrl(url)) {
            const embedUrl = getVideoEmbedUrl(url)!
            const line = state.doc.lineAt(node.to)
            decorations.push({
              pos: line.to,
              widget: Decoration.widget({
                widget: new VideoWidget(embedUrl, title),
                block: true,
                side: 1,
              }),
            })
          } else if (isHttpUrl(url)) {
            const tweetId = getTweetId(url)
            if (tweetId) {
              const line = state.doc.lineAt(node.to)
              decorations.push({
                pos: line.to,
                widget: Decoration.widget({
                  widget: new TweetWidget(tweetId, url),
                  block: true,
                  side: 1,
                }),
              })
            }
          }
        }
      }
    },
  })

  decorations.sort((a, b) => a.pos - b.pos)

  const builder = new RangeSetBuilder<Decoration>()
  for (const { pos, widget } of decorations) {
    builder.add(pos, pos, widget)
  }

  return builder.finish()
}


/**
 * マークダウン装飾のViewPlugin
 */
export const markdownDecorations = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet

    constructor(view: EditorView) {
      this.decorations = buildDecorations(view)
    }

    update(update: ViewUpdate) {
      this.decorations = buildDecorations(update.view)
    }
  },
  {
    decorations: (v) => v.decorations,
  },
)

/**
 * ブロックウィジェット（画像・動画・ツイート）用のStateField
 * block: true のデコレーションはViewPluginから提供できないため、StateFieldで管理
 */
export const blockWidgetField = StateField.define<DecorationSet>({
  create(state) {
    return buildBlockWidgetDecorations(state)
  },
  update(decorations, tr) {
    if (tr.docChanged) {
      return buildBlockWidgetDecorations(tr.state)
    }
    // 構文ツリー更新時にも再構築
    if (syntaxTree(tr.state).length >= tr.state.doc.length) {
      const rebuilt = buildBlockWidgetDecorations(tr.state)
      if (rebuilt.size > 0 || decorations.size > 0) {
        return rebuilt
      }
    }
    return decorations
  },
  provide: (field) => EditorView.decorations.from(field),
})

/**
 * マークダウン装飾用のテーマ
 */
export const markdownDecorationsTheme = EditorView.baseTheme({
  // 見出し（## 見出し / ### 小見出し のみ）
  '.cm-heading': {
    fontWeight: 'bold',
    color: 'var(--color-text-secondary)',
  },
  '.cm-heading-2': {
    fontSize: '1.5em',
    lineHeight: '1.4',
  },
  '.cm-heading-3': {
    fontSize: '1.25em',
    lineHeight: '1.4',
  },

  // リスト・番号マーカー（インライン配置、`- `の代わりに表示）
  '.cm-list-marker': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.4em',
    userSelect: 'none',
    verticalAlign: 'baseline',
  },
  // ビュレット丸ドット
  '.cm-list-disc': {
    display: 'inline-block',
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-text-primary)',
  },
  // 番号付きマーカー
  '.cm-list-marker-ordered': {
    width: '1.8em',
  },

  // 引用
  '.cm-blockquote': {
    backgroundColor: '#f7fafc',
    border: '1px solid #ebeef2',
    borderRadius: '19.32px',
    paddingTop: '19px !important',
    paddingBottom: '19px !important',
    color: '#595f63',
    marginLeft: '2px',
    marginRight: '2px',
  },
  // 引用スペーサー（`> `の代わりにインライン余白を確保）
  '.cm-blockquote-spacer': {
    display: 'inline-block',
    width: '20px',
  },

  // 区切り線（hr.svg）
  '.cm-hr-preview': {
    display: 'block',
    padding: '6px 0',
    height: '29px',
    boxSizing: 'content-box',
    overflow: 'visible',
  },
  '.cm-hr-image': {
    width: '100%',
    height: '29px',
    display: 'block',
  },

  // 太字
  '.cm-bold': {
    fontWeight: '600',
    color: 'var(--color-text-primary)',
  },

  // 斜体
  '.cm-italic': {
    fontStyle: 'italic',
    color: 'var(--color-text-secondary)',
  },

  // 取り消し線
  '.cm-strikethrough': {
    textDecoration: 'line-through',
    color: 'var(--color-text-secondary)',
  },

  // 記号（未確定 — 表示）
  '.cm-syntax-marker': {
    color: 'var(--color-text-muted)',
  },


  // インラインコード
  '.cm-inline-code': {
    fontFamily: 'var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace)',
    color: 'var(--color-text-secondary)',
    backgroundColor: 'var(--color-bg-secondary)',
    padding: '0 0.3em',
    borderRadius: '3px',
  },

  // コードブロック
  '.cm-code-block': {
    fontFamily: 'var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace)',
    color: 'var(--color-text-secondary)',
    fontSize: '0.875em',
    backgroundColor: 'var(--color-bg-secondary)',
    backgroundClip: 'content-box',
    paddingTop: '0',
    paddingBottom: '0',
  },

  // リンク
  '.cm-link': {
    color: '#595f63',
    textDecoration: 'underline',
    textDecorationStyle: 'dotted',
    textDecorationColor: '#a7abb1',
  },

  // 画像プレビュー
  '.cm-image-preview': {
    display: 'block',
    padding: '8px 0',
    maxWidth: '100%',
    height: '216px',
    boxSizing: 'border-box',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  '.cm-image-preview.cm-image-loading': {
    backgroundColor: 'var(--color-bg-secondary)',
  },
  '.cm-image-preview.cm-image-loading img': {
    opacity: '0',
  },
  '.cm-image-preview img': {
    maxWidth: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  '.cm-image-preview.cm-image-error': {
    color: '#dc2626',
    fontSize: '0.875em',
    padding: '8px 0',
    backgroundColor: '#fef2f2',
    borderRadius: '4px',
  },

  // 動画プレビュー
  '.cm-video-preview': {
    display: 'block',
    margin: '8px 0',
    maxWidth: '100%',
    aspectRatio: '16/9',
    borderRadius: '4px',
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  '.cm-video-preview iframe': {
    width: '100%',
    height: '100%',
    border: 'none',
  },

  // ツイート埋め込み
  '.cm-tweet-embed': {
    display: 'block',
    padding: '4px 0',
    maxWidth: '100%',
    boxSizing: 'border-box',
  },
  '.cm-tweet-embed p': {
    fontSize: '1rem !important',
  },
  '.cm-tweet-embed [aria-label="View video on X"]': {
    display: 'none',
  },

})
