'use client'

import { useRef } from 'react'
import { Check, Minus, Plus } from 'lucide-react'

/* ============================================================
 * 共通UIパーツ
 * すべての色・フォントは CSS 変数 (--ato-*) 経由で設定され、
 * AtoCanvas が settings から注入する。
 * ============================================================ */

/* -------- 決定ボタン -------- */
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
      style={{ background: 'var(--ato-text)', color: 'var(--ato-bg)' }}
    >
      {children}
    </button>
  )
}

/* -------- 入力欄 -------- */
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
    background: 'var(--ato-button-bg)',
    border: `1px solid var(--ato-border)`,
    color: 'var(--ato-sub)',
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

/* -------- インジケーター (値表示 + -/+) -------- */
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
      <span className="text-[12px] font-medium" style={{ color: 'var(--ato-sub)' }}>{label}</span>
      <div
        className="flex items-center gap-1 p-1 rounded-[8px]"
        style={{ background: 'var(--ato-button-bg)', border: `1px solid var(--ato-border)` }}
      >
        <button
          type="button"
          onClick={onMinus}
          className="w-7 h-7 flex items-center justify-center rounded-md cursor-pointer"
          style={{ color: 'var(--ato-text)' }}
        >
          <Minus size={12} />
        </button>
        <div className="min-w-[48px] text-center text-[12px]" style={{ color: 'var(--ato-text)' }}>{value}</div>
        <button
          type="button"
          onClick={onPlus}
          className="w-7 h-7 flex items-center justify-center rounded-md cursor-pointer"
          style={{ color: 'var(--ato-text)' }}
        >
          <Plus size={12} />
        </button>
      </div>
    </div>
  )
}

/* -------- 有効化スイッチ -------- */
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
      <span className="text-[13px]" style={{ color: 'var(--ato-text)' }}>{label}</span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        aria-pressed={value}
        className="relative w-10 h-6 rounded-full cursor-pointer"
        style={{
          background: value ? 'var(--ato-text)' : 'var(--ato-border)',
          transition: 'background 0.15s',
        }}
      >
        <div
          className="absolute top-0.5 w-5 h-5 rounded-full"
          style={{
            background: 'var(--ato-bg)',
            left: value ? 18 : 2,
            transition: 'left 0.15s',
          }}
        />
      </button>
    </div>
  )
}

/* -------- 画像アップロード -------- */
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
          border: selected ? `2px solid var(--ato-text)` : `1px solid var(--ato-border)`,
          backgroundColor: 'var(--ato-button-bg)',
          backgroundImage: value ? `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url("${value}")` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: value ? '#fff' : 'var(--ato-text)',
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

/* -------- 選択ボタン -------- */
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
  const textColor = (style?.color as string | undefined) ?? 'var(--ato-text)'
  const bgColor = (style?.background as string | undefined) ?? 'var(--ato-bg)'
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative cursor-pointer text-center leading-tight ${className}`}
      style={{
        borderRadius: 12,
        border: selected ? `2px solid ${textColor}` : `1px solid var(--ato-border)`,
        background: 'transparent',
        color: 'var(--ato-text)',
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
