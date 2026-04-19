'use client'

import React from 'react'
import { SelectCard as SharedSelectCard } from '@/components/SelectCard'

export function SelectCard(props: React.ComponentProps<typeof SharedSelectCard>) {
  return <SharedSelectCard {...props} />
}
