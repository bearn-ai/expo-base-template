// AdMob wrapper — stub implementation for Expo Go development
// Native ads require a development build (eas build) and the
// react-native-google-mobile-ads package. To enable real ads:
//   1. npm install react-native-google-mobile-ads
//   2. Add the plugin to app.json with your AdMob app IDs
//   3. Replace this file with the native implementation

// TODO: Customize per app — set real ad unit IDs for production
export const AD_UNIT_IDS = {
  banner: __DEV__ ? 'ca-app-pub-3940256099942544/6300978111' : 'YOUR_BANNER_ID',
  interstitial: __DEV__
    ? 'ca-app-pub-3940256099942544/1033173712'
    : 'YOUR_INTERSTITIAL_ID',
  rewarded: __DEV__
    ? 'ca-app-pub-3940256099942544/5224354917'
    : 'YOUR_REWARDED_ID',
};

export function loadInterstitial(): Promise<void> {
  return Promise.resolve();
}

export function showInterstitial(): void {}

export function loadRewarded(): Promise<void> {
  return Promise.resolve();
}

export function showRewarded(): Promise<boolean> {
  return Promise.resolve(false);
}
