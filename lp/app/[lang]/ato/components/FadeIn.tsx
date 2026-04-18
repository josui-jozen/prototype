'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'
import './FadeIn.css'

export default function FadeIn({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { rootMargin: '-35% 0px -55% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`fade-in${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  )
}
