import type { Metadata, Viewport } from 'next'
import { messages, langs, DOMAIN, type Lang } from '../i18n'

export function generateStaticParams() {
  return langs.map(lang => ({ lang }))
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#fcfaf2',
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
      images: [`${DOMAIN}/logo/logo-pixelated.png`],
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: t.title,
      description,
      images: [`${DOMAIN}/logo/logo-pixelated.png`],
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
  const htmlLang = t?.htmlLang ?? 'ja'
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "如水工作所",
    alternateName: "Josui Works",
    url: DOMAIN,
    logo: `${DOMAIN}/logo/logo.svg`,
    description: t?.description.replace('\n', '') ?? '',
  }

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(htmlLang)};`,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
