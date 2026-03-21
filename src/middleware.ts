import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = 'prototype-auth'

export function middleware(request: NextRequest) {
  const passphrase = process.env.SITE_PASSPHRASE
  if (!passphrase) return NextResponse.next() // envなければ認証スキップ（ローカル開発用）

  // 認証済みチェック
  if (request.cookies.get(COOKIE_NAME)?.value === passphrase) {
    return NextResponse.next()
  }

  // POST: 合言葉の検証
  if (request.method === 'POST' && request.nextUrl.pathname === '/api/gate') {
    return // API routeに任せる
  }

  // 認証ページ自体はスキップ
  if (request.nextUrl.pathname === '/gate') {
    return NextResponse.next()
  }

  // 静的ファイルはスキップ
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/images') ||
    request.nextUrl.pathname.endsWith('.svg') ||
    request.nextUrl.pathname.endsWith('.ico')
  ) {
    return NextResponse.next()
  }

  // 未認証 → 合言葉入力ページへリダイレクト
  return NextResponse.redirect(new URL('/gate', request.url))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
