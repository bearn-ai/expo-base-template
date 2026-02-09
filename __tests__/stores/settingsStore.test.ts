import { useSettingsStore } from '../../stores/settingsStore';

// Reset store before each test
beforeEach(() => {
  useSettingsStore.setState({
    isPremium: false,
    subscriptionTier: 'free',
    notificationsEnabled: true,
  });
});

describe('settingsStore', () => {
  it('has correct initial state', () => {
    const state = useSettingsStore.getState();
    expect(state.isPremium).toBe(false);
    expect(state.subscriptionTier).toBe('free');
    expect(state.notificationsEnabled).toBe(true);
  });

  it('sets premium status', () => {
    useSettingsStore.getState().setPremium(true);
    expect(useSettingsStore.getState().isPremium).toBe(true);
  });

  it('sets subscription tier and updates isPremium', () => {
    useSettingsStore.getState().setSubscriptionTier('pro');
    const state = useSettingsStore.getState();
    expect(state.subscriptionTier).toBe('pro');
    expect(state.isPremium).toBe(true);
  });

  it('sets tier to free and clears isPremium', () => {
    useSettingsStore.getState().setSubscriptionTier('pro');
    useSettingsStore.getState().setSubscriptionTier('free');
    const state = useSettingsStore.getState();
    expect(state.subscriptionTier).toBe('free');
    expect(state.isPremium).toBe(false);
  });

  it('toggles notifications', () => {
    useSettingsStore.getState().setNotifications(false);
    expect(useSettingsStore.getState().notificationsEnabled).toBe(false);
    useSettingsStore.getState().setNotifications(true);
    expect(useSettingsStore.getState().notificationsEnabled).toBe(true);
  });
});
