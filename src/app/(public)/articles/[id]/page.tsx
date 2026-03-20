import Link from 'next/link'
import Image from 'next/image'
import { Footer } from '@/app/_components/layout/Footer'
import { AuthorHomeLink } from '@/app/_components/article/AuthorHomeLink'
import { articleMockRepo } from '@/infrastructure/repository/article/article.mock'
import { notFound } from 'next/navigation'
import { VisibilityDropdown } from '@/app/_components/article/VisibilityDropdown'

function formatDate(date: Date) {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}

export default async function ArticlePreviewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const article = await articleMockRepo.findById(id)
  if (!article) notFound()

  const { prev, next } = await articleMockRepo.findAdjacentByAuthor(article.authorId, id)

  return (
    <>
      {/* Header */}
      <header className="h-[56.34px] flex items-center justify-between pl-[16.1px] pr-[16.1px] shrink-0">
        <Link
          href="/home"
          className="size-[32.2px] flex items-center justify-center rounded-full"
        >
          <Image src="/images/icons/back.svg" alt="戻る" width={24} height={24} />
        </Link>
        <div className="flex items-center gap-[8.05px]">
          <VisibilityDropdown value={article.visibility} />
          <Link
            href={`/editor/${article.id}`}
            className="flex items-center rounded-full px-[10.06px] py-[7.55px] no-underline"
          >
            <Image src="/images/icons/edit.svg" alt="" width={18} height={18} className="mr-[6.04px]" />
            <span className="text-[15.3px] text-[var(--color-text-secondary)]">記事を</span>
            <span className="text-[15.3px] text-[var(--color-text-secondary)]">編集</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="w-full max-w-[684px] mx-auto px-6">
          {/* Article Header */}
          <div className="flex flex-col gap-[80.5px] pt-[56.36px]">
            <h1 className="text-[20.3px] text-[var(--color-text-primary)] font-normal leading-[37.53px] tracking-[0.483px] m-0">
              {article.title}
            </h1>
            <div className="flex items-center">
              <div className="size-[28.17px] rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] shrink-0" />
              <span className="text-[14.9px] text-[var(--color-text-secondary)] tracking-[0.483px] leading-[26px] ml-[10.07px]">
                {article.authorName}
              </span>
              <span className="text-[16.1px] text-[#babec5] tracking-[0.483px] mx-[6.04px]">
                ·
              </span>
              <time className="text-[15.1px] text-[var(--color-text-secondary)] tracking-[0.382px] leading-[26px]">
                {formatDate(article.createdAt)}
              </time>
            </div>
          </div>

          {/* Article Body */}
          <article className="mt-[35.75px] pb-[56px] text-[17px] text-[var(--color-text-primary)] leading-[1.9] tracking-[0.4px]">
            {article.body.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2
                    key={i}
                    className="text-[22px] font-normal mt-[40px] mb-[16px] pb-[8px] border-b border-[var(--color-border)]"
                  >
                    {paragraph.replace('## ', '')}
                  </h2>
                )
              }
              return (
                <p key={i} className="mb-[24px]">
                  {paragraph}
                </p>
              )
            })}
          </article>

          {/* Article Navigation */}
          {(prev || next) && (
            <div className="flex items-stretch border border-[var(--color-border)] rounded-[19.32px] overflow-hidden">
              <Link
                href={prev ? `/articles/${prev.id}` : '#'}
                className={`flex-1 flex items-center gap-1 min-h-[56.35px] pl-[16.1px] pr-[17.1px] py-[14.09px] no-underline border-r border-[#f1f6f9] ${
                  prev ? '' : 'pointer-events-none'
                }`}
              >
                {prev && (
                  <>
                    <Image src="/images/icons/chevron-left.svg" alt="" width={20} height={20} className="-ml-[6px]" />
                    <span className="text-[15.3px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[22.94px] truncate">
                      {prev.title}
                    </span>
                  </>
                )}
              </Link>
              <Link
                href={next ? `/articles/${next.id}` : '#'}
                className={`flex-1 flex items-center justify-end gap-1 min-h-[56.35px] pl-[17.1px] pr-[16.1px] py-[14.09px] no-underline ${
                  next ? '' : 'pointer-events-none'
                }`}
              >
                {next && (
                  <>
                    <span className="text-[15.3px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[22.94px] truncate">
                      {next.title}
                    </span>
                    <Image src="/images/icons/chevron-left.svg" alt="" width={20} height={20} className="rotate-180 -mr-[6px]" />
                  </>
                )}
              </Link>
            </div>
          )}

          {/* Author Profile */}
          <div className="flex items-center gap-[16px] py-[28px]">
            <div className="size-[56px] rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] shrink-0" />
            <Link
              href="/home"
              className="text-[17px] text-[var(--color-text-primary)] no-underline"
            >
              {article.authorName}
            </Link>
          </div>

          {/* Author home link - only visible to the author */}
          <AuthorHomeLink authorId={article.authorId} authorName={article.authorName} />
        </div>
      </main>

      {/* Floating Menu Button */}
      <button className="fixed bottom-[56px] left-[64px] size-[58px] bg-white rounded-full shadow-[0px_0px_0px_1px_rgba(0,0,0,0.09),0px_3px_8px_-3px_rgba(0,0,0,0.08)] flex items-center justify-center z-10">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </button>

      <Footer />
    </>
  )
}
