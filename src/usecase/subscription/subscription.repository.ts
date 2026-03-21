import type { TimelineEntry, Subscription } from './subscription.types'

export type SubscriptionRepository = {
  getTimeline: () => Promise<TimelineEntry[]>
  getSubscriptions: () => Promise<Subscription[]>
}
