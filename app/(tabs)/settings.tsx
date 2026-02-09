import { View, Text, Switch, StyleSheet } from 'react-native';
import { useSettingsStore } from '../../stores/settingsStore';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { Strings } from '../../constants/strings';

export default function SettingsScreen() {
  const notificationsEnabled = useSettingsStore(
    (s) => s.notificationsEnabled
  );
  const setNotifications = useSettingsStore((s) => s.setNotifications);
  const subscriptionTier = useSettingsStore((s) => s.subscriptionTier);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{Strings.settings.title}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>{Strings.settings.premium}</Text>
        <Text style={styles.value}>{subscriptionTier.toUpperCase()}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{Strings.settings.notifications}</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotifications}
          trackColor={{ true: Colors.primary }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.md,
    paddingTop: Spacing.xxl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.divider,
  },
  label: {
    fontSize: 16,
    color: Colors.text,
  },
  value: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
});
