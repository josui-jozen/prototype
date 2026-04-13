import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

export const HeartbeatCaret = Extension.create({
  name: 'heartbeatCaret',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('heartbeatCaret'),
        props: {
          decorations(state) {
            const { from, to } = state.selection
            if (from !== to) return null
            return DecorationSet.create(state.doc, [
              Decoration.widget(from, () => {
                const el = document.createElement('span')
                el.className = 'ato-heartbeat-caret'
                el.setAttribute('contenteditable', 'false')
                return el
              }, { side: 0, key: 'heartbeat-caret' }),
            ])
          },
        },
      }),
    ]
  },
})
