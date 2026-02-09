import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { Strings } from '../../constants/strings';

// TODO: Customize per app — replace with app-specific home screen
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{Strings.appName}</Text>
      <Text style={styles.subtitle}>{Strings.tagline}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});
