'use client'

import InnerScroll from './shell/InnerScroll'
import NoZoom from './shell/NoZoom'

/**
 * LP ページの最上位に置く汎用シェル。
 *
 * - InnerScroll: ウィンドウスクロールを封じ、内側 div でのみ縦スクロール
 * - NoZoom: ドキュメント全体でピンチ/ダブルタップズームを抑止
 *
 * モバイルブラウザ(特にiOS Safari)のアドレスバー伸縮・オーバースクロールバウンス・
 * プルダウンリフレッシュ・ズーム操作をまとめて封じ、LP に筐体感を与える。
 *
 * HTML 属性は内側の InnerScroll(div) に spread される。
 * 例: <LpShell className="my-page" role="main">...</LpShell>
 */
export default function LpShell(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      <NoZoom />
      <InnerScroll {...props} />
    </>
  )
}
