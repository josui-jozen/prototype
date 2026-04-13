import { Mark, mergeAttributes, InputRule } from '@tiptap/core'

export const Ruby = Mark.create({
  name: 'ruby',
  inclusive: false,

  addAttributes() {
    return {
      reading: {
        default: '',
        parseHTML: (element: HTMLElement) => {
          if (element.tagName === 'RUBY') {
            return element.querySelector('rt')?.textContent ?? ''
          }
          return element.getAttribute('data-reading') ?? ''
        },
        renderHTML: (attributes) => ({ 'data-reading': attributes.reading }),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'ruby',
        // rt要素は本文テキストから除外
        contentElement: (node: Node | string) => {
          if (typeof node === 'string') return node as unknown as HTMLElement
          const el = node as HTMLElement
          const clone = el.cloneNode(true) as HTMLElement
          clone.querySelectorAll('rt').forEach((rt) => rt.remove())
          return clone
        },
      },
      { tag: 'span[data-reading]' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0]
  },

  addInputRules() {
    return [
      new InputRule({
        find: /\{([^|]+)\|([^}]+)\}\s$/,
        handler: ({ state, range, match }) => {
          const base = match[1]
          const reading = match[2]
          const { tr } = state
          const mark = state.schema.marks.ruby.create({ reading })
          tr.replaceWith(range.from, range.to, state.schema.text(base, [mark]))
        },
      }),
    ]
  },
})
