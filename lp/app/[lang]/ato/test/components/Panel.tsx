'use client'

import React from 'react'
import { borderToStyle, type Settings } from './settings'

type Slide = 'top' | 'bottom' | 'left' | 'right'

type Props = {
  settings: Settings
  slide?: Slide
  children?: React.ReactNode
  style?: React.CSSProperties
}

function positionFor(slide: Slide): React.CSSProperties {
  if (slide === 'bottom') return { left: 0, right: 0, bottom: 0, height: '85%' }
  if (slide === 'top') return { left: 0, right: 0, top: 0, height: '85%' }
  if (slide === 'left') return { left: 0, top: 0, bottom: 0, width: '85%' }
  return { right: 0, top: 0, bottom: 0, width: '85%' }
}

export function Panel({ settings, slide, children, style }: Props) {
  const isHorizontal = slide === 'left' || slide === 'right'
  const fg = settings.panelTextColor ?? settings.textColor
  const sub = `color-mix(in srgb, ${fg} 55%, ${settings.uiBgColor} 45%)`
  const handleBg = settings.panelBorder.color.top
  const panelStyle: React.CSSProperties & Record<`--${string}`, string> = {
    background: settings.uiBgColor,
    color: fg,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: settings.panelBorderRadius,
    ...borderToStyle(settings.panelBorder),
    '--ato-text': fg,
    '--ato-sub': sub,
    '--ato-border': handleBg,
    '--ato-ui-bg-color': settings.uiBgColor,
    ...(slide ? { position: 'absolute', zIndex: 40, ...positionFor(slide) } : null),
    ...style,
  }

  return (
    <div style={panelStyle}>
      <div className="shrink-0 pt-4 pb-1 flex justify-center">
        <div
          className="rounded-full"
          style={{
            background: handleBg,
            width: isHorizontal ? 4 : 40,
            height: isHorizontal ? 40 : 4,
          }}
        />
      </div>
      {children}
    </div>
  )
}
