import { useEffect } from 'react';
import { useSettingsStore } from '../stores/settingsStore';
import { getSubscriptionTier } from '../utils/purchases';
import { SubscriptionTier } from '../types/common';

export function usePremium(): {
  isPremium: boolean;
  subscriptionTier: SubscriptionTier;
  refresh: () => Promise<void>;
} {
  const isPremium = useSettingsStore((s) => s.isPremium);
  const subscriptionTier = useSettingsStore((s) => s.subscriptionTier);
  const setSubscriptionTier = useSettingsStore((s) => s.setSubscriptionTier);

  const refresh = async () => {
    const tier = await getSubscriptionTier();
    setSubscriptionTier(tier);
  };

  useEffect(() => {
    refresh();
  }, []);

  return { isPremium, subscriptionTier, refresh };
}
