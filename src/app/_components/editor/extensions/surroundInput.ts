/**
 * テキスト選択時の記号ラップ入力拡張
 * 選択状態で記号キーを押すと、選択テキストの両端に記号が挿入される
 * 連打で記号が増える（例: * → ** → ***）
 */

import { EditorSelection, StateEffect, StateField } from '@codemirror/state'
import { EditorView, keymap, showTooltip, type Tooltip } from '@codemirror/view'
import { indentMore, indentLess } from '@codemirror/commands'

/**
 * 選択テキストを指定文字でラップするキーハンドラーを生成
 * - 選択なし: デフォルト動作（通常入力）
 * - 選択あり: 両端にラップし、コンテンツのみ再選択（連打で記号が増える）
 */
function surroundWith(char: string) {
  return (view: EditorView): boolean => {
    const { state } = view

    // 全レンジが空ならデフォルト入力に任せる
    if (state.selection.ranges.every((r) => r.empty)) return false

    view.dispatch({
      ...state.changeByRange((range) => {
        if (range.empty) {
          // 複数カーソルで空の場合は通常挿入
          return {
            changes: [{ from: range.from, insert: char }],
            range: EditorSelection.cursor(range.from + char.length),
          }
        }
        // 選択あり: 両端にラップ、コンテンツのみ再選択
        return {
          changes: [
            { from: range.from, insert: char },
            { from: range.to, insert: char },
          ],
          range: EditorSelection.range(
            range.from + char.length,
            range.to + char.length,
          ),
        }
      }),
      userEvent: 'input',
    })

    return true
  }
}

/**
 * ⌘+B: 太字トグル（選択テキストを**で囲む / 解除）
 */
function toggleBold(view: EditorView): boolean {
  const { state } = view
  const { from, to } = state.selection.main

  if (from === to) {
    // 選択なし: **|** を挿入してカーソルを中央に
    view.dispatch({
      changes: { from, insert: '****' },
      selection: EditorSelection.cursor(from + 2),
    })
    return true
  }

  const selected = state.sliceDoc(from, to)
  // 既に**で囲まれていたら解除
  if (selected.startsWith('**') && selected.endsWith('**') && selected.length > 4) {
    view.dispatch({
      changes: { from, to, insert: selected.slice(2, -2) },
      selection: EditorSelection.range(from, to - 4),
    })
    return true
  }

  // **で囲む
  view.dispatch({
    changes: [
      { from, insert: '**' },
      { from: to, insert: '**' },
    ],
    selection: EditorSelection.range(from + 2, to + 2),
  })
  return true
}

/**
 * リンクポップオーバー用のStateEffect/StateField
 */
type LinkTooltipState = { from: number; to: number; text: string } | null

const openLinkTooltip = StateEffect.define<{ from: number; to: number; text: string }>()
const closeLinkTooltip = StateEffect.define<null>()

const linkTooltipField = StateField.define<LinkTooltipState>({
  create() { return null },
  update(value, tr) {
    for (const e of tr.effects) {
      if (e.is(openLinkTooltip)) return e.value
      if (e.is(closeLinkTooltip)) return null
    }
    return value
  },
  provide(field) {
    return showTooltip.compute([field], (state): Tooltip | null => {
      const val = state.field(field)
      if (!val) return null
      return {
        pos: val.from,
        above: true,
        strictSide: true,
        create(view) {
          const dom = document.createElement('div')
          dom.className = 'cm-link-tooltip'

          const form = document.createElement('div')
          form.className = 'cm-link-tooltip-form'

          const input = document.createElement('input')
          input.type = 'text'
          input.placeholder = 'https://'
          input.className = 'cm-link-tooltip-input'

          const btn = document.createElement('button')
          btn.type = 'button'
          btn.textContent = '適用'
          btn.className = 'cm-link-tooltip-btn'

          const apply = () => {
            const url = input.value.trim()
            if (!url) return
            const linkText = val.text || url
            const md = `[${linkText}](${url})`
            view.dispatch({
              changes: { from: val.from, to: val.to, insert: md },
              effects: closeLinkTooltip.of(null),
            })
            view.focus()
          }

          btn.addEventListener('click', apply)
          input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); apply() }
            if (e.key === 'Escape') {
              view.dispatch({ effects: closeLinkTooltip.of(null) })
              view.focus()
            }
          })

          form.appendChild(input)
          form.appendChild(btn)
          dom.appendChild(form)

          requestAnimationFrame(() => input.focus())

          return { dom }
        },
      }
    })
  },
})

/**
 * ⌘+K: リンクポップオーバーを表示
 */
function insertLink(view: EditorView): boolean {
  const { from, to } = view.state.selection.main
  const text = from !== to ? view.state.sliceDoc(from, to) : ''
  view.dispatch({ effects: openLinkTooltip.of({ from, to, text }) })
  return true
}

/** リンクポップオーバー拡張（useCodeMirrorに追加が必要） */
export const linkTooltipExtension = linkTooltipField

/**
 * ⌘+Shift+|: ルビ挿入（選択テキストにルビを付ける）
 */
function insertRuby(view: EditorView): boolean {
  const { state } = view
  const { from, to } = state.selection.main

  if (from === to) {
    // 選択なし: ｜《》 を挿入、｜の後にカーソル
    view.dispatch({
      changes: { from, insert: '｜《》' },
      selection: EditorSelection.cursor(from + 1),
    })
  } else {
    // 選択あり: ｜選択テキスト《》 に変換、《》内にカーソル
    const text = state.sliceDoc(from, to)
    const insert = `｜${text}《》`
    view.dispatch({
      changes: { from, to, insert },
      selection: EditorSelection.cursor(from + 1 + text.length + 1),
    })
  }
  return true
}

/**
 * マークダウン記号ラップキーマップ
 *   * を押す: *text*   連打: **text** → ***text*** ...
 *   ` を押す: `text`
 *   " を押す: "text"
 *   ' を押す: 'text'
 *   ~ を押す: ~text~
 */
export const markdownSurroundKeymap = keymap.of([
  { key: '*', run: surroundWith('*') },
  { key: '`', run: surroundWith('`') },
  { key: '"', run: surroundWith('"') },
  { key: "'", run: surroundWith("'") },
  { key: '~', run: surroundWith('~') },
  { key: 'Mod-b', run: toggleBold },
  { key: 'Mod-k', run: insertLink },
  { key: 'Mod-Shift-\\', run: insertRuby },
])

/**
 * Tab / Shift+Tab インデントキーマップ
 *   Tab:       行頭に indent を追加（カーソル・範囲選択どちらも対応）
 *   Shift+Tab: 行頭の indent を削除（端まで達したら止まる）
 */
export const markdownIndentKeymap = keymap.of([
  { key: 'Tab', run: indentMore },
  { key: 'Shift-Tab', run: indentLess },
])
