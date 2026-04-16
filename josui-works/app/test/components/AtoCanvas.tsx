'use client'

import { useState } from 'react'
import { MoreVertical, Menu, Settings2 } from 'lucide-react'
import './themes.css'
import { type Settings } from './settings'
import { RichMenu } from './RichMenu'

const BUTTON_ICONS = {
  dots: MoreVertical,
  hamburger: Menu,
  text: null,
  seal: null,
  flower: null,
} as const

export function AtoCanvas({
  theme,
  settings: initialSettings,
  content,
  interactive = false,
}: {
  theme: string
  settings: Settings
  content: string[]
  interactive?: boolean
}) {
  const [settings, setSettings] = useState<Settings>(initialSettings)
  const [open, setOpen] = useState(false)

  const canvasStyle: React.CSSProperties & Record<string, string | number> = {
    '--ato-font-size': `${settings.size}px`,
    '--ato-line-height': settings.lineHeight,
    '--ato-text-opacity': settings.textOpacity,
  }
  if (settings.bgColor) canvasStyle['--ato-bg'] = settings.bgColor
  if (settings.font) canvasStyle['--ato-font'] = settings.font

  const Icon = BUTTON_ICONS[settings.buttonDesign]

  return (
    <div
      className={`ato-canvas ${theme}`}
      data-rule={settings.rule}
      style={canvasStyle}
    >
      <div className="ato-canvas__content" data-direction={settings.direction}>
        <div className="ato-canvas__text">
          {content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="menu"
        onClick={() => interactive && setOpen((s) => !s)}
        className="ato-canvas__menu-button"
        data-pos={settings.menuPosition}
        disabled={!interactive}
      >
        {Icon ? (
          <Icon size={20} strokeWidth={1.4} />
        ) : settings.buttonDesign === 'seal' ? (
          <span style={{
            display: 'inline-flex',
            width: 20,
            height: 20,
            border: '1.5px solid currentColor',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            fontWeight: 'bold',
          }}>印</span>
        ) : (
          <Settings2 size={20} strokeWidth={1.4} />
        )}
      </button>

      {interactive && open && (
        <>
          <button
            type="button"
            aria-label="close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 z-30 bg-transparent cursor-default"
          />
          <RichMenu settings={settings} onChange={setSettings} />
        </>
      )}
    </div>
  )
}
