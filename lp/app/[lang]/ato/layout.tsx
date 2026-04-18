import type { Metadata } from 'next'
import { DOMAIN } from '../i18n'
export const metadata: Metadata = {
  title: 'あと、 — 僕を書くためのノート',
  description: '感情としての言葉を大切にするエディター。うれしかったことを、つらかったことを、ただ思ったままに、書く。',
  openGraph: {
    title: 'あと、 — 僕を書くためのノート',
    description: '感情としての言葉を大切にするエディター。',
    url: `${DOMAIN}/ja/ato`,
    type: 'website',
  },
}

export default function AtoLayout({ children }: { children: React.ReactNode }) {
  return children
}
