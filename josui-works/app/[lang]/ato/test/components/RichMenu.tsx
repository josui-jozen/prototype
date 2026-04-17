'use client'

import { useState } from 'react'
import { Sun, Moon, Flower, Scroll, BookOpen, Code2, AlignLeft, Upload, Ban, Check } from 'lucide-react'
import { type Settings, type PresetIcon, type SectionKey, SECTIONS, presets, kanjiFonts, kanaFonts, alnumFonts } from './settings'
import { PrimaryButton, TextInput, Indicator, Toggle, SelectCard, UploadPicker } from './common'
import mokumeImg from './textures/mokume.jpg'
import konkuriImg from './textures/konkuri.jpg'
import tegamiImg from './textures/tegami.jpg'
import washiImg from './textures/washi.jpg'
import soraImg from './textures/sora.jpg'

const BG_TEXTURES: { id: string; label: string; src: string }[] = [
  { id: 'mokume', label: '木目', src: mokumeImg.src },
  { id: 'konkuri', label: 'コンクリ', src: konkuriImg.src },
  { id: 'tegami', label: '手紙', src: tegamiImg.src },
  { id: 'washi', label: '和紙', src: washiImg.src },
  { id: 'sora', label: '空', src: soraImg.src },
]

const IMAGE_FRAME_OPTIONS: { id: Settings['imageFrame']; label: string; style: React.CSSProperties }[] = [
  { id: 'none', label: 'なし', style: {} },
  { id: 'photo', label: '写真風', style: { background: '#fff', color: '#333' } },
  { id: 'letter', label: '手紙風', style: { background: '#fbf6e9', color: '#6b4e2a' } },
  { id: 'sns', label: 'SNS風', style: { background: '#fafafa', color: '#222' } },
]

const PRESET_ICONS: Record<PresetIcon, typeof Sun> = {
  sun: Sun,
  moon: Moon,
  flower: Flower,
  scroll: Scroll,
  book: BookOpen,
}

const TABS = ['プリセット', '文字', '紙', '音', '機能'] as const
type Tab = (typeof TABS)[number]

const DEFAULT_CUSTOM_CSS = `/* カスタムCSSを記述 */
.editor {
  background-color: #fff;
}`

export function RichMenu({ settings, onChange, onOpenPositionPicker }: { settings: Settings; onChange: (s: Settings) => void; onOpenPositionPicker: () => void }) {
  const [tab, setTab] = useState<Tab>('文字')
  const [customCss, setCustomCss] = useState(DEFAULT_CUSTOM_CSS)
  const update = <K extends keyof Settings>(k: K, v: Settings[K]) => onChange({ ...settings, [k]: v })

  const bumpSectionSize = (key: SectionKey, delta: number) => {
    const cur = settings.sectionSize[key]
    const next = Math.min(64, Math.max(8, cur + delta))
    onChange({ ...settings, sectionSize: { ...settings.sectionSize, [key]: next } })
  }
  const bumpSectionOpacity = (key: SectionKey, delta: number) => {
    const cur = settings.sectionOpacity[key]
    const next = Math.min(1, Math.max(0.2, +(cur + delta).toFixed(2)))
    onChange({ ...settings, sectionOpacity: { ...settings.sectionOpacity, [key]: next } })
  }
  const bumpLetterSpacing = (delta: number) => {
    const next = Math.min(0.5, Math.max(-0.1, +(settings.letterSpacing + delta).toFixed(2)))
    onChange({ ...settings, letterSpacing: next })
  }

  const slide = settings.menuSlide
  const isHorizontal = slide === 'left' || slide === 'right'
  const panelRadius = settings.menuRadius
  const panelStyle: React.CSSProperties & Record<`--${string}`, string> = {
    position: 'absolute',
    background: 'var(--ato-menu-bg)',
    boxShadow: 'var(--ato-menu-shadow)',
    color: settings.menuTextColor ?? settings.textColor,
    '--ato-text': settings.menuTextColor ?? settings.textColor,
    '--ato-sub': settings.menuTextColor
      ? `color-mix(in srgb, ${settings.menuTextColor} 55%, ${settings.menuBg} 45%)`
      : settings.subColor,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 40,
  }
  if (slide === 'bottom') {
    Object.assign(panelStyle, {
      left: 0, right: 0, bottom: 0, height: '85%',
      borderTop: '1px solid var(--ato-menu-border)',
      borderTopLeftRadius: panelRadius, borderTopRightRadius: panelRadius,
    })
  } else if (slide === 'top') {
    Object.assign(panelStyle, {
      left: 0, right: 0, top: 0, height: '85%',
      borderBottom: '1px solid var(--ato-menu-border)',
      borderBottomLeftRadius: panelRadius, borderBottomRightRadius: panelRadius,
    })
  } else if (slide === 'left') {
    Object.assign(panelStyle, {
      left: 0, top: 0, bottom: 0, width: '85%',
      borderRight: '1px solid var(--ato-menu-border)',
      borderTopRightRadius: panelRadius, borderBottomRightRadius: panelRadius,
    })
  } else {
    Object.assign(panelStyle, {
      right: 0, top: 0, bottom: 0, width: '85%',
      borderLeft: '1px solid var(--ato-menu-border)',
      borderTopLeftRadius: panelRadius, borderBottomLeftRadius: panelRadius,
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
            <div>
              <h3 className="text-[16px] font-bold" style={{ color: 'var(--ato-text)' }}>テーマ・プリセット</h3>
              <p className="text-[12px] mt-1" style={{ color: 'var(--ato-sub)' }}>お好みの世界観をワンタップで適用できます</p>
              <div className="mt-4 -mx-5 px-5 overflow-x-auto flex gap-3 pb-2">
                {Object.entries(presets).map(([key, p]) => {
                  const Icon = PRESET_ICONS[p.icon]
                  const selected = settings.bgColor === p.settings.bgColor && settings.fontKanji === p.settings.fontKanji
                  return (
                    <SelectCard
                      key={key}
                      selected={selected}
                      onClick={() => onChange({
                        ...p.settings,
                        menuPosition: settings.menuPosition,
                        menuSlide: settings.menuSlide,
                        buttonDesign: settings.buttonDesign,
                        files: settings.files,
                      })}
                      className="shrink-0 w-[120px] h-[140px] p-3 text-left flex flex-col justify-between"
                      style={{
                        background: p.settings.bgColor,
                        color: p.settings.textColor,
                      }}
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
            <Section label="文字色">
              <div className="space-y-2">
                {SECTIONS.map((s) => (
                  <Indicator
                    key={s.key}
                    label={s.label}
                    value={`${Math.round(settings.sectionOpacity[s.key] * 100)}%`}
                    onMinus={() => bumpSectionOpacity(s.key, -0.05)}
                    onPlus={() => bumpSectionOpacity(s.key, 0.05)}
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
                    <div key={s.key} className="flex items-center justify-between gap-3">
                      <div className="text-[13px]">{s.label}</div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setColor(null)}
                          aria-label="なし"
                          className="w-7 h-7 rounded-full flex items-center justify-center"
                          style={{
                            border: '1px solid var(--ato-border, #e4e4e7)',
                            background: 'transparent',
                            outline: val === null ? '2px solid currentColor' : 'none',
                            outlineOffset: 2,
                          }}
                        >
                          <Ban size={12} strokeWidth={1.4} />
                        </button>
                        <label
                          className="w-7 h-7 rounded-full cursor-pointer block relative overflow-hidden"
                          style={{
                            background: val ?? 'repeating-conic-gradient(#ddd 0% 25%, #fff 0% 50%) 50% / 10px 10px',
                            border: '1px solid var(--ato-border, #e4e4e7)',
                            outline: val !== null ? '2px solid currentColor' : 'none',
                            outlineOffset: 2,
                          }}
                        >
                          <input
                            type="color"
                            value={val ?? '#888888'}
                            onChange={(e) => setColor(e.target.value)}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </label>
                      </div>
                    </div>
                  )
                })}
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[13px]">メニュー文章</div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => update('menuTextColor', null)}
                      aria-label="なし"
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{
                        border: '1px solid var(--ato-border, #e4e4e7)',
                        background: 'transparent',
                        outline: settings.menuTextColor === null ? '2px solid currentColor' : 'none',
                        outlineOffset: 2,
                      }}
                    >
                      <Ban size={12} strokeWidth={1.4} />
                    </button>
                    <label
                      className="w-7 h-7 rounded-full cursor-pointer block relative overflow-hidden"
                      style={{
                        background: settings.menuTextColor ?? 'repeating-conic-gradient(#ddd 0% 25%, #fff 0% 50%) 50% / 10px 10px',
                        border: '1px solid var(--ato-border, #e4e4e7)',
                        outline: settings.menuTextColor !== null ? '2px solid currentColor' : 'none',
                        outlineOffset: 2,
                      }}
                    >
                      <input
                        type="color"
                        value={settings.menuTextColor ?? '#888888'}
                        onChange={(e) => update('menuTextColor', e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </label>
                  </div>
                </div>
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
                    selected={settings.bgImage === t.src}
                    onClick={() => update('bgImage', t.src)}
                  />
                ))}
              </div>
            </Section>
            <Section label="背景画像">
              <div className="flex gap-3 -mx-5 px-5 overflow-x-auto pb-2">
                <SelectCard
                  selected={!settings.bgImage}
                  onClick={() => update('bgImage', null)}
                  className="shrink-0 w-[100px] h-[120px] p-3 text-left flex flex-col justify-between"
                >
                  <Ban size={20} strokeWidth={1.4} />
                  <div>
                    <div className="text-[9px] font-bold tracking-[0.2em] opacity-50">IMAGE</div>
                    <div className="text-[15px] font-medium mt-0.5">なし</div>
                  </div>
                </SelectCard>
                <UploadPicker
                  value={settings.bgImage}
                  onChange={(dataUrl) => update('bgImage', dataUrl)}
                  selected={!!settings.bgImage}
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
                    selected={settings.imageFrame === o.id}
                    onClick={() => update('imageFrame', o.id)}
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
                  value={`${settings.imageRotate > 0 ? '+' : ''}${settings.imageRotate}°`}
                  onMinus={() => update('imageRotate', Math.max(-15, settings.imageRotate - 1))}
                  onPlus={() => update('imageRotate', Math.min(15, settings.imageRotate + 1))}
                />
              </div>
            </Section>
            <Section label="エディター幅">
              <Indicator
                label="幅"
                value={`${settings.width}%`}
                onMinus={() => onChange({ ...settings, width: Math.max(20, settings.width - 5) })}
                onPlus={() => onChange({ ...settings, width: Math.min(100, settings.width + 5) })}
              />
            </Section>
            <Section label="罫線">
              <div className="grid grid-cols-3 gap-2">
                {(['none', 'horizontal', 'dot'] as const).map((r, i) => (
                  <SelectCard
                    key={r}
                    selected={settings.rule === r}
                    onClick={() => update('rule', r)}
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
                    background: 'var(--ato-button-bg)',
                    border: '1px solid var(--ato-border)',
                    color: 'var(--ato-text)',
                  }}
                >
                  位置調整
                </button>
              </div>
            </Section>
            <Section label="ボタン背景・メニュー背景">
              <div className="flex items-center justify-end gap-2">
                <label
                  className="w-7 h-7 rounded-full cursor-pointer block relative overflow-hidden"
                  style={{
                    background: settings.buttonBg,
                    border: '1px solid var(--ato-border, #e4e4e7)',
                  }}
                >
                  <input
                    type="color"
                    value={settings.buttonBg}
                    onChange={(e) => onChange({ ...settings, buttonBg: e.target.value, menuBg: e.target.value })}
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
                        selected={settings.buttonDesign === o.id}
                        onClick={() => update('buttonDesign', o.id)}
                        className="h-10 flex items-center justify-center text-[11px] px-1"
                      >
                        {o.label}
                      </SelectCard>
                    ))}
                  </div>
                  <div className="mt-2">
                    <UploadPicker
                      value={settings.buttonImage}
                      onChange={(dataUrl) => onChange({ ...settings, buttonImage: dataUrl, buttonDesign: 'upload' })}
                      selected={settings.buttonDesign === 'upload'}
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
                  label="メニューボタン"
                  value={`${settings.buttonRadius}px`}
                  onMinus={() => onChange({ ...settings, buttonRadius: Math.max(0, settings.buttonRadius - 2) })}
                  onPlus={() => onChange({ ...settings, buttonRadius: Math.min(72, settings.buttonRadius + 2) })}
                />
                <Indicator
                  label="メニュー欄"
                  value={`${settings.menuRadius}px`}
                  onMinus={() => onChange({ ...settings, menuRadius: Math.max(0, settings.menuRadius - 2) })}
                  onPlus={() => onChange({ ...settings, menuRadius: Math.min(72, settings.menuRadius + 2) })}
                />
              </div>
            </Section>
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
