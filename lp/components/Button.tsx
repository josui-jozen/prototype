'use client'

import React from 'react'

export function IconButton({ children, style, type = 'button', ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        cursor: 'pointer',
        background: 'transparent',
        border: 'none',
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  )
}

export function PrimaryButton({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full py-3 rounded-[10px] text-[13px] font-medium cursor-pointer ${className}`}
      style={{ background: 'var(--ui-fg)', color: 'var(--ui-bg)' }}
    >
      {children}
    </button>
  )
}
