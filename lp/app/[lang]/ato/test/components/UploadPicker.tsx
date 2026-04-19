'use client'

import React from 'react'
import { UploadPicker as SharedUploadPicker } from '@/components/UploadPicker'

export function UploadPicker(props: React.ComponentProps<typeof SharedUploadPicker>) {
  return <SharedUploadPicker {...props} />
}
