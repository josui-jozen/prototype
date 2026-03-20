import { Article } from './article.types'

export type ArticleRepository = {
  findAll: () => Promise<Article[]>
  findById: (id: string) => Promise<Article | null>
  findByAuthor: (authorId: string) => Promise<Article[]>
  findAdjacentByAuthor: (authorId: string, currentId: string) => Promise<{ prev: Article | null; next: Article | null }>
}
