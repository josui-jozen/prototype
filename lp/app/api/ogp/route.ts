import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/ogp?url=...
 * 指定 URL の HTML を fetch し、OGP メタタグを抽出して返す。
 * 本文中の URL 行を Editor がプレビューする際のデータソース。
 */
export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')
  if (!url) {
    return NextResponse.json({ error: 'missing url' }, { status: 400 })
  }

  let target: URL
  try {
    target = new URL(url)
  } catch {
    return NextResponse.json({ error: 'invalid url' }, { status: 400 })
  }
  if (target.protocol !== 'http:' && target.protocol !== 'https:') {
    return NextResponse.json({ error: 'unsupported scheme' }, { status: 400 })
  }

  try {
    const res = await fetch(target.toString(), {
      headers: {
        'user-agent': 'Mozilla/5.0 (compatible; lp-ogp/1.0)',
        'accept': 'text/html,application/xhtml+xml',
      },
      next: { revalidate: 3600 },
    })
    if (!res.ok) {
      return NextResponse.json({ error: `upstream ${res.status}` }, { status: 502 })
    }
    const html = (await res.text()).slice(0, 200_000)  // HEAD 内で十分。巨大ページ対策。

    const pick = (prop: string): string | null => {
      const patterns = [
        new RegExp(`<meta[^>]+(?:property|name)=["']${prop}["'][^>]+content=["']([^"']+)["']`, 'i'),
        new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${prop}["']`, 'i'),
      ]
      for (const re of patterns) {
        const m = html.match(re)
        if (m) return decodeEntities(m[1])
      }
      return null
    }

    const titleTag = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    const data = {
      title: pick('og:title') ?? (titleTag ? decodeEntities(titleTag[1]).trim() : null),
      description: pick('og:description') ?? pick('description'),
      image: absolutize(pick('og:image'), target),
      siteName: pick('og:site_name') ?? target.hostname,
      url: target.toString(),
    }
    return NextResponse.json(data, {
      headers: { 'cache-control': 'public, max-age=3600, s-maxage=3600' },
    })
  } catch {
    return NextResponse.json({ error: 'fetch failed' }, { status: 500 })
  }
}

function absolutize(src: string | null, base: URL): string | null {
  if (!src) return null
  try {
    return new URL(src, base).toString()
  } catch {
    return null
  }
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
}
