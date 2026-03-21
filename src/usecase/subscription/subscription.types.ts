export type TimelineEntry = {
  id: string
  userName: string
  userAvatar: string | null
  userHandle: string
  articleId: string
  articleTitle: string
  publishedAt: Date
}

export type Subscription = {
  id: string
  userName: string
  userAvatar: string | null
  userHandle: string
  latestArticleTitle: string | null
}

export type SubscriptionTab = 'timeline' | 'list'
