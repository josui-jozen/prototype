'use client'

import React from 'react'
import { TextInput as SharedTextInput } from '@/components/TextInput'

export function TextInput(props: React.ComponentProps<typeof SharedTextInput>) {
  return <SharedTextInput {...props} />
}
