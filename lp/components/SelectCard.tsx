'use client'

import { Check } from 'lucide-react'

export function SelectCard({
  selected,
  onClick,
  className = '',
  style,
  children,
}: {
  selected: boolean
  onClick: () => void
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  const textColor = (style?.color as string | undefined) ?? 'var(--ui-fg)'
  const bgColor = (style?.background as string | undefined) ?? 'var(--ui-bg)'
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative cursor-pointer text-center leading-tight ${className}`}
      style={{
        borderRadius: 12,
        border: selected ? `2px solid ${textColor}` : `1px solid var(--ui-border)`,
        background: 'transparent',
        color: 'var(--ui-fg)',
        ...style,
      }}
    >
      {selected && (
        <div
          className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: textColor, color: bgColor }}
        >
          <Check size={12} strokeWidth={3} />
        </div>
      )}
      {children}
    </button>
  )
}
