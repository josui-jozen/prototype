import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import type { Node as ProseMirrorNode } from '@tiptap/pm/model'

// ひらがな、カタカナ、長音、約物
const KANA_REGEX = /[\u3040-\u309F\u30A0-\u30FF\uFF66-\uFF9F\u3000-\u303F]/
// CJK統合漢字、拡張A
const KANJI_REGEX = /[\u4E00-\u9FFF\u3400-\u4DBF]/
function classifyChar(ch: string): 'kana' | 'kanji' | null {
  if (KANA_REGEX.test(ch)) return 'kana'
  if (KANJI_REGEX.test(ch)) return 'kanji'
  return null
}

const PUNCT_END_REGEX = /[、。，．]/

function buildDecorations(doc: ProseMirrorNode): DecorationSet {
  const decorations: Decoration[] = []

  doc.descendants((node, pos) => {
    if (!node.isText || !node.text) return

    const text = node.text
    let start = 0
    let currentType: 'kana' | 'kanji' | null = classifyChar(text[0])

    for (let i = 1; i <= text.length; i++) {
      const type = i < text.length ? classifyChar(text[i]) : null
      if (type !== currentType || i === text.length) {
        if (currentType) {
          decorations.push(
            Decoration.inline(pos + start, pos + i, {
              class: `ato-${currentType}`,
            })
          )
        }
        start = i
        currentType = type
      }
    }

    for (let i = 0; i < text.length; i++) {
      if (PUNCT_END_REGEX.test(text[i])) {
        decorations.push(
          Decoration.inline(pos + i, pos + i + 1, { class: 'ato-punct-end' })
        )
      }
    }
  })

  return DecorationSet.create(doc, decorations)
}

export const ScriptDecoration = Extension.create({
  name: 'scriptDecoration',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('scriptDecoration'),
        state: {
          init(_, { doc }) {
            return buildDecorations(doc)
          },
          apply(tr, old) {
            return tr.docChanged ? buildDecorations(tr.doc) : old
          },
        },
        props: {
          decorations(state) {
            return this.getState(state)
          },
        },
      }),
    ]
  },
})
