'use client'

import React from 'react'
import { IconButton as SharedIconButton, PrimaryButton as SharedPrimaryButton } from '@/components/Button'
import { borderToStyle, type Settings } from './settings'

export function PrimaryButton(props: React.ComponentProps<typeof SharedPrimaryButton>) {
  return <SharedPrimaryButton {...props} />
}

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  settings: Settings
}

export function IconButton({ settings, style, ...rest }: Props) {
  return (
    <SharedIconButton
      style={{
        background: settings.uiBgColor,
        color: settings.panelTextColor ?? settings.textColor,
        borderRadius: settings.buttonBorderRadius,
        ...borderToStyle(settings.buttonBorder),
        ...style,
      }}
      {...rest}
    />
  )
}
