'use client'

import { useState } from 'react'
import { Sun, Moon, Flower, Scroll, BookOpen, Code2, AlignLeft, Upload, Ban, Check } from 'lucide-react'
import { type Settings, type PresetIcon, type SectionKey, type UiBorder, type Sides, SECTIONS, presets, kanjiFonts, kanaFonts, alnumFonts, borderToStyle } from './settings'
import { PrimaryButton } from '@/components/Button'
import { TextInput } from '@/components/TextInput'
import { Indicator } from '@/components/Indicator'
import { Toggle } from '@/components/Toggle'
import { SelectCard } from '@/components/SelectCard'
import { UploadPicker } from '@/components/UploadPicker'
import mokume from '../assets/textures/mokume.jpg'
import konkuri from '../assets/textures/konkuri.jpg'
import tegami from '../assets/textures/tegami.jpg'
import washi from '../assets/textures/washi.jpg'
import sora from '../assets/textures/sora.jpg'

const BG_TEXTURES: { id: string; label: string; src: string }[] = [
  { id: 'mokume', label: '木目', src: mokume.src },
  { id: 'konkuri', label: 'コンクリ', src: konkuri.src },
  { id: 'tegami', label: '手紙', src: tegami.src },
  { id: 'washi', label: '和紙', src: washi.src },
  { id: 'sora', label: '空', src: sora.src },
]

const IMAGE_FRAME_OPTIONS: { id: Settings['editorImageFrame']; label: string; style: React.CSSProperties }[] = [
  { id: 'none', label: 'なし', style: {} },
  { id: 'photo', label: '写真風', style: { background: '#fff', color: '#333' } },
  { id: 'letter', label: '手紙風', style: { background: '#fbf6e9', color: '#6b4e2a' } },
  { id: 'sns', label: 'SNS風', style: { background: '#fafafa', color: '#222' } },
]

const PRESET_ICONS: Record<PresetIcon, typeof Sun> = {
  sun: Sun, moon: Moon, flower: Flower, scroll: Scroll, book: BookOpen,
}

const TABS = ['プリセット', '文字', '紙', '音', '機能'] as const
type Tab = (typeof TABS)[number]

const DEFAULT_CUSTOM_CSS = `/* カスタムCSSを記述 */
.editor {
  background-color: #fff;
}`

export function MenuPanel({ settings, onChange, onOpenPositionPicker }: { settings: Settings; onChange: (s: Settings) => void; onOpenPositionPicker: () => void }) {
  const [tab, setTab] = useState<Tab>('文字')
  const [customCss, setCustomCss] = useState(DEFAULT_CUSTOM_CSS)
  const update = <K extends keyof Settings>(k: K, v: Settings[K]) => onChange({ ...settings, [k]: v })

  const bumpSectionSize = (key: SectionKey, delta: number) => {
    const cur = settings.sectionSize[key]
    const next = Math.min(64, Math.max(8, cur + delta))
    onChange({ ...settings, sectionSize: { ...settings.sectionSize, [key]: next } })
  }
  const bumpLetterSpacing = (delta: number) => {
    const next = Math.min(0.5, Math.max(-0.1, +(settings.letterSpacing + delta).toFixed(2)))
    onChange({ ...settings, letterSpacing: next })
  }

  const slide = settings.menuSlide
  const isHorizontal = slide === 'left' || slide === 'right'
  const panelRadius = settings.panelBorderRadius
  const panelBorderStyle = borderToStyle(settings.panelBorder)
  const panelStyle: React.CSSProperties & Record<`--${string}`, string> = {
    position: 'absolute',
    background: 'var(--ato-ui-bg-color)',
    color: settings.panelTextColor ?? settings.textColor,
    '--ato-text': settings.panelTextColor ?? settings.textColor,
    '--ato-sub': settings.panelTextColor
      ? `color-mix(in srgb, ${settings.panelTextColor} 55%, ${settings.uiBgColor} 45%)`
      : settings.subColor,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 40,
    borderRadius: panelRadius,
    ...panelBorderStyle,
  }
  if (slide === 'bottom') {
    Object.assign(panelStyle, { left: 0, right: 0, bottom: 0, height: '85%' })
  } else if (slide === 'top') {
    Object.assign(panelStyle, { left: 0, right: 0, top: 0, height: '85%' })
  } else if (slide === 'left') {
    Object.assign(panelStyle, { left: 0, top: 0, bottom: 0, width: '85%' })
  } else {
    Object.assign(panelStyle, { right: 0, top: 0, bottom: 0, width: '85%' })
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
        />
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
            <div>
              <h3 className="text-[16px] font-bold" style={{ color: 'var(--ato-text)' }}>テーマ・プリセット</h3>
              <p className="text-[12px] mt-1" style={{ color: 'var(--ato-sub)' }}>お好みの世界観をワンタップで適用できます</p>
              <div className="mt-4 -mx-5 px-5 overflow-x-auto flex gap-3 pb-2">
                {Object.entries(presets).map(([key, p]) => {
                  const Icon = PRESET_ICONS[p.icon]
                  const selected = settings.editorBgColor === p.settings.editorBgColor && settings.fontKanji === p.settings.fontKanji
                  return (
                    <SelectCard
                      key={key}
                      selected={selected}
                      onClick={() => onChange({
                        ...p.settings,
                        menuPosition: settings.menuPosition,
                        menuSlide: settings.menuSlide,
                        menuButtonDesign: settings.menuButtonDesign,
                        files: settings.files,
                      })}
                      className="shrink-0 w-[120px] h-[140px] p-3 text-left flex flex-col justify-between"
                      style={{ background: p.settings.editorBgColor, color: p.settings.textColor }}
                    >
                      <Icon size={22} strokeWidth={1.4} />
                      <div>
                        <div className="text-[9px] font-bold tracking-[0.2em] opacity-50">THEME</div>
                        <div className="text-[16px] font-medium mt-0.5">{p.label}</div>
                      </div>
                    </SelectCard>
                  )
                })}
              </div>
            </div>

            <div className="border-t -mx-5 my-2" style={{ borderColor: 'var(--ato-border)' }} />

            <div>
              <div className="flex items-center gap-2 text-[13px] font-medium mb-3" style={{ color: 'var(--ato-text)' }}>
                <Code2 size={14} />
                自分で作る (CSS)
              </div>
              <TextInput multiline monospace value={customCss} onChange={setCustomCss} rows={5} />
              <div className="mt-3">
                <PrimaryButton onClick={() => {}}>CSSを適用する</PrimaryButton>
              </div>
            </div>
          </>
        )}

        {tab === '文字' && (
          <>
            <Section label="漢字">
              <div className="grid grid-cols-3 gap-2">
                {kanjiFonts.map((f) => (
                  <SelectCard
                    key={f.id}
                    selected={settings.fontKanji === f.id}
                    onClick={() => update('fontKanji', f.id)}
                    className="h-14 flex items-center justify-center px-2"
                    style={{ fontFamily: `'${f.id}-preview'`, fontSize: 16 }}
                  >
                    {f.label}
                  </SelectCard>
                ))}
              </div>
            </Section>
            <Section label="かな">
              <div className="grid grid-cols-3 gap-2">
                {kanaFonts.map((f) => (
                  <SelectCard
                    key={f.id}
                    selected={settings.fontKana === f.id}
                    onClick={() => update('fontKana', f.id)}
                    className="h-14 flex items-center justify-center px-2"
                    style={{ fontFamily: `'${f.id}-preview'`, fontSize: 16 }}
                  >
                    {f.label}
                  </SelectCard>
                ))}
              </div>
            </Section>
            <Section label="英数字">
              <div className="grid grid-cols-3 gap-2">
                {alnumFonts.map((f) => (
                  <SelectCard
                    key={f.id}
                    selected={settings.fontAlnum === f.id}
                    onClick={() => update('fontAlnum', f.id)}
                    className="h-14 flex items-center justify-center px-2"
                    style={{ fontFamily: `'${f.id}-preview'`, fontSize: 16 }}
                  >
                    {f.label}
                  </SelectCard>
                ))}
              </div>
            </Section>
            <Section label="書字方向">
              <div className="grid grid-cols-2 gap-2">
                {([
                  { id: 'horizontal-tb', label: '横書き', rotate: 0 },
                  { id: 'vertical-rl', label: '縦書き', rotate: 90 },
                ] as const).map((d) => (
                  <SelectCard
                    key={d.id}
                    selected={settings.direction === d.id}
                    onClick={() => update('direction', d.id)}
                    className="h-14 flex items-center justify-center gap-2 px-2"
                    style={{ fontSize: 14 }}
                  >
                    <span>{d.label}</span>
                    <AlignLeft size={14} style={{ transform: `rotate(${d.rotate}deg)` }} />
                  </SelectCard>
                ))}
              </div>
            </Section>
            <Section label="サイズ">
              <div className="space-y-2">
                {SECTIONS.map((s) => (
                  <Indicator
                    key={s.key}
                    label={s.label}
                    value={`${settings.sectionSize[s.key]}px`}
                    onMinus={() => bumpSectionSize(s.key, -1)}
                    onPlus={() => bumpSectionSize(s.key, 1)}
                  />
                ))}
              </div>
            </Section>
            <Section label="セクション別 色">
              <div className="space-y-2">
                {SECTIONS.map((s) => {
                  const val = settings.sectionColors[s.key]
                  const setColor = (c: string | null) => onChange({
                    ...settings,
                    sectionColors: { ...settings.sectionColors, [s.key]: c },
                  })
                  return (
                    <ColorRow
                      key={s.key}
                      label={s.label}
                      value={val}
                      onChange={setColor}
                    />
                  )
                })}
                <ColorRow
                  label="メニュー文章"
                  value={settings.panelTextColor}
                  onChange={(c) => update('panelTextColor', c)}
                />
              </div>
            </Section>
            <Section label="文字列間">
              <Indicator
                label="通常文字"
                value={`${settings.letterSpacing.toFixed(2)}em`}
                onMinus={() => bumpLetterSpacing(-0.01)}
                onPlus={() => bumpLetterSpacing(0.01)}
              />
            </Section>
            <Indicator
              label="行間"
              value={settings.lineHeight.toFixed(1)}
              onMinus={() => onChange({ ...settings, lineHeight: Math.max(1.2, +(settings.lineHeight - 0.1).toFixed(1)) })}
              onPlus={() => onChange({ ...settings, lineHeight: Math.min(3.5, +(settings.lineHeight + 0.1).toFixed(1)) })}
            />
          </>
        )}

        {tab === '紙' && (
          <>
            <Section label="背景">
              <div className="flex gap-3 -mx-5 px-5 overflow-x-auto pb-2">
                {BG_TEXTURES.map((t) => (
                  <TextureCard
                    key={t.id}
                    label={t.label}
                    src={t.src}
                    selected={settings.editorBgImage === t.src}
                    onClick={() => update('editorBgImage', t.src)}
                  />
                ))}
              </div>
            </Section>
            <Section label="背景画像">
              <div className="flex gap-3 -mx-5 px-5 overflow-x-auto pb-2">
                <SelectCard
                  selected={!settings.editorBgImage}
                  onClick={() => update('editorBgImage', null)}
                  className="shrink-0 w-[100px] h-[120px] p-3 text-left flex flex-col justify-between"
                >
                  <Ban size={20} strokeWidth={1.4} />
                  <div>
                    <div className="text-[9px] font-bold tracking-[0.2em] opacity-50">IMAGE</div>
                    <div className="text-[15px] font-medium mt-0.5">なし</div>
                  </div>
                </SelectCard>
                <UploadPicker
                  value={settings.editorBgImage}
                  onChange={(dataUrl) => update('editorBgImage', dataUrl)}
                  selected={!!settings.editorBgImage}
                  className="shrink-0 w-[100px] h-[120px] p-3 text-left flex flex-col justify-between"
                >
                  <Upload size={20} strokeWidth={1.4} />
                  <div>
                    <div className="text-[9px] font-bold tracking-[0.2em] opacity-70">IMAGE</div>
                    <div className="text-[15px] font-medium mt-0.5">アップロード</div>
                  </div>
                </UploadPicker>
              </div>
            </Section>
            <Section label="画像スタイル">
              <div className="grid grid-cols-3 gap-2">
                {IMAGE_FRAME_OPTIONS.map((o) => (
                  <SelectCard
                    key={o.id}
                    selected={settings.editorImageFrame === o.id}
                    onClick={() => update('editorImageFrame', o.id)}
                    className="h-10 flex items-center justify-center text-[12px]"
                    style={o.style}
                  >
                    {o.label}
                  </SelectCard>
                ))}
              </div>
              <div className="mt-3">
                <Indicator
                  label="傾き"
                  value={`${settings.editorImageRotate > 0 ? '+' : ''}${settings.editorImageRotate}°`}
                  onMinus={() => update('editorImageRotate', Math.max(-15, settings.editorImageRotate - 1))}
                  onPlus={() => update('editorImageRotate', Math.min(15, settings.editorImageRotate + 1))}
                />
              </div>
            </Section>
            <Section label="エディター幅">
              <Indicator
                label="幅"
                value={`${settings.editorWidth}%`}
                onMinus={() => onChange({ ...settings, editorWidth: Math.max(20, settings.editorWidth - 5) })}
                onPlus={() => onChange({ ...settings, editorWidth: Math.min(100, settings.editorWidth + 5) })}
              />
            </Section>
            <Section label="罫線">
              <div className="grid grid-cols-3 gap-2">
                {(['none', 'horizontal', 'dot'] as const).map((r, i) => (
                  <SelectCard
                    key={r}
                    selected={settings.editorRule === r}
                    onClick={() => update('editorRule', r)}
                    className="h-10 flex items-center justify-center text-[11px]"
                  >
                    {['無地', '横罫', 'ドット'][i]}
                  </SelectCard>
                ))}
              </div>
            </Section>
          </>
        )}

        {tab === '音' && (
          <>
            <Section label="BGM">
              <div className="grid grid-cols-3 gap-2">
                {([
                  { id: 'none', label: '無音' },
                  { id: 'grass', label: '草原と牧場' },
                  { id: 'rain', label: '雨音' },
                ] as const).map((o) => (
                  <SelectCard
                    key={o.id}
                    selected={o.id === 'none'}
                    onClick={() => {}}
                    className="h-10 flex items-center justify-center text-[11px] px-1"
                  >
                    {o.label}
                  </SelectCard>
                ))}
              </div>
            </Section>
            <Section label="書く音">
              <div className="grid grid-cols-3 gap-2">
                {([
                  { id: 'none', label: '無' },
                  { id: 'small', label: '小' },
                  { id: 'large', label: '大' },
                ] as const).map((o) => (
                  <SelectCard
                    key={o.id}
                    selected={o.id === 'small'}
                    onClick={() => {}}
                    className="h-10 flex items-center justify-center text-[12px]"
                  >
                    {o.label}
                  </SelectCard>
                ))}
              </div>
            </Section>
          </>
        )}

        {tab === '機能' && (
          <>
            <Section label="レイアウト調整">
              <div className="flex items-center justify-between">
                <span className="text-[12px]" style={{ color: 'var(--ato-sub)' }}>
                  画面上の全ボタンの位置を調整
                </span>
                <button
                  type="button"
                  onClick={onOpenPositionPicker}
                  className="px-3 py-2 rounded-[8px] text-[12px] cursor-pointer"
                  style={{
                    background: 'var(--ato-ui-bg-color)',
                    border: '1px solid var(--ato-border)',
                    color: 'var(--ato-text)',
                  }}
                >
                  位置調整
                </button>
              </div>
            </Section>
            <Section label="UI 背景色">
              <div className="flex items-center justify-end gap-2">
                <label
                  className="w-7 h-7 rounded-full cursor-pointer block relative overflow-hidden"
                  style={{
                    background: settings.uiBgColor,
                    border: '1px solid var(--ato-border, #e4e4e7)',
                  }}
                >
                  <input
                    type="color"
                    value={settings.uiBgColor}
                    onChange={(e) => update('uiBgColor', e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </label>
              </div>
            </Section>
            <Section label="メニュー">
              <div className="space-y-3 pl-3" style={{ borderLeft: '1px solid var(--ato-border)' }}>
                <div>
                  <div className="text-[11px] mb-2" style={{ color: 'var(--ato-sub)' }}>出る方向</div>
                  <div className="grid grid-cols-4 gap-2">
                    {(['top', 'bottom', 'left', 'right'] as const).map((p, i) => (
                      <SelectCard
                        key={p}
                        selected={settings.menuSlide === p}
                        onClick={() => update('menuSlide', p)}
                        className="h-10 flex items-center justify-center text-[12px]"
                      >
                        {['上', '下', '左', '右'][i]}
                      </SelectCard>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] mb-2" style={{ color: 'var(--ato-sub)' }}>デザイン</div>
                  <div className="grid grid-cols-4 gap-2">
                    {([
                      { id: 'dots', label: '縦三点' },
                      { id: 'hamburger', label: 'バーガー' },
                      { id: 'text', label: 'テキスト' },
                      { id: 'seal', label: '印章' },
                    ] as const).map((o) => (
                      <SelectCard
                        key={o.id}
                        selected={settings.menuButtonDesign === o.id}
                        onClick={() => update('menuButtonDesign', o.id)}
                        className="h-10 flex items-center justify-center text-[11px] px-1"
                      >
                        {o.label}
                      </SelectCard>
                    ))}
                  </div>
                  <div className="mt-2">
                    <UploadPicker
                      value={settings.menuButtonImage}
                      onChange={(dataUrl) => onChange({ ...settings, menuButtonImage: dataUrl, menuButtonDesign: 'upload' })}
                      selected={settings.menuButtonDesign === 'upload'}
                      className="w-full h-12 flex items-center justify-center gap-2 text-[12px] font-medium"
                    >
                      <Upload size={14} />
                      アイコンデザインをアップロード
                    </UploadPicker>
                  </div>
                </div>
              </div>
            </Section>
            <Section label="角の丸み">
              <div className="space-y-2">
                <Indicator
                  label="ボタン"
                  value={`${settings.buttonBorderRadius}px`}
                  onMinus={() => onChange({ ...settings, buttonBorderRadius: Math.max(0, settings.buttonBorderRadius - 2) })}
                  onPlus={() => onChange({ ...settings, buttonBorderRadius: Math.min(72, settings.buttonBorderRadius + 2) })}
                />
                <Indicator
                  label="パネル"
                  value={`${settings.panelBorderRadius}px`}
                  onMinus={() => onChange({ ...settings, panelBorderRadius: Math.max(0, settings.panelBorderRadius - 2) })}
                  onPlus={() => onChange({ ...settings, panelBorderRadius: Math.min(72, settings.panelBorderRadius + 2) })}
                />
              </div>
            </Section>
            <BorderEditor
              label="ボタンの枠線"
              value={settings.buttonBorder}
              onChange={(b) => update('buttonBorder', b)}
            />
            <BorderEditor
              label="パネルの枠線"
              value={settings.panelBorder}
              onChange={(b) => update('panelBorder', b)}
            />
            <div className="space-y-3">
              <Toggle label="ファイル管理" value={settings.files} onChange={(v) => update('files', v)} />
              {settings.files && (
                <div className="pl-3" style={{ borderLeft: '1px solid var(--ato-border)' }}>
                  <div className="text-[11px] mb-2" style={{ color: 'var(--ato-sub)' }}>出る方向</div>
                  <div className="grid grid-cols-4 gap-2">
                    {(['top', 'bottom', 'left', 'right'] as const).map((p, i) => (
                      <SelectCard
                        key={p}
                        selected={settings.filesSlide === p}
                        onClick={() => update('filesSlide', p)}
                        className="h-10 flex items-center justify-center text-[12px]"
                      >
                        {['上', '下', '左', '右'][i]}
                      </SelectCard>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function ColorRow({ label, value, onChange }: { label: string; value: string | null; onChange: (c: string | null) => void }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-[13px]">{label}</div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(null)}
          aria-label="なし"
          className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{
            border: '1px solid var(--ato-border, #e4e4e7)',
            background: 'transparent',
            outline: value === null ? '2px solid currentColor' : 'none',
            outlineOffset: 2,
          }}
        >
          <Ban size={12} strokeWidth={1.4} />
        </button>
        <label
          className="w-7 h-7 rounded-full cursor-pointer block relative overflow-hidden"
          style={{
            background: value ?? 'repeating-conic-gradient(#ddd 0% 25%, #fff 0% 50%) 50% / 10px 10px',
            border: '1px solid var(--ato-border, #e4e4e7)',
            outline: value !== null ? '2px solid currentColor' : 'none',
            outlineOffset: 2,
          }}
        >
          <input
            type="color"
            value={value ?? '#888888'}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </label>
      </div>
    </div>
  )
}

function TextureCard({ label, src, selected, onClick }: { label: string; src: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative shrink-0 w-[100px] h-[120px] rounded-[12px] p-3 text-left flex flex-col justify-end cursor-pointer overflow-hidden"
      style={{
        border: selected ? `2px solid var(--ato-text)` : `1px solid var(--ato-border)`,
        backgroundImage: `linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.45)), url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
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
      <div className="text-[15px] font-medium" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
        {label}
      </div>
    </button>
  )
}

const SIDE_KEYS: { key: keyof Sides<number>; label: string }[] = [
  { key: 'top', label: '上' },
  { key: 'right', label: '右' },
  { key: 'bottom', label: '下' },
  { key: 'left', label: '左' },
]

function BorderEditor({ label, value, onChange }: { label: string; value: UiBorder; onChange: (b: UiBorder) => void }) {
  const setSize = (k: keyof Sides<number>, v: number) =>
    onChange({ ...value, size: { ...value.size, [k]: Math.max(0, Math.min(20, v)) } })
  const setColor = (k: keyof Sides<string>, v: string) =>
    onChange({ ...value, color: { ...value.color, [k]: v } })
  const setOffset = (k: keyof Sides<number>, v: number) =>
    onChange({ ...value, shadow: { ...value.shadow, offset: { ...value.shadow.offset, [k]: Math.max(0, Math.min(40, v)) } } })
  const setShadowColor = (v: string) =>
    onChange({ ...value, shadow: { ...value.shadow, color: v } })
  const setShadowBlur = (v: number) =>
    onChange({ ...value, shadow: { ...value.shadow, blur: Math.max(0, Math.min(100, v)) } })

  return (
    <Section label={label}>
      <div className="space-y-3 pl-3" style={{ borderLeft: '1px solid var(--ato-border)' }}>
        <SubLabel>太さ</SubLabel>
        <div className="space-y-1">
          {SIDE_KEYS.map((s) => (
            <Indicator
              key={`sz-${s.key}`}
              label={s.label}
              value={`${value.size[s.key]}px`}
              onMinus={() => setSize(s.key, value.size[s.key] - 1)}
              onPlus={() => setSize(s.key, value.size[s.key] + 1)}
            />
          ))}
        </div>
        <SubLabel>色</SubLabel>
        <div className="space-y-1">
          {SIDE_KEYS.map((s) => (
            <SwatchRow
              key={`c-${s.key}`}
              label={s.label}
              value={value.color[s.key]}
              onChange={(v) => setColor(s.key, v)}
            />
          ))}
        </div>
        <SubLabel>影 距離</SubLabel>
        <div className="space-y-1">
          {SIDE_KEYS.map((s) => (
            <Indicator
              key={`o-${s.key}`}
              label={s.label}
              value={`${value.shadow.offset[s.key]}px`}
              onMinus={() => setOffset(s.key, value.shadow.offset[s.key] - 1)}
              onPlus={() => setOffset(s.key, value.shadow.offset[s.key] + 1)}
            />
          ))}
        </div>
        <SwatchRow label="影 色" value={value.shadow.color} onChange={setShadowColor} />
        <Indicator
          label="影 ぼかし"
          value={`${value.shadow.blur}px`}
          onMinus={() => setShadowBlur(value.shadow.blur - 2)}
          onPlus={() => setShadowBlur(value.shadow.blur + 2)}
        />
      </div>
    </Section>
  )
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px]" style={{ color: 'var(--ato-sub)' }}>{children}</div>
  )
}

function SwatchRow({ label, value, onChange }: { label: string; value: string; onChange: (c: string) => void }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-[13px]">{label}</div>
      <label
        className="w-7 h-7 rounded-full cursor-pointer block relative overflow-hidden"
        style={{
          background: value,
          border: '1px solid var(--ato-border, #e4e4e7)',
        }}
      >
        <input
          type="color"
          value={normalizeColorForPicker(value)}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </label>
    </div>
  )
}

/** <input type="color"> は #rrggbb しか受け付けないので rgba/transparent 等はフォールバック */
function normalizeColorForPicker(v: string): string {
  if (/^#[0-9a-f]{6}$/i.test(v)) return v
  if (/^#[0-9a-f]{3}$/i.test(v)) {
    const c = v.slice(1)
    return `#${c[0]}${c[0]}${c[1]}${c[1]}${c[2]}${c[2]}`
  }
  return '#888888'
}

function Section({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[12px] font-medium mb-2 flex items-center gap-1" style={{ color: 'var(--ato-sub)' }}>
        {label}
        {icon}
      </div>
      {children}
    </div>
  )
}
