"use client";

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Footer } from '@/app/_components/layout/Footer'
import { useAuth } from '@/app/_hooks/useAuth'
import { Article, isPublicVisibility } from '@/usecase/article/article.types'
import { articleMockRepo } from '@/infrastructure/repository/article/article.mock'

function formatTocDate(date: Date) {
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dayNames = ['日', '月', '火', '水', '木', '金', '土']
  const dayName = dayNames[date.getDay()]
  return { month: String(month), day: String(day), dayName }
}

type YearGroup = {
  year: number
  months: { month: number; articles: Article[] }[]
}

function groupByYearMonth(articles: Article[]): YearGroup[] {
  const map: Record<string, Article[]> = {}
  for (const article of articles) {
    const y = article.createdAt.getFullYear()
    const m = article.createdAt.getMonth() + 1
    const key = `${y}-${m}`
    if (!map[key]) map[key] = []
    map[key].push(article)
  }
  const yearMap: Record<number, { month: number; articles: Article[] }[]> = {}
  for (const [key, arts] of Object.entries(map)) {
    const [y, m] = key.split('-').map(Number)
    if (!yearMap[y]) yearMap[y] = []
    yearMap[y].push({ month: m, articles: arts })
  }
  return Object.entries(yearMap)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, months]) => ({
      year: Number(year),
      months: months.sort((a, b) => b.month - a.month),
    }))
}

export default function TocPage() {
  const { user } = useAuth()
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    articleMockRepo.findAll().then(setArticles)
  }, [])

  const groups = groupByYearMonth(articles)

  const yearMonths = articles
    .map((a) => ({
      year: a.createdAt.getFullYear(),
      month: a.createdAt.getMonth() + 1,
    }))
    .filter(
      (v, i, arr) =>
        arr.findIndex((x) => x.year === v.year && x.month === v.month) === i
    )
    .sort((a, b) => b.year - a.year || b.month - a.month)

  const [activeYearMonth, setActiveYearMonth] = useState(
    yearMonths.length > 0 ? `${yearMonths[0].year}-${yearMonths[0].month}` : ''
  )

  function scrollToSection(year: number, month: number) {
    const key = `${year}-${month}`
    setActiveYearMonth(key)
    const el = document.getElementById(`toc-${key}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <main className="flex-1 relative">
        {/* Header */}
        <header className="h-[56px] flex items-center px-4">
          <Link
            href="/home"
            className="flex items-center gap-2 no-underline text-[var(--color-text-primary)]"
          >
            <Image src="/images/icons/back.svg" alt="戻る" width={20} height={20} />
            <span className="text-[15px] tracking-[0.483px]">{user?.name}</span>
          </Link>
        </header>

        <div className="w-full max-w-[708px] mx-auto px-6">
          {/* Avatar + Title */}
          <div className="flex flex-col items-center gap-[14.08px] pt-[28px] pb-[64.4px]">
            <div className="size-[48.3px] rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)]" />
            <h1 className="text-[20.3px] text-[var(--color-text-primary)] font-normal tracking-[2.029px] leading-[34.49px] m-0">
              目次
            </h1>
          </div>

          {/* Article List by Year/Month */}
          <div className="flex flex-col gap-[64.4px]">
            {groups.map(({ year, months }) => (
              <section key={year}>
                <h2 className="flex items-center gap-[2.01px] text-[var(--color-text-muted)] font-normal m-0 mb-[24.08px]">
                  <span className="text-[20.3px] tracking-[0.483px] leading-[30.43px]">{year}</span>
                  <span className="text-[17.9px] tracking-[0.483px] leading-[26.81px]">年</span>
                </h2>
                <div className="flex flex-col gap-[27.32px]">
                  {months.map(({ month: m, articles: monthArticles }) => (
                    <div key={m} id={`toc-${year}-${m}`}>
                      {monthArticles.map((article) => {
                        const { month, day, dayName } = formatTocDate(
                          article.createdAt
                        )
                        return (
                          <Link
                            key={article.id}
                            href={`/articles/${article.id}`}
                            className="flex items-center no-underline group mb-[27.32px] last:mb-0"
                          >
                            <span className="text-[16.1px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[24.15px] shrink-0">
                              {article.title}
                            </span>
                            <span className="flex-1 min-w-[50px] h-[24.14px] overflow-hidden whitespace-nowrap text-[14px] text-[#d8dadf] tracking-[3px] leading-[21px] pl-[7px] pr-[3px]">
                              {'·'.repeat(100)}
                            </span>
                            <span className="shrink-0 relative text-[16.1px] text-[var(--color-text-muted)] tracking-[0.483px] leading-[24.15px] tabular-nums">
                              {month}
                              <span className="mx-[0.5px]">.</span>
                              {day}
                              <span className="text-[15.3px] leading-[22.94px] ml-[2px]">
                                ({dayName})
                              </span>
                              {isPublicVisibility(article.visibility) && (
                                <span className="absolute top-1/2 -translate-y-1/2 left-[calc(100%+8px)] size-[6.03px] rounded-full bg-[#b7e2fe]" />
                              )}
                            </span>
                          </Link>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Legend */}
          <div className="flex gap-[12.07px] justify-end pt-[32.2px] pb-[40.25px]">
            <div className="flex items-center gap-[8.05px]">
              <span className="size-[6.03px] rounded-full bg-[#b7e2fe]" />
              <span className="text-[12.9px] text-[#798184] tracking-[0.483px] leading-[21.9px]">
                みんなに公開
              </span>
            </div>
            <div className="flex items-center gap-[8.05px]">
              <span className="size-[6.03px] rounded-[2.01px] bg-[#bcc2ff]" />
              <span className="text-[12.9px] text-[#798184] tracking-[0.483px] leading-[21.9px]">
                URL限定公開
              </span>
            </div>
          </div>
        </div>

        {/* Right Sidebar - year/month nav */}
        <aside className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 items-center pr-[18px]">
          <nav className="flex flex-col">
            {yearMonths.map(({ year, month }) => {
              const key = `${year}-${month}`
              const isActive = activeYearMonth === key
              return (
                <button
                  key={key}
                  onClick={() => scrollToSection(year, month)}
                  className="flex items-center justify-end h-[24px] bg-transparent border-none cursor-pointer p-0 pl-[3.66px]"
                >
                  <span className={`text-[11px] tracking-[0.483px] leading-[12px] pr-[3px] whitespace-nowrap ${
                    isActive ? 'text-[#3b82f6]' : 'text-[#595f63]'
                  }`}>
                    {year}年{month}月
                  </span>
                  <span className={`w-[18px] h-px shrink-0 ${
                    isActive ? 'bg-[#3b82f6]' : 'bg-[#798184]'
                  }`} />
                </button>
              )
            })}
          </nav>
        </aside>
      </main>

      {/* Floating Menu Button */}
      <button className="fixed bottom-[56px] left-[64px] size-[58px] bg-white rounded-full shadow-[0px_0px_0px_1px_rgba(0,0,0,0.09),0px_3px_8px_-3px_rgba(0,0,0,0.08)] flex items-center justify-center z-10">
        <Image src="/images/icons/menu-dots.svg" alt="メニュー" width={28} height={28} />
      </button>

      <Footer />
    </>
  )
}
