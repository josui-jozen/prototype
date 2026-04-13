'use client'

import type { ReactNode, MouseEvent } from 'react'

type Props = {
  open: boolean
  onOpen: () => void
  onClose: () => void
  isDark: boolean
  position: 'top-right' | 'bottom-left'
  size: 'full' | 'half'
  icon: ReactNode
  closeIcon?: ReactNode
  ariaLabel: string
  children: ReactNode
}

export default function ToolPanel({
  open,
  onOpen,
  onClose,
  isDark,
  position,
  size,
  icon,
  closeIcon,
  ariaLabel,
  children,
}: Props) {
  const rootClass = [
    'ato-tool-panel',
    `is-pos-${position}`,
    `is-size-${size}`,
    open ? 'is-open' : '',
    isDark ? 'is-dark' : '',
  ].filter(Boolean).join(' ')

  return (
    <div
      className={rootClass}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={() => { if (!open) onOpen() }}
    >
      <button
        type="button"
        className="ato-tool-panel-toggle"
        onClick={(e: MouseEvent) => { if (open) { e.stopPropagation(); onClose() } }}
        aria-label={ariaLabel}
      >
        {open && closeIcon ? closeIcon : icon}
      </button>
      <div className="ato-tool-panel-body">{children}</div>
    </div>
  )
}
