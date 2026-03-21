/**
 * URLペースト時のマークダウン自動変換拡張
 * URLをペーストしたとき、自動的にマークダウンリンク形式に変換する
 * @see 画面設計
 */

import { EditorView } from '@codemirror/view'

/**
 * URLかどうかを判定
 */
function isUrl(text: string): boolean {
  try {
    const url = new URL(text)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * 画像URLかどうかを判定
 */
function isImageUrl(url: string): boolean {
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.bmp', '.ico']
  const lowerUrl = url.toLowerCase()
  return imageExtensions.some((ext) => lowerUrl.includes(ext))
}

/**
 * URLからタイトルを取得（ドメイン名またはパス名）
 */
function getUrlTitle(url: string): string {
  try {
    const parsed = new URL(url)
    // パス名がある場合はパスの最後の部分を使用
    if (parsed.pathname && parsed.pathname !== '/') {
      const pathParts = parsed.pathname.split('/').filter(Boolean)
      if (pathParts.length > 0) {
        const lastPart = pathParts[pathParts.length - 1]
        // ファイル名っぽい場合は拡張子を除去
        if (lastPart) {
          return lastPart.replace(/\.[^.]+$/, '') || parsed.hostname
        }
      }
    }
    // パスがない場合はドメイン名
    return parsed.hostname
  } catch {
    return url
  }
}

/**
 * ペーストされたテキストをマークダウンリンクに変換
 * @param text ペーストされたテキスト
 * @param selectedText 選択中のテキスト（リンクテキストとして使用）
 * @returns 変換結果。shouldHandleがfalseの場合は処理不要
 */
function handleUrlPaste(
  text: string,
  selectedText: string,
): { shouldHandle: boolean; markdownLink?: string } {
  if (!text || !isUrl(text)) {
    return { shouldHandle: false }
  }

  let markdownLink: string
  if (isImageUrl(text)) {
    // 画像URLの場合は画像埋め込み形式
    const alt = selectedText || ''
    markdownLink = `![${alt}](${text})`
  } else {
    // 通常のURLはリンク形式
    const linkText = selectedText || getUrlTitle(text)
    markdownLink = `[${linkText}](${text})`
  }

  return { shouldHandle: true, markdownLink }
}

/**
 * URLペースト時にマークダウン形式に変換するイベントハンドラ
 */
export const urlPasteHandler = EditorView.domEventHandlers({
  paste(event, view) {
    const clipboardData = event.clipboardData
    if (!clipboardData) return false

    const text = clipboardData.getData('text/plain').trim()
    const selection = view.state.selection.main
    const selectedText = view.state.sliceDoc(selection.from, selection.to)

    const result = handleUrlPaste(text, selectedText)
    if (!result.shouldHandle) return false

    // URLの場合、マークダウン形式に変換して挿入
    event.preventDefault()

    view.dispatch({
      changes: {
        from: selection.from,
        to: selection.to,
        insert: result.markdownLink!,
      },
      selection: {
        anchor: selection.from + result.markdownLink!.length,
      },
    })

    return true
  },
})
