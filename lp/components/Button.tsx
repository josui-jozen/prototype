'use client'

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
