'use client'

import './tailwind.css'
import './page.css'
import { PhoneMockup } from '@/components/PhoneMockup'
import { Editor } from './components/Editor'
import { presets } from './components/settings'

const ORDER = [
  { key: 'default', label: 'デフォルト', interactive: true },
  { key: 'persona1', label: '20代男性', interactive: true },
  { key: 'persona2', label: '20代女性', interactive: true },
  { key: 'persona3', label: '50代女性', interactive: true },
  { key: 'persona4', label: '70代男性', interactive: true },
]

export default function TestPage() {
  return (
    <div className="ato-test min-h-screen py-16 px-8 flex flex-col items-center font-sans" style={{ background: 'var(--test-bg)', color: 'var(--test-fg)' }}>
      <div className="mb-12 text-center space-y-2 opacity-80">
        <h1 className="text-xl tracking-[0.2em] font-light" style={{ color: 'var(--test-heading)' }}>「あと、」</h1>
        <p className="text-[13px] tracking-wider" style={{ color: 'var(--test-sub)' }}>書く人の数だけ、言葉の形がある。</p>
      </div>

      <div className="flex flex-wrap gap-6 justify-center items-start">
        {ORDER.map((o) => {
          const p = presets[o.key]
          return (
            <div key={o.key} className="flex flex-col items-center gap-4">
              <div style={{ transform: 'scale(0.45)', transformOrigin: 'top center', width: 393, height: 400 }}>
                <PhoneMockup>
                  <Editor settings={p.settings} content={p.content} interactive={o.interactive} />
                </PhoneMockup>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm font-medium" style={{ color: 'var(--test-heading)' }}>{o.label}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
