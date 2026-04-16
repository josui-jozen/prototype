'use client'

import { useEffect, useRef, useState } from 'react'
import Cursor from './Cursor'

type Props = {
  reading: string // e.g. 'せかいかん'
  final: string // e.g. '世界観'
}

export default function TypedSectionTitle({ reading, final }: Props) {
  const ref = useRef<HTMLHeadingElement>(null)
  const [text, setText] = useState('')
  const [converted, setConverted] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true)
      },
      { rootMargin: '-35% 0px -55% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const timers: number[] = []
    const typeDelay = 80
    reading.split('').forEach((_, i) => {
      timers.push(
        window.setTimeout(() => {
          setText(reading.slice(0, i + 1))
        }, typeDelay * (i + 1))
      )
    })
    // conversion after full type + pause
    timers.push(
      window.setTimeout(() => {
        setConverted(true)
      }, typeDelay * reading.length + 500)
    )
    return () => timers.forEach(clearTimeout)
  }, [started, reading])

  return (
    <h2 ref={ref} className="ato-section-title">
      <span>{converted ? final : text}</span>
      <Cursor />
    </h2>
  )
}
