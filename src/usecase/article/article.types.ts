export type ArticleVisibility = 'private' | 'public' | 'url_only'

export const VISIBILITY_LABELS: Record<ArticleVisibility, string> = {
  private: '自分だけ',
  public: 'みんなに公開',
  url_only: 'URL限定公開',
}

export function isPublicVisibility(visibility: ArticleVisibility): boolean {
  return visibility === 'public'
}

export type Article = {
  id: string
  title: string
  body: string
  visibility: ArticleVisibility
  authorId: string
  authorName: string
  authorAvatar: string | null
  tags: string[]
  createdAt: Date
  updatedAt: Date
}
