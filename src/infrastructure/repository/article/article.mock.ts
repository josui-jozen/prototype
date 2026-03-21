import { ArticleRepository } from '@/usecase/article/article.repository'
import { Article, ArticleVisibility } from '@/usecase/article/article.types'

const titles = [
  'テスト', '日記', 'やっほー', '散歩道にて', '春の日記', '冬の朝',
  '読書記録', '映画の感想', 'カフェにて', '雨の日', '夜の散歩',
  '週末のこと', '料理メモ', 'ふと思ったこと', '空を見上げて',
  '静かな午後', '音楽のこと', '旅の記録', '植物の成長', '手紙を書いた',
]

const bodies = [
  'テストの本文です。コピーサイトは、日記やエッセイを書くのにちょうどいい、文章書き散らしサービスです。',
  'もう一つのテスト記事です。',
  'コピーサイトを運営しているcatnoseという者です。コピーサイトをお探しの方はこちらのリンクからアクセスしてもらえると嬉しいです。\n\n## 経緯\n\n2024年9月からsizu.me内の「コピーサイト」というキーワードをタイトルに含むページが検索結果から突然消えました。',
]

const visibilities: ArticleVisibility[] = ['private', 'public']

function generateMockArticles(): Article[] {
  const articles: Article[] = []
  const start = new Date('2026-03-18')
  for (let i = 0; i < 100; i++) {
    const date = new Date(start)
    date.setDate(date.getDate() - Math.floor(i * 3.5))
    articles.push({
      id: String(i + 1),
      title: titles[i % titles.length],
      body: bodies[i % bodies.length],
      visibility: visibilities[i % 2],
      authorId: 'user1',
      authorName: 'saigo_don',
      authorAvatar: null,
      tags: [],
      createdAt: date,
      updatedAt: date,
    })
  }
  return articles
}

const mockArticles = generateMockArticles()

export const articleMockRepo: ArticleRepository = {
  findAll: async () => mockArticles,
  findById: async (id) => mockArticles.find((a) => a.id === id) ?? null,
  findByAuthor: async (authorId) =>
    mockArticles.filter((a) => a.authorId === authorId),
  findAdjacentByAuthor: async (authorId, currentId) => {
    const authorArticles = mockArticles.filter((a) => a.authorId === authorId)
    const idx = authorArticles.findIndex((a) => a.id === currentId)
    return {
      prev: idx > 0 ? authorArticles[idx - 1] : null,
      next: idx < authorArticles.length - 1 ? authorArticles[idx + 1] : null,
    }
  },
}
