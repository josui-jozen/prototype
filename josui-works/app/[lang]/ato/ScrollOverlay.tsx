'use client'

import { useEffect, useState } from 'react'

const MAX_OPACITY = 0.5
const START_PX = 0
const END_PX = 400

export default function ScrollOverlay() {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      const y = window.scrollY
      const t = Math.max(0, Math.min(1, (y - START_PX) / (END_PX - START_PX)))
      setOpacity(t * MAX_OPACITY)
      raf = 0
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <div className="ato-scroll-overlay" style={{ opacity }} />
}
