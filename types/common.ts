export type ThemeType = 'light' | 'dark' | 'system';

export type SubscriptionTier = 'free' | 'standard' | 'pro';

export interface User {
  id: string;
  isPremium: boolean;
  subscriptionTier: SubscriptionTier;
  createdAt: number;
}
