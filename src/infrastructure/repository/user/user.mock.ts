import { UserRepository } from '@/usecase/user/user.repository'
import { UserProfile, UserSettings } from '@/usecase/user/user.types'

const mockProfile: UserProfile = {
  id: 'user1',
  name: 'saigo_don',
  handle: 'saigo_don',
  avatar: null,
  bio: '日記やエッセイを静かに書いています。',
  email: 'saigo@example.com',
  createdAt: new Date('2025-04-01'),
  articleCount: 42,
  publicArticleCount: 28,
}

const mockSettings: UserSettings = {
  defaultTitle: '',
  paragraphSpacing: 'normal',
  emphasisStyle: 'bold',
  receiveLetters: true,
  hideOffensiveLetters: true,
  newsletterNotification: true,
  reflectionReport: false,
}

export const userMockRepo: UserRepository = {
  getProfile: async () => mockProfile,
  getSettings: async () => ({ ...mockSettings }),
  updateSettings: async (_userId, settings) => {
    Object.assign(mockSettings, settings)
  },
}
