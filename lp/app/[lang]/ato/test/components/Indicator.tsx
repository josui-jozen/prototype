'use client'

import React from 'react'
import { Indicator as SharedIndicator } from '@/components/Indicator'

export function Indicator(props: React.ComponentProps<typeof SharedIndicator>) {
  return <SharedIndicator {...props} />
}
