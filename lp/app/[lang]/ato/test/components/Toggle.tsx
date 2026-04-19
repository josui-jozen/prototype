'use client'

import React from 'react'
import { Toggle as SharedToggle } from '@/components/Toggle'

export function Toggle(props: React.ComponentProps<typeof SharedToggle>) {
  return <SharedToggle {...props} />
}
