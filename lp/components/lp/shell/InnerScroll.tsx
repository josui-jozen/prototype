'use client'

import { useEffect } from 'react'

/**
 * スクロール責務をウィンドウから内部コンテナへ逃がす。
 *
 * モバイルブラウザ(特にiOS Safari)はウィンドウスクロールに対して、
 * アドレスバーの伸縮・オーバースクロールバウンス・プルダウンリフレッシュを
 * 自動で挟み込む。LPのように筐体感を出したい場面では邪魔。
 *
 * - html/body を overflow:hidden に固定 → ウィンドウ自体はスクロールしない
 * - 内側の div が overflow-y:auto でスクロール → ブラウザ視点では「要素スクロール」
 *   なので、上記のページレベル挙動が一切発動しない
 * - overscroll-behavior:none で内部バウンスも停止、touch-action:pan-y で
 *   ピンチや横スワイプをブラウザに拾わせない
 *
 * ピンチズーム・ダブルタップズームの抑制は本コンポーネントの責務外。
 * 必要なら <NoZoom /> と併用する(ドキュメント全体で有効)。
 */
export default function InnerScroll({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyOverscroll: body.style.overscrollBehavior,
    }
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    body.style.overscrollBehavior = 'none'
    return () => {
      html.style.overflow = prev.htmlOverflow
      body.style.overflow = prev.bodyOverflow
      body.style.overscrollBehavior = prev.bodyOverscroll
    }
  }, [])

  return (
    <div
      className={className}
      style={{
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        overscrollBehavior: 'none',
        WebkitOverflowScrolling: 'touch',
        touchAction: 'pan-y',
      }}
      {...rest}
    >
      {children}
    </div>
  )
}
