export type Letter = {
  id: string
  message: string
  senderName: string
  senderAvatar: string | null
  senderHandle: string
  articleId: string
  articleTitle: string
  stampEmoji: string
  hearted: boolean
  createdAt: Date
}

export type LetterTab = 'received' | 'sent'
