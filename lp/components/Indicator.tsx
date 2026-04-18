'use client'

import { Minus, Plus } from 'lucide-react'

export function Indicator({
  label,
  value,
  onMinus,
  onPlus,
}: {
  label: string
  value: string
  onMinus: () => void
  onPlus: () => void
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium" style={{ color: 'var(--ui-sub)' }}>{label}</span>
      <div
        className="flex items-center gap-1 p-1 rounded-lg"
        style={{ background: 'var(--ui-surface)', border: `1px solid var(--ui-border)` }}
      >
        <button
          type="button"
          onClick={onMinus}
          className="w-7 h-7 flex items-center justify-center rounded-md cursor-pointer"
          style={{ color: 'var(--ui-fg)' }}
        >
          <Minus size={12} />
        </button>
        <div className="min-w-12 text-center text-xs" style={{ color: 'var(--ui-fg)' }}>{value}</div>
        <button
          type="button"
          onClick={onPlus}
          className="w-7 h-7 flex items-center justify-center rounded-md cursor-pointer"
          style={{ color: 'var(--ui-fg)' }}
        >
          <Plus size={12} />
        </button>
      </div>
    </div>
  )
}
