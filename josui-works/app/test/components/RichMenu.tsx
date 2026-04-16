'use client'

import { useState } from 'react'
import { ChevronDown, Minus, Plus } from 'lucide-react'
import { type Settings } from './settings'

const TABS = ['プリセット', '文字', '紙', '音', '機能'] as const
type Tab = (typeof TABS)[number]

const FONTS = [
  { label: 'しっぽり明朝', value: "'Shippori Mincho', serif" },
  { label: '游明朝', value: "'YuMincho', serif" },
  { label: 'Noto Serif JP', value: "'Noto Serif JP', serif" },
  { label: 'Zen Maru Gothic', value: "'Zen Maru Gothic', sans-serif" },
  { label: 'Noto Sans JP', value: "'Noto Sans JP', sans-serif" },
]

const BG_COLORS = [
  { label: '白練', value: '#fcfaf2' },
  { label: '墨', value: '#2a2928' },
  { label: '薄藍', value: '#f4f7f6' },
  { label: '生成り', value: '#efe8d9' },
  { label: '桜', value: '#fdf2f5' },
  { label: '白', value: '#ffffff' },
]

export function RichMenu({ settings, onChange }: { settings: Settings; onChange: (s: Settings) => void }) {
  const [tab, setTab] = useState<Tab>('文字')
  const update = <K extends keyof Settings>(k: K, v: Settings[K]) => onChange({ ...settings, [k]: v })

  const step = (k: keyof Settings, delta: number, min: number, max: number) => {
    const cur = settings[k] as number
    const next = Math.min(max, Math.max(min, cur + delta))
    update(k, next as Settings[typeof k])
  }

  const slide = settings.menuSlide
  const isHorizontal = slide === 'left' || slide === 'right'
  const panelStyle: React.CSSProperties = {
    position: 'absolute',
    background: 'var(--ato-menu-bg)',
    boxShadow: 'var(--ato-menu-shadow)',
    color: 'var(--ato-text)',
    fontFamily: 'var(--ato-font)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 40,
  }
  if (slide === 'bottom') {
    Object.assign(panelStyle, {
      left: 0, right: 0, bottom: 0, height: '85%',
      borderTop: '1px solid var(--ato-menu-border)',
      borderTopLeftRadius: 24, borderTopRightRadius: 24,
    })
  } else if (slide === 'top') {
    Object.assign(panelStyle, {
      left: 0, right: 0, top: 0, height: '85%',
      borderBottom: '1px solid var(--ato-menu-border)',
      borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
    })
  } else if (slide === 'left') {
    Object.assign(panelStyle, {
      left: 0, top: 0, bottom: 0, width: '85%',
      borderRight: '1px solid var(--ato-menu-border)',
      borderTopRightRadius: 24, borderBottomRightRadius: 24,
    })
  } else {
    Object.assign(panelStyle, {
      right: 0, top: 0, bottom: 0, width: '85%',
      borderLeft: '1px solid var(--ato-menu-border)',
      borderTopLeftRadius: 24, borderBottomLeftRadius: 24,
    })
  }

  return (
    <div style={panelStyle}>
      <div className="shrink-0 pt-4 pb-1 flex justify-center">
        <div
          className="rounded-full"
          style={{
            background: 'var(--ato-border)',
            width: isHorizontal ? 4 : 40,
            height: isHorizontal ? 40 : 4,
          }}
        ></div>
      </div>

      <div className="shrink-0" style={{ borderBottom: '1px solid var(--ato-border)' }}>
        <div className="flex px-4">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className="px-3 py-3 text-[12px] font-bold whitespace-nowrap relative cursor-pointer"
              style={{ color: tab === t ? 'var(--ato-text)' : 'var(--ato-sub)' }}
            >
              {t}
              {tab === t && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t-full"
                  style={{ background: 'var(--ato-accent)' }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 pb-12 space-y-5 text-[13px]">
        {tab === 'プリセット' && (
          <>
            <Section label="ダーク・ライト">
              <Segment
                options={['light', 'dark']}
                labels={['ライト', 'ダーク']}
                value={settings.mode}
                onChange={(v) => update('mode', v as Settings['mode'])}
              />
            </Section>
            <Section label="自分で作る">
              <button
                type="button"
                className="w-full py-2 text-[12px] rounded-[8px] border border-dashed"
                style={{ borderColor: 'var(--ato-border)', color: 'var(--ato-sub)' }}
              >
                + 新規作成
              </button>
              <pre
                className="mt-2 p-2 text-[9px] leading-[1.6] font-mono whitespace-pre-wrap rounded-[6px]"
                style={{ background: 'var(--ato-button-bg)', color: 'var(--ato-sub)' }}
              >{`.ato-theme {
  --ato-bg: #fcfaf2;
  --ato-text: #3d3934;
  --ato-radius: 12px;
  --ato-font: 'Noto Serif JP';
}`}</pre>
            </Section>
          </>
        )}

        {tab === '文字' && (
          <>
            <Section label="フォント">
              <Select
                value={settings.font}
                options={FONTS}
                onChange={(v) => update('font', v)}
              />
            </Section>
            <Section label="書字方向">
              <Segment
                options={['horizontal-tb', 'vertical-rl']}
                labels={['横書き', '縦書き']}
                value={settings.direction}
                onChange={(v) => update('direction', v as Settings['direction'])}
              />
            </Section>
            <Stepper label="サイズ" value={`${settings.size}px`} onMinus={() => step('size', -1, 10, 28)} onPlus={() => step('size', 1, 10, 28)} />
            <Stepper label="行間" value={settings.lineHeight.toFixed(1)} onMinus={() => onChange({ ...settings, lineHeight: Math.max(1.2, +(settings.lineHeight - 0.1).toFixed(1)) })} onPlus={() => onChange({ ...settings, lineHeight: Math.min(3.5, +(settings.lineHeight + 0.1).toFixed(1)) })} />
            <Stepper label="文字色" value={`${Math.round(settings.textOpacity * 100)}%`} onMinus={() => onChange({ ...settings, textOpacity: Math.max(0.4, +(settings.textOpacity - 0.1).toFixed(1)) })} onPlus={() => onChange({ ...settings, textOpacity: Math.min(1, +(settings.textOpacity + 0.1).toFixed(1)) })} />
          </>
        )}

        {tab === '紙' && (
          <>
            <Section label="背景">
              <div className="flex flex-wrap gap-3">
                {BG_COLORS.map((b) => (
                  <button
                    key={b.value}
                    type="button"
                    onClick={() => update('bgColor', b.value)}
                    className="w-9 h-9 rounded-full"
                    style={{
                      background: b.value,
                      border: `1px solid var(--ato-border)`,
                      outline: settings.bgColor === b.value ? `2px solid var(--ato-accent)` : 'none',
                      outlineOffset: 2,
                    }}
                    aria-label={b.label}
                  />
                ))}
              </div>
            </Section>
            <Section label="罫線">
              <div className="grid grid-cols-5 gap-2">
                {(['none', 'horizontal', 'grid', 'manuscript', 'dot'] as const).map((r, i) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => update('rule', r)}
                    className="py-2 text-[11px] rounded-[8px]"
                    style={{
                      border: `1px solid ${settings.rule === r ? 'var(--ato-accent)' : 'var(--ato-border)'}`,
                      background: settings.rule === r ? 'var(--ato-accent)' : 'transparent',
                      color: settings.rule === r ? 'var(--ato-bg)' : 'var(--ato-text)',
                    }}
                  >
                    {['無地', '横罫', '方眼', '原稿', 'ドット'][i]}
                  </button>
                ))}
              </div>
            </Section>
          </>
        )}

        {tab === '音' && (
          <>
            <Section label="BGM">
              <Select
                value="無音"
                options={[
                  { label: '無音', value: '無音' },
                  { label: '草原と牧場', value: '草原と牧場' },
                  { label: '雨音', value: '雨音' },
                ]}
                onChange={() => {}}
              />
            </Section>
            <Section label="書く音">
              <Segment options={['none', 'small', 'large']} labels={['無', '小', '大']} value="small" onChange={() => {}} />
            </Section>
          </>
        )}

        {tab === '機能' && (
          <>
            <Section label="設定ボタン位置">
              <div className="grid grid-cols-2 gap-2">
                {(['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const).map((p, i) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => update('menuPosition', p)}
                    className="py-2 text-[12px] rounded-[8px]"
                    style={{
                      border: `1px solid ${settings.menuPosition === p ? 'var(--ato-accent)' : 'var(--ato-border)'}`,
                      background: settings.menuPosition === p ? 'var(--ato-accent)' : 'transparent',
                      color: settings.menuPosition === p ? 'var(--ato-bg)' : 'var(--ato-text)',
                    }}
                  >
                    {['左上', '右上', '左下', '右下'][i]}
                  </button>
                ))}
              </div>
            </Section>
            <Section label="メニューの出る方向">
              <div className="grid grid-cols-4 gap-2">
                {(['top', 'bottom', 'left', 'right'] as const).map((p, i) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => update('menuSlide', p)}
                    className="py-2 text-[12px] rounded-[8px]"
                    style={{
                      border: `1px solid ${settings.menuSlide === p ? 'var(--ato-accent)' : 'var(--ato-border)'}`,
                      background: settings.menuSlide === p ? 'var(--ato-accent)' : 'transparent',
                      color: settings.menuSlide === p ? 'var(--ato-bg)' : 'var(--ato-text)',
                    }}
                  >
                    {['上', '下', '左', '右'][i]}
                  </button>
                ))}
              </div>
            </Section>
            <Section label="ボタンデザイン">
              <Select
                value={settings.buttonDesign}
                options={[
                  { label: '縦三点', value: 'dots' },
                  { label: 'ハンバーガー', value: 'hamburger' },
                  { label: 'テキスト', value: 'text' },
                  { label: '印章', value: 'seal' },
                ]}
                onChange={(v) => update('buttonDesign', v as Settings['buttonDesign'])}
              />
            </Section>
            <ToggleRow label="AI機能" value={settings.ai} onChange={(v) => update('ai', v)} />
            <ToggleRow label="ファイル管理" value={settings.files} onChange={(v) => update('files', v)} />
          </>
        )}
      </div>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[12px] font-medium mb-2" style={{ color: 'var(--ato-sub)' }}>
        {label}
      </div>
      {children}
    </div>
  )
}

function Select({ value, options, onChange }: { value: string; options: { label: string; value: string }[]; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none text-[13px] rounded-[8px] px-3 py-2 outline-none"
        style={{
          background: 'var(--ato-button-bg)',
          border: `1px solid var(--ato-border)`,
          color: 'var(--ato-text)',
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--ato-sub)' }} />
    </div>
  )
}

function Segment({ options, labels, value, onChange }: { options: string[]; labels: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex p-1 rounded-[8px]" style={{ background: 'var(--ato-button-bg)' }}>
      {options.map((opt, i) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className="flex-1 py-1 text-[12px] font-medium rounded-md"
          style={{
            background: value === opt ? 'var(--ato-bg)' : 'transparent',
            color: value === opt ? 'var(--ato-text)' : 'var(--ato-sub)',
            boxShadow: value === opt ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
          }}
        >
          {labels[i]}
        </button>
      ))}
    </div>
  )
}

function Stepper({ label, value, onMinus, onPlus }: { label: string; value: string; onMinus: () => void; onPlus: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[12px] font-medium" style={{ color: 'var(--ato-sub)' }}>{label}</span>
      <div
        className="flex items-center gap-1 p-1 rounded-[8px]"
        style={{ background: 'var(--ato-button-bg)', border: `1px solid var(--ato-border)` }}
      >
        <button type="button" onClick={onMinus} className="w-7 h-7 flex items-center justify-center rounded-md cursor-pointer" style={{ color: 'var(--ato-text)' }}>
          <Minus size={12} />
        </button>
        <div className="min-w-[48px] text-center text-[12px] font-mono" style={{ color: 'var(--ato-text)' }}>{value}</div>
        <button type="button" onClick={onPlus} className="w-7 h-7 flex items-center justify-center rounded-md cursor-pointer" style={{ color: 'var(--ato-text)' }}>
          <Plus size={12} />
        </button>
      </div>
    </div>
  )
}

function ToggleRow({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[13px]" style={{ color: 'var(--ato-text)' }}>{label}</span>
      <Segment options={['on', 'off']} labels={['有効', '無効']} value={value ? 'on' : 'off'} onChange={(v) => onChange(v === 'on')} />
    </div>
  )
}
