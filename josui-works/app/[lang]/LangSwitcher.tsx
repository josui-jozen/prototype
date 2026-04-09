'use client'

import { useState } from 'react'
import { messages, langs, type Lang } from '../i18n'

export default function LangSwitcher({ current }: { current: Lang }) {
  const [open, setOpen] = useState(false)
  const others = langs.filter(l => l !== current)

  return (
    <div className={`lang-switcher ${open ? 'is-open' : ''}`}>
      <button className="lang-trigger" onClick={() => setOpen(!open)}>language</button>
      <div className="lang-options">
        <div>
          {others.map(l => (
            <a key={l} href={`/${l}`} className="lang-option">
              {messages[l].label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
