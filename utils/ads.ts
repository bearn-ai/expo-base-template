import {
  InterstitialAd,
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';

// Test IDs in __DEV__, replace with real IDs before release
// TODO: Customize per app — set real ad unit IDs
export const AD_UNIT_IDS = {
  banner: __DEV__ ? 'ca-app-pub-3940256099942544/6300978111' : 'YOUR_BANNER_ID',
  interstitial: __DEV__
    ? 'ca-app-pub-3940256099942544/1033173712'
    : 'YOUR_INTERSTITIAL_ID',
  rewarded: __DEV__
    ? 'ca-app-pub-3940256099942544/5224354917'
    : 'YOUR_REWARDED_ID',
};

// Interstitial helper
const interstitial = InterstitialAd.createForAdRequest(
  AD_UNIT_IDS.interstitial
);

export function loadInterstitial(): Promise<void> {
  return new Promise((resolve, reject) => {
    const unsubLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        unsubLoaded();
        resolve();
      }
    );
    const unsubError = interstitial.addAdEventListener(
      AdEventType.ERROR,
      (error) => {
        unsubError();
        reject(error);
      }
    );
    interstitial.load();
  });
}

export function showInterstitial(): void {
  interstitial.show();
}

// Rewarded video helper
const rewarded = RewardedAd.createForAdRequest(AD_UNIT_IDS.rewarded);

export function loadRewarded(): Promise<void> {
  return new Promise((resolve, reject) => {
    const unsubLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        unsubLoaded();
        resolve();
      }
    );
    const unsubError = rewarded.addAdEventListener(
      AdEventType.ERROR,
      (error) => {
        unsubError();
        reject(error);
      }
    );
    rewarded.load();
  });
}

export function showRewarded(): Promise<boolean> {
  return new Promise((resolve) => {
    const unsubEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      () => {
        unsubEarned();
        resolve(true);
      }
    );
    const unsubClosed = rewarded.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        unsubClosed();
        resolve(false);
      }
    );
    rewarded.show();
  });
}
