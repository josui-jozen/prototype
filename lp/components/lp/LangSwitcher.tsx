'use client'

import { useState } from 'react'
import './LangSwitcher.css'

type LangItem = { code: string; label: string; href: string }

/**
 * 言語切替ドロップダウン。i18n 実装からは独立し、
 * 呼び出し側から current (現在の言語コード) と langs (全候補) を受け取る。
 * 表示リストからは current を自動で除外する。
 */
export default function LangSwitcher({
  current,
  langs,
  triggerLabel = 'language',
}: {
  current: string
  langs: LangItem[]
  triggerLabel?: string
}) {
  const [open, setOpen] = useState(false)
  const others = langs.filter(l => l.code !== current)
  return (
    <div className={`lang-switcher ${open ? 'is-open' : ''}`}>
      <button className="lang-trigger" onClick={() => setOpen(!open)}>{triggerLabel}</button>
      <div className="lang-options">
        <div>
          {others.map(l => (
            <a key={l.code} href={l.href} className="lang-option">{l.label}</a>
          ))}
        </div>
      </div>
    </div>
  )
}
