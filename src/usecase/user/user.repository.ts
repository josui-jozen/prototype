import type { UserProfile, UserSettings } from './user.types'

export type UserRepository = {
  getProfile: (userId: string) => Promise<UserProfile>
  getSettings: (userId: string) => Promise<UserSettings>
  updateSettings: (userId: string, settings: Partial<UserSettings>) => Promise<void>
}
