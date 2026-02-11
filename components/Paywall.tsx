import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useState, useEffect } from 'react';
import { getOfferings, purchasePackage, restorePurchases } from '../utils/purchases';
import { useSettingsStore } from '../stores/settingsStore';
import { Colors } from '../constants/colors';
import { Spacing } from '../constants/spacing';
import { Strings } from '../constants/strings';
import { SubscriptionTier } from '../types/common';

interface PaywallProps {
  onClose: () => void;
}

const TIER_LABELS: Record<string, string> = {
  // TODO: Customize per app — map RevenueCat package identifiers to tier labels
  standard_monthly: Strings.paywall.standard,
  standard_weekly: Strings.paywall.standard,
  pro_monthly: Strings.paywall.pro,
  pro_weekly: Strings.paywall.pro,
};

export function Paywall({ onClose }: PaywallProps) {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const setSubscriptionTier = useSettingsStore((s) => s.setSubscriptionTier);

  useEffect(() => {
    getOfferings().then((offering) => {
      if (offering) {
        setPackages(offering.availablePackages);
      }
      setLoading(false);
    });
  }, []);

  const handlePurchase = async (pkg: any) => {
    setPurchasing(true);
    try {
      const tier: SubscriptionTier = await purchasePackage(pkg);
      setSubscriptionTier(tier);
      if (tier !== 'free') {
        onClose();
      }
    } finally {
      setPurchasing(false);
    }
  };

  const handleRestore = async () => {
    setPurchasing(true);
    try {
      const tier: SubscriptionTier = await restorePurchases();
      setSubscriptionTier(tier);
      if (tier !== 'free') {
        onClose();
      }
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{Strings.paywall.title}</Text>
      <Text style={styles.subtitle}>{Strings.paywall.subtitle}</Text>

      {packages.map((pkg) => (
        <TouchableOpacity
          key={pkg.identifier}
          style={styles.package}
          onPress={() => handlePurchase(pkg)}
          disabled={purchasing}
        >
          <Text style={styles.packageTitle}>
            {TIER_LABELS[pkg.identifier] ?? pkg.product.title}
          </Text>
          <Text style={styles.packagePrice}>{pkg.product.priceString}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity onPress={handleRestore} disabled={purchasing}>
        <Text style={styles.restore}>{Strings.paywall.restorePurchases}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onClose}>
        <Text style={styles.close}>{Strings.paywall.maybeLater}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.background,
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
    marginBottom: Spacing.lg,
  },
  package: {
    width: '100%',
    padding: Spacing.md,
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
    alignItems: 'center',
  },
  packageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  packagePrice: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  restore: {
    marginTop: Spacing.md,
    color: Colors.primary,
    fontSize: 14,
  },
  close: {
    marginTop: Spacing.sm,
    color: Colors.textSecondary,
    fontSize: 14,
  },
});
