import { SubscriptionRepository } from '@/usecase/subscription/subscription.repository'
import { TimelineEntry, Subscription } from '@/usecase/subscription/subscription.types'

const mockTimeline: TimelineEntry[] = [
  {
    id: 'tl-1',
    userName: 'はなこ',
    userAvatar: null,
    userHandle: 'hanako_writes',
    articleId: 'ext-10',
    articleTitle: '春が来た',
    publishedAt: new Date('2026-03-19'),
  },
  {
    id: 'tl-2',
    userName: '田中太郎',
    userAvatar: null,
    userHandle: 'tanaka_t',
    articleId: 'ext-11',
    articleTitle: '朝のルーティン',
    publishedAt: new Date('2026-03-17'),
  },
  {
    id: 'tl-3',
    userName: 'まりこ',
    userAvatar: null,
    userHandle: 'mariko_book',
    articleId: 'ext-12',
    articleTitle: '今月読んだ本まとめ',
    publishedAt: new Date('2026-03-15'),
  },
  {
    id: 'tl-4',
    userName: 'あおい',
    userAvatar: null,
    userHandle: 'aoi_sky',
    articleId: 'ext-13',
    articleTitle: '引っ越しの記録',
    publishedAt: new Date('2026-03-12'),
  },
  {
    id: 'tl-5',
    userName: 'はなこ',
    userAvatar: null,
    userHandle: 'hanako_writes',
    articleId: 'ext-14',
    articleTitle: 'お気に入りのカフェ',
    publishedAt: new Date('2026-03-08'),
  },
  {
    id: 'tl-6',
    userName: 'けんじ',
    userAvatar: null,
    userHandle: 'kenji_dev',
    articleId: 'ext-15',
    articleTitle: '週末プログラミング日記',
    publishedAt: new Date('2026-03-05'),
  },
  {
    id: 'tl-7',
    userName: 'さくら',
    userAvatar: null,
    userHandle: 'sakura_memo',
    articleId: 'ext-16',
    articleTitle: '映画「静寂」の感想',
    publishedAt: new Date('2026-02-28'),
  },
  {
    id: 'tl-8',
    userName: '田中太郎',
    userAvatar: null,
    userHandle: 'tanaka_t',
    articleId: 'ext-17',
    articleTitle: '料理を始めた話',
    publishedAt: new Date('2026-02-22'),
  },
]

const mockSubscriptions: Subscription[] = [
  {
    id: 'sub-1',
    userName: 'はなこ',
    userAvatar: null,
    userHandle: 'hanako_writes',
    latestArticleTitle: '春が来た',
  },
  {
    id: 'sub-2',
    userName: '田中太郎',
    userAvatar: null,
    userHandle: 'tanaka_t',
    latestArticleTitle: '料理を始めた話',
  },
  {
    id: 'sub-3',
    userName: 'まりこ',
    userAvatar: null,
    userHandle: 'mariko_book',
    latestArticleTitle: '今月読んだ本まとめ',
  },
  {
    id: 'sub-4',
    userName: 'あおい',
    userAvatar: null,
    userHandle: 'aoi_sky',
    latestArticleTitle: '引っ越しの記録',
  },
  {
    id: 'sub-5',
    userName: 'けんじ',
    userAvatar: null,
    userHandle: 'kenji_dev',
    latestArticleTitle: '週末プログラミング日記',
  },
]

export const subscriptionMockRepo: SubscriptionRepository = {
  getTimeline: async () => mockTimeline,
  getSubscriptions: async () => mockSubscriptions,
}
