'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import { EditorState, Compartment, Prec } from '@codemirror/state'
import { EditorView, keymap, drawSelection } from '@codemirror/view'
import { defaultKeymap, history } from '@codemirror/commands'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { syntaxTree } from '@codemirror/language'
import {
  markdownDecorations,
  markdownDecorationsTheme,
  blockWidgetField,
} from './extensions/markdownDecorations'
import { urlPasteHandler } from './extensions/urlPaste'
import { markdownSurroundKeymap, markdownIndentKeymap, linkTooltipExtension } from './extensions/surroundInput'
import { softWrapIndent } from './extensions/softWrapIndent'

/**
 * 見出し行の装飾テキスト先頭でbackspace → `## `を全削除
 */
function headingBackspace(view: EditorView): boolean {
  const { state } = view
  const { head } = state.selection.main
  const line = state.doc.lineAt(head)
  const match = line.text.match(/^(#{2,3}) /)
  if (!match) return false

  const prefixLen = match[0].length
  // カーソルがプレフィックス内または直後にある場合
  if (head <= line.from + prefixLen) {
    view.dispatch({
      changes: { from: line.from, to: line.from + prefixLen },
    })
    return true
  }
  return false
}

/**
 * リンク・太字・画像のbackspace: 装飾内で1文字でも消したら装飾と記号を全削除
 */
function decorationBackspace(view: EditorView): boolean {
  const { state } = view
  const { head } = state.selection.main
  const line = state.doc.lineAt(head)

  // 画像: カーソルが行頭にあり、前の行が画像行なら画像行ごと削除
  if (head === line.from && line.number > 1) {
    const prevLine = state.doc.line(line.number - 1)
    if (/^!\[.*\]\(.*\)$/.test(prevLine.text)) {
      view.dispatch({
        changes: { from: prevLine.from, to: line.from },
      })
      return true
    }
  }

  // 画像: カーソルが行末にあり、次の行が画像行なら画像行ごと削除
  // （画像の1段上でbackspace → 行末にカーソルがある状態でDel相当ではないが、
  //   行末でbackspaceは通常の文字削除。行末+1=次の行の先頭でbackspaceは上で処理済み）
  // 画像行自体にカーソルがある場合（replaceで非表示だが境界にいる）→ 画像行を削除
  if (/^!\[.*\]\(.*\)$/.test(line.text)) {
    const from = line.from > 0 ? line.from - 1 : line.from // 前の改行も含める
    const to = line.to < state.doc.length ? line.to + 1 : line.to // 後の改行も含める
    view.dispatch({
      changes: { from, to },
    })
    return true
  }

  // 太字: **text** → カーソルがtext内にあるときbackspace → textのみ残す
  for (const m of line.text.matchAll(/\*\*([^*\n]+)\*\*/g)) {
    const from = line.from + m.index!
    const to = from + m[0].length
    const textStart = from + 2
    const textEnd = to - 2
    if (head > textStart && head <= textEnd) {
      const text = m[1]
      const newText = text.slice(0, head - textStart - 1) + text.slice(head - textStart)
      view.dispatch({
        changes: { from, to, insert: newText },
        selection: { anchor: from + (head - textStart - 1) },
      })
      return true
    }
    // カーソルが**の直後（テキスト先頭）にある場合 → 全削除してテキストのみ
    if (head === textStart) {
      view.dispatch({
        changes: { from, to, insert: m[1] },
        selection: { anchor: from },
      })
      return true
    }
  }

  // リンク: [text](url) → カーソルがtext内にあるときbackspace → textのみ残す
  const linkMatch = line.text.match(/\[([^\]]*)\]\(([^)]+)\)/)
  if (linkMatch) {
    const from = line.from + linkMatch.index!
    const to = from + linkMatch[0].length
    const textStart = from + 1
    const textEnd = textStart + linkMatch[1].length
    if (head > textStart && head <= textEnd) {
      const text = linkMatch[1]
      const newText = text.slice(0, head - textStart - 1) + text.slice(head - textStart)
      view.dispatch({
        changes: { from, to, insert: newText },
        selection: { anchor: from + (head - textStart - 1) },
      })
      return true
    }
    if (head === textStart) {
      view.dispatch({
        changes: { from, to, insert: linkMatch[1] },
        selection: { anchor: from },
      })
      return true
    }
  }

  return false
}

/**
 * 見出し行で` `入力時に、隠れた`## `と追加の`#`を統合
 * 例: `## #test` + ` ` → `### test`（`## ` は非表示なので、ユーザーには `#test` → `test`(H3) に見える）
 */
const headingSpaceConsolidate = EditorView.inputHandler.of(
  (view, from, _to, text) => {
    if (text !== ' ') return false
    const line = view.state.doc.lineAt(from)
    // 隠れたprefix `## ` の後に追加の `#` が続くパターン
    const match = line.text.match(/^(#{2,3}) (#{2,3})/)
    if (!match) return false

    // カーソルが追加`#`の直後にあるか確認
    const expectedCursorPos = line.from + match[1].length + 1 + match[2].length
    if (from !== expectedCursorPos) return false

    // `#`1つ → 既存に加算（## + # → ###）、`##`以上 → 置き換え（### + ## → ##）
    const newHashCount = match[2].length === 1
      ? Math.min(match[1].length + 1, 3)  // 加算（最大###）
      : match[2].length                    // 置き換え
    if (newHashCount < 2 || newHashCount > 3) return false

    const restText = line.text.slice(match[0].length)
    const newLine = '#'.repeat(newHashCount) + ' ' + restText
    view.dispatch({
      changes: { from: line.from, to: line.to, insert: newLine },
      selection: { anchor: line.from + newHashCount + 1 },
    })
    return true
  },
)


/**
 * 引用内でEnter → `> `の自動継続を無効化し、通常改行にする
 * 構文ツリーで Blockquote ノード内かどうかを判定
 */
function blockquoteEnter(view: EditorView): boolean {
  const { head } = view.state.selection.main

  // 構文ツリーでカーソル位置が Blockquote 内かチェック
  let inBlockquote = false
  syntaxTree(view.state).iterate({
    from: head,
    to: head,
    enter(node) {
      if (node.type.name === 'Blockquote') {
        inBlockquote = true
      }
    },
  })

  if (!inBlockquote) return false

  // 通常の改行を挿入（`> `の継続なし）
  view.dispatch({
    changes: { from: head, insert: '\n' },
    selection: { anchor: head + 1 },
  })
  return true
}

type UseCodeMirrorOptions = {
  initialContent: string
  disabled?: boolean
  onContentChange?: (content: string) => void
}

type UseCodeMirrorReturn = {
  editorRef: React.RefObject<HTMLDivElement | null>
  isReady: boolean
  charCount: number
  insertAtCursor: (text: string) => void
}

export function useCodeMirror({
  initialContent,
  disabled = false,
  onContentChange,
}: UseCodeMirrorOptions): UseCodeMirrorReturn {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const viewRef = useRef<EditorView | null>(null)
  const editableCompartment = useRef(new Compartment())
  const [isReady, setIsReady] = useState(false)
  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
    if (!editorRef.current) return

    // 既存のエディターをクリーンアップ
    if (viewRef.current) {
      viewRef.current.destroy()
      viewRef.current = null
    }

    const state = EditorState.create({
      doc: initialContent,
      extensions: [
        editableCompartment.current.of(EditorView.editable.of(!disabled)),
        drawSelection(),
        history(),
        headingSpaceConsolidate,
        markdownIndentKeymap,
        Prec.highest(keymap.of([
          { key: 'Backspace', run: (v) => decorationBackspace(v) || headingBackspace(v) },
          { key: 'Enter', run: blockquoteEnter },
        ])),
        keymap.of([...defaultKeymap]),
        markdownSurroundKeymap,
        linkTooltipExtension,
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
        }),
        markdownDecorations,
        markdownDecorationsTheme,
        blockWidgetField,
        urlPasteHandler,
        softWrapIndent,
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const content = update.state.doc.toString()
            setCharCount(content.length)
            onContentChange?.(content)
          }
        }),
        EditorView.theme({
          '&': {
            fontSize: '17.1px',
            lineHeight: '34.13px',
            fontFamily: 'inherit',
            height: '100%',
          },
          '&.cm-focused': {
            outline: 'none',
          },
          '.cm-scroller': {
            fontFamily: 'inherit',
            lineHeight: 'inherit',
            outline: 'none',
          },
          '.cm-content': {
            fontFamily: 'inherit',
            caretColor: 'transparent',
            wordBreak: 'break-all',
            overflowWrap: 'break-word',
            maxWidth: '100%',
            padding: '0',
          },
          '.cm-cursor, .cm-dropCursor': {
            borderLeftColor: 'var(--color-text-primary)',
            borderLeftWidth: '1.5px',
          },
          '.cm-line': {
            padding: '0',
            minHeight: '34.13px',
          },
          '.cm-line.cm-code-block': {
            paddingTop: '0',
            paddingBottom: '0',
          },
          '.cm-gutters': {
            display: 'none',
          },
          // リンクポップオーバー
          '.cm-tooltip': {
            border: 'none',
            backgroundColor: 'transparent',
          },
          '.cm-link-tooltip': {
            padding: '6px',
          },
          '.cm-link-tooltip-form': {
            display: 'flex',
            backgroundColor: 'white',
            borderRadius: '8px',
            border: '1px solid #e6e8e9',
            overflow: 'hidden',
            boxShadow: '0 0 0 1px rgba(0,0,0,0.09), 0 3px 8px -3px rgba(0,0,0,0.08)',
          },
          '.cm-link-tooltip-input': {
            width: '242px',
            padding: '6px 8px',
            border: 'none',
            outline: 'none',
            backgroundColor: '#f1f6f9',
            fontSize: '12.9px',
            fontFamily: 'inherit',
            letterSpacing: '0.483px',
          },
          '.cm-link-tooltip-btn': {
            padding: '6px 9px',
            border: 'none',
            borderLeft: '1px solid #e6e8e9',
            backgroundColor: 'white',
            fontSize: '12.9px',
            fontFamily: 'inherit',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            letterSpacing: '0.483px',
          },
        }),
      ],
    })

    const view = new EditorView({
      state,
      parent: editorRef.current,
    })

    viewRef.current = view
    setCharCount(initialContent.length)
    setIsReady(true)

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy()
        viewRef.current = null
      }
      setIsReady(false)
    }
  // initialContentの変更で再初期化は不要（エディタ切替時のみ）
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // disabled状態の変更を反映
  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.dispatch({
        effects: editableCompartment.current.reconfigure(
          EditorView.editable.of(!disabled),
        ),
      })
    }
  }, [disabled])

  const insertAtCursor = useCallback((text: string) => {
    const view = viewRef.current
    if (!view) return

    const { from } = view.state.selection.main
    const line = view.state.doc.lineAt(from)

    // 現在行が空行なら、その行に直接挿入（余計な改行を避ける）
    if (line.text === '') {
      view.dispatch({
        changes: { from: line.from, insert: `${text}\n` },
        selection: { anchor: line.from + text.length + 1 },
      })
    } else {
      // カーソル行の末尾の次の行に挿入
      view.dispatch({
        changes: { from: line.to, insert: `\n${text}\n` },
        selection: { anchor: line.to + 1 + text.length + 1 },
      })
    }
  }, [])

  return {
    editorRef,
    isReady,
    charCount,
    insertAtCursor,
  }
}
