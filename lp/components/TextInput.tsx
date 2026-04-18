'use client'

export function TextInput({
  value,
  onChange,
  placeholder,
  multiline = false,
  monospace = false,
  rows = 4,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  multiline?: boolean
  monospace?: boolean
  rows?: number
}) {
  const baseClass = 'w-full px-3 py-2 rounded-[8px] outline-none resize-none'
  const typeClass = monospace ? 'text-[11px] leading-[1.6] font-mono' : 'text-[13px]'
  const style: React.CSSProperties = {
    background: 'var(--ui-surface)',
    border: `1px solid var(--ui-border)`,
    color: 'var(--ui-sub)',
  }
  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`${baseClass} ${typeClass}`}
        style={style}
      />
    )
  }
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${baseClass} ${typeClass}`}
      style={style}
    />
  )
}
