'use client'

import { useEffect } from 'react'

/**
 * ユーザーによるズーム操作を全て無効化する。
 *
 * - gesturestart (Safariのトラックパッド/マジックマウスピンチ) を抑止
 * - touchmove で複数指ジェスチャ(ピンチ) を抑止
 * - touchend の連続発火(ダブルタップ) を抑止
 *
 * <InnerScroll /> の touch-action:pan-y は InnerScroll 内部のみに効くため、
 * ドキュメント全体のズーム封じには本コンポーネントを併用する。
 */
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
