import type { Metadata } from 'next'
import Script from 'next/script'
import { messages, langs, DOMAIN, type Lang } from '../i18n'

export function generateStaticParams() {
  return langs.map(lang => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const t = messages[lang as Lang]
  if (!t) return {}
  const canonicalUrl = `${DOMAIN}/${lang}`
  const description = t.description.replace('\n', '')

  return {
    title: t.title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries(
        langs.map(l => [messages[l].htmlLang, `${DOMAIN}/${l}`])
      ),
    },
    openGraph: {
      title: t.title,
      description,
      url: canonicalUrl,
      images: [`${DOMAIN}/images/logo-pixelated.png`],
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: t.title,
      description,
      images: [`${DOMAIN}/images/logo-pixelated.png`],
    },
  }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const t = messages[lang as Lang]
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "如水工作所",
    alternateName: "Josui Works",
    url: DOMAIN,
    logo: `${DOMAIN}/images/logo.svg`,
    description: t?.description.replace('\n', '') ?? '',
  }

  return (
    <html lang={t?.htmlLang ?? 'ja'}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-MK0WZV4Y9C" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-MK0WZV4Y9C');`}</Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
