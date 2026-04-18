'use client'

import { useRef } from 'react'
import { Check } from 'lucide-react'

export function UploadPicker({
  value,
  onChange,
  selected = false,
  className = '',
  accept = 'image/*',
  children,
}: {
  value: string | null
  onChange: (dataUrl: string) => void
  selected?: boolean
  className?: string
  accept?: string
  children: React.ReactNode
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const handleClick = () => inputRef.current?.click()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => onChange(reader.result as string)
    reader.readAsDataURL(file)
    e.target.value = ''
  }
  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`relative cursor-pointer overflow-hidden ${className}`}
        style={{
          borderRadius: 12,
          border: selected ? `2px solid var(--ui-fg)` : `1px solid var(--ui-border)`,
          backgroundColor: 'var(--ui-surface)',
          backgroundImage: value ? `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url("${value}")` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: value ? '#fff' : 'var(--ui-fg)',
        }}
      >
        {selected && (
          <div
            className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: '#fff', color: '#000' }}
          >
            <Check size={12} strokeWidth={3} />
          </div>
        )}
        {children}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />
    </>
  )
}
