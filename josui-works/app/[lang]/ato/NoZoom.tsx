'use client'

import { useEffect } from 'react'

export default function NoZoom() {
  useEffect(() => {
    const onGesture = (e: Event) => e.preventDefault()
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault()
    }
    let lastTap = 0
    const onTap = (e: TouchEvent) => {
      const now = Date.now()
      if (now - lastTap < 300) e.preventDefault()
      lastTap = now
    }
    document.addEventListener('gesturestart', onGesture)
    document.addEventListener('touchmove', onTouch, { passive: false })
    document.addEventListener('touchend', onTap, { passive: false })
    return () => {
      document.removeEventListener('gesturestart', onGesture)
      document.removeEventListener('touchmove', onTouch)
      document.removeEventListener('touchend', onTap)
    }
  }, [])
  return null
}
