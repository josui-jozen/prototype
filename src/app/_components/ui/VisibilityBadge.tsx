import { ArticleVisibility, VISIBILITY_LABELS } from '@/usecase/article/article.types'

type Variant = 'overlay' | 'pill'

type Props = {
  visibility: ArticleVisibility
  variant?: Variant
}

export function VisibilityBadge({ visibility, variant = 'overlay' }: Props) {
  const label = VISIBILITY_LABELS[visibility]

  if (variant === 'overlay') {
    if (visibility === 'public') return null
    return (
      <span className="absolute top-3 left-3 bg-white/80 text-[var(--color-text-secondary)] text-[11.5px] tracking-[0.483px] rounded-lg px-1.5 py-1.25 leading-none">
        {label}
      </span>
    )
  }

  // pill variant (記事ヘッダー用)
  return (
    <span className="text-[13.5px] text-[var(--color-text-secondary)] tracking-[0.338px] leading-[16.91px] whitespace-nowrap">
      {label}
    </span>
  )
}
