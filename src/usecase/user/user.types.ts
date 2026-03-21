export type UserProfile = {
  id: string
  name: string
  handle: string
  avatar: string | null
  bio: string
  email: string
  createdAt: Date
  articleCount: number
  publicArticleCount: number
}

export type UserSettings = {
  defaultTitle: string
  paragraphSpacing: 'normal' | 'wide'
  emphasisStyle: 'bold' | 'background'
  receiveLetters: boolean
  hideOffensiveLetters: boolean
  newsletterNotification: boolean
  reflectionReport: boolean
}
