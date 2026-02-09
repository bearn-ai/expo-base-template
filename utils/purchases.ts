import Purchases, {
  PurchasesOffering,
  PurchasesPackage,
  CustomerInfo,
} from 'react-native-purchases';
import { Platform } from 'react-native';
import { SubscriptionTier } from '../types/common';

// TODO: Customize per app — set real RevenueCat API keys
const API_KEYS = {
  ios: 'YOUR_REVENUECAT_IOS_KEY',
  android: 'YOUR_REVENUECAT_ANDROID_KEY',
};

// Entitlement IDs matching RevenueCat dashboard
const ENTITLEMENTS = {
  standard: 'standard',
  pro: 'pro',
};

export async function configurePurchases(): Promise<void> {
  const key = Platform.OS === 'ios' ? API_KEYS.ios : API_KEYS.android;
  Purchases.configure({ apiKey: key });
}

export async function getSubscriptionTier(): Promise<SubscriptionTier> {
  const info: CustomerInfo = await Purchases.getCustomerInfo();
  if (info.entitlements.active[ENTITLEMENTS.pro]) {
    return 'pro';
  }
  if (info.entitlements.active[ENTITLEMENTS.standard]) {
    return 'standard';
  }
  return 'free';
}

export async function checkPremium(): Promise<boolean> {
  const tier = await getSubscriptionTier();
  return tier !== 'free';
}

export async function getOfferings(): Promise<PurchasesOffering | null> {
  const offerings = await Purchases.getOfferings();
  return offerings.current;
}

export async function purchasePackage(
  pkg: PurchasesPackage
): Promise<SubscriptionTier> {
  const { customerInfo } = await Purchases.purchasePackage(pkg);
  if (customerInfo.entitlements.active[ENTITLEMENTS.pro]) {
    return 'pro';
  }
  if (customerInfo.entitlements.active[ENTITLEMENTS.standard]) {
    return 'standard';
  }
  return 'free';
}

export async function restorePurchases(): Promise<SubscriptionTier> {
  const info: CustomerInfo = await Purchases.restorePurchases();
  if (info.entitlements.active[ENTITLEMENTS.pro]) {
    return 'pro';
  }
  if (info.entitlements.active[ENTITLEMENTS.standard]) {
    return 'standard';
  }
  return 'free';
}
