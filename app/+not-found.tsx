import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Colors } from '../constants/colors';
import { Spacing } from '../constants/spacing';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page Not Found</Text>
      <Link href="/" style={styles.link}>
        Go to Home
      </Link>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  link: {
    fontSize: 16,
    color: Colors.primary,
  },
});
