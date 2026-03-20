"use client";

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Plus } from 'lucide-react'
import { Footer } from '@/app/_components/layout/Footer'
import { useAuth } from '@/app/_hooks/useAuth'
import { Article } from '@/usecase/article/article.types'
import { articleMockRepo } from '@/infrastructure/repository/article/article.mock'
import { VisibilityBadge } from '@/app/_components/ui/VisibilityBadge'

function formatDate(date: Date) {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}

export default function HomePage() {
  const { user } = useAuth()
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    articleMockRepo.findAll().then(setArticles)
  }, [])

  return (
    <>
      <main className="flex-1">
        <div className="w-full max-w-[894px] mx-auto px-6 sm:px-10">
          {/* Header */}
          <header className="flex items-center justify-between py-[48px]">
            <Link
              href="/home"
              className="flex items-center gap-[14px] no-underline"
            >
              <div className="size-[44px] rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)]" />
              <span className="text-[17.9px] text-[var(--color-text-primary)] tracking-[0.483px]">
                {user?.name}
              </span>
            </Link>
            <div className="flex shrink-0 items-center">
              <Link
                href="/toc"
                className="size-[44px] shrink-0 rounded-full flex items-center justify-center hover:bg-[var(--color-bg-secondary)]"
              >
                <Image src="/images/icons/toc.svg" alt="目次" width={27} height={27} />
              </Link>
              <button className="size-[44px] shrink-0 rounded-full flex items-center justify-center hover:bg-[var(--color-bg-secondary)] p-0 border-none bg-transparent cursor-pointer ml-[8.05px]">
                <Search
                  size={22}
                  className="text-[var(--color-text-primary)]"
                />
              </button>
              <Link
                href="/editor"
                className="size-[44px] shrink-0 rounded-full flex items-center justify-center border border-[#e6e8e9] hover:bg-[var(--color-bg-secondary)] ml-[18.03px]"
              >
                <Plus
                  size={22}
                  className="text-[var(--color-text-primary)]"
                />
              </Link>
            </div>
          </header>

          {/* Article Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.id}`}
                className="block no-underline group"
              >
                <div className="bg-[#f1f6f9] rounded-[19px] h-[157px] relative overflow-hidden">
                  {/* Mini preview */}
                  <div className="absolute top-[24px] left-1/2 -translate-x-1/2 w-[88px] h-[109px] bg-white rounded-[2px] shadow-[2px_2px_4px_-2px_rgba(0,0,0,0.2)] overflow-hidden p-[10px]">
                    <p className="text-[3.6px] text-[var(--color-text-primary)] leading-[6px] m-0">
                      {article.title}
                    </p>
                  </div>
                  <VisibilityBadge visibility={article.visibility} />
                  <button className="absolute top-1 right-[-4px] p-2 rotate-90">
                    <Image src="/images/icons/menu-dots.svg" alt="メニュー" width={18} height={18} />
                  </button>
                </div>
                <h3 className="mt-3 text-[16.1px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[27px] m-0 font-normal">
                  {article.title}
                </h3>
                <time className="text-[13.5px] text-[var(--color-text-muted)] tracking-[0.676px] leading-[20px] mt-[2px] block">
                  {formatDate(article.createdAt)}
                </time>
              </Link>
            ))}
          </div>

          {/* Profile Section */}
          <div className="mt-[232px] mb-[80px] border border-[var(--color-border)] rounded-[var(--radius-modal)] flex items-center gap-[16px] px-[33px] py-[33px]">
            <div className="size-[56px] rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] shrink-0" />
            <span className="text-[17.9px] text-[var(--color-text-primary)] tracking-[0.483px]">
              {user?.name}
            </span>
          </div>
        </div>
      </main>

      {/* Floating Menu Button */}
      <button className="fixed bottom-[56px] left-[64px] size-[58px] bg-white rounded-full shadow-[0px_0px_0px_1px_rgba(0,0,0,0.09),0px_3px_8px_-3px_rgba(0,0,0,0.08)] flex items-center justify-center z-10">
        <Image src="/images/icons/menu-dots.svg" alt="メニュー" width={28} height={28} />
      </button>

      <Footer />
    </>
  )
}
