'use client'

export function Toggle({
  label,
  value,
  onChange,
}: {
  label: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[13px]" style={{ color: 'var(--ui-fg)' }}>{label}</span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        aria-pressed={value}
        className="relative w-10 h-6 rounded-full cursor-pointer"
        style={{
          background: value ? 'var(--ui-fg)' : 'var(--ui-border)',
          transition: 'background 0.15s',
        }}
      >
        <div
          className="absolute top-0.5 w-5 h-5 rounded-full"
          style={{
            background: 'var(--ui-bg)',
            left: value ? 18 : 2,
            transition: 'left 0.15s',
          }}
        />
      </button>
    </div>
  )
}
