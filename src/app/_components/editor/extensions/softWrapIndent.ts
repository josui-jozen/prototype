/**
 * ソフトラップ（折り返し）インデント継続拡張
 * 折り返し時に視覚的な先頭文字位置（スペース・リストマーカー・引用符の後）
 * と同じ水平位置で継続させる
 *
 * 手法: padding-left: calc(24px + Xch); text-indent: -Xch
 *   - 継続行は 24px + Xch の位置から開始
 *   - text-indent で先頭行を Xch 左にずらし、見た目の先頭は 24px に
 *   - 結果: 先頭文字位置（24px + Xch）と継続行が一致
 */

import { Decoration, DecorationSet, EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view'
import { RangeSetBuilder } from '@codemirror/state'
import { syntaxTree } from '@codemirror/language'

/**
 * 行の視覚的プレフィックス長を文字数で返す
 * 対象: 先頭スペース・リストマーカー（- * + 1.）・引用マーカー（>）
 */
function getVisualPrefixLength(text: string): number {
  const match = text.match(/^(\s*(?:[-*+]|\d+[.)>]|>)\s+|\s+)/)
  return match ? match[0].length : 0
}

function buildDecorations(view: EditorView): DecorationSet {
  const builder = new RangeSetBuilder<Decoration>()

  // コードブロック範囲を収集（内部行はスキップ）
  const codeRanges: { from: number; to: number }[] = []
  syntaxTree(view.state).iterate({
    from: 0,
    to: view.state.doc.length,
    enter(node) {
      if (node.type.name === 'FencedCode' || node.type.name === 'CodeBlock') {
        codeRanges.push({ from: node.from, to: node.to })
      }
    },
  })
  const inCodeBlock = (pos: number) => codeRanges.some((r) => pos >= r.from && pos <= r.to)

  for (const { from, to } of view.visibleRanges) {
    for (let pos = from; pos <= to; ) {
      const line = view.state.doc.lineAt(pos)

      if (!inCodeBlock(line.from)) {
        const indent = getVisualPrefixLength(line.text)
        if (indent > 0) {
          builder.add(
            line.from,
            line.from,
            Decoration.line({
              attributes: {
                style: `padding-left: ${indent}ch; text-indent: -${indent}ch`,
              },
            }),
          )
        }
      }

      pos = line.to + 1
    }
  }

  return builder.finish()
}

export const softWrapIndent = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet

    constructor(view: EditorView) {
      this.decorations = buildDecorations(view)
    }

    update(update: ViewUpdate) {
      if (update.docChanged || update.viewportChanged) {
        this.decorations = buildDecorations(update.view)
      }
    }
  },
  { decorations: (v) => v.decorations },
)
