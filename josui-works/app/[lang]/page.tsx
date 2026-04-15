import { redirect } from 'next/navigation'
import { messages, type Lang } from '../i18n'
import LangSwitcher from './LangSwitcher'
import '../globals.css'
import '../page.css'

export default async function LangPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!(lang in messages)) redirect('/ja')
  const currentLang = lang as Lang
  const t = messages[currentLang]

  return (
    <>
      <nav className="nav">
        <LangSwitcher current={currentLang} />
      </nav>
      <main className="page">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo/logo.svg" alt={t.title} className="logo" />
        <div className="text">
          <section className="section">
            <h1 className="title">
              {t.ruby
                ? <span className="ruby-wrapper"><span className="ruby-text">{[...t.ruby].map((c, i) => <span key={i}>{c}</span>)}</span><span>{t.title}</span></span>
                : t.title}
            </h1>
            <p className="description">{t.description.split('\n').map((line, i, arr) => <span key={i}>{line}{i < arr.length - 1 && <br />}</span>)}</p>
          </section>
          <section className="section">
            <h2 className="creators-label">{t.creatorsLabel}</h2>
            <ul className="creators-list">
              {t.creators.map((c, i) => (
                <li key={i} className="creator">
                  <span>{c.name}</span>
                  <span className="creator-links">
                    <a href={c.note} target="_blank" rel="noopener noreferrer" aria-label="note">
                      <svg viewBox="300 300 680 680" width="16" height="16" fill="currentColor">
                        <path d="M383 913 l-23 -4 0 -275 0 -274 80 0 80 0 0 211 0 211 101 -4 c143 -5 139 1 139 -234 l0 -184 80 0 80 0 0 203 c-1 210 -8 256 -47 299 -43 48 -67 53 -273 54 -107 1 -205 0 -217 -3z" transform="translate(0,1280) scale(1,-1)"/>
                      </svg>
                    </a>
                    <a href={c.x} target="_blank" rel="noopener noreferrer" aria-label="X">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  )
}
