import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SubscriptionTier } from '../types/common';

interface SettingsState {
  isPremium: boolean;
  subscriptionTier: SubscriptionTier;
  notificationsEnabled: boolean;
  setPremium: (value: boolean) => void;
  setSubscriptionTier: (tier: SubscriptionTier) => void;
  setNotifications: (value: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      isPremium: false,
      subscriptionTier: 'free',
      notificationsEnabled: true,
      setPremium: (value) => set({ isPremium: value }),
      setSubscriptionTier: (tier) =>
        set({ subscriptionTier: tier, isPremium: tier !== 'free' }),
      setNotifications: (value) => set({ notificationsEnabled: value }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
