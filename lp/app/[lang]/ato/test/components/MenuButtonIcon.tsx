'use client'

import React from 'react'
import { MoreVertical, Menu, Settings2 } from 'lucide-react'
import { type Settings } from './settings'

const ICONS = {
  dots: MoreVertical,
  hamburger: Menu,
  text: null,
  seal: null,
  flower: null,
  upload: null,
} as const

export function MenuButtonIcon({
  design,
  image,
  color,
}: {
  design: Settings['menuButtonDesign']
  image?: string | null
  color?: string
}) {
  const iconStyle = color ? { color } : undefined
  if (design === 'upload') {
    // eslint-disable-next-line @next/next/no-img-element
    if (image) return <img src={image} alt="menu" style={{ width: 20, height: 20, objectFit: 'contain' }} />
    return <Settings2 size={20} strokeWidth={1.4} style={iconStyle} />
  }
  const Icon = ICONS[design]
  if (Icon) return <Icon size={20} strokeWidth={1.4} style={iconStyle} />
  if (design === 'seal') {
    return (
      <span style={{
        display: 'inline-flex',
        width: 20,
        height: 20,
        border: `1.5px solid ${color ?? 'currentColor'}`,
        color,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 10,
        fontWeight: 'bold',
      }}>印</span>
    )
  }
  if (design === 'text') return <span style={{ fontSize: 11, fontWeight: 700, color }}>MENU</span>
  return <Settings2 size={20} strokeWidth={1.4} style={iconStyle} />
}
