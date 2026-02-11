// RevenueCat wrapper — stub implementation for Expo Go development
// Native purchases require a development build (eas build) and the
// react-native-purchases package. To enable real purchases:
//   1. npm install react-native-purchases
//   2. Replace this file with the native implementation
//   3. Set RevenueCat API keys

import { SubscriptionTier } from '../types/common';

export async function configurePurchases(): Promise<void> {}

export async function getSubscriptionTier(): Promise<SubscriptionTier> {
  return 'free';
}

export async function checkPremium(): Promise<boolean> {
  return false;
}

export async function getOfferings(): Promise<any | null> {
  return null;
}

export async function purchasePackage(_pkg: any): Promise<SubscriptionTier> {
  return 'free';
}

export async function restorePurchases(): Promise<SubscriptionTier> {
  return 'free';
}
