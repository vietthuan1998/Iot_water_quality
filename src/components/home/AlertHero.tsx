import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {palette} from '../../theme';

type AlertHeroProps = {
  onOpenAlerts: () => void;
};

export function AlertHero({onOpenAlerts}: AlertHeroProps) {
  return (
    <View style={styles.hero}>
      <View style={styles.heroWarningIcon}>
        <Text style={styles.heroWarningText}>!</Text>
      </View>
      <View style={styles.heroCopy}>
        <Text style={styles.heroTitle}>Đang có 3 cảnh báo</Text>
        <Text style={styles.heroSubtitle}>Hồ đang có dấu hiệu bất thường</Text>
      </View>
      <View style={styles.heroRing}>
        <Text style={styles.heroCount}>3</Text>
      </View>
      <Pressable onPress={onOpenAlerts} style={styles.heroButton}>
        <Text style={styles.heroButtonText}>Xem chi tiết ›</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    minHeight: 152,
    borderRadius: 8,
    backgroundColor: palette.red,
    marginTop: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: palette.red,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 5,
  },
  heroWarningIcon: {
    width: 64,
    height: 64,
    borderRadius: 8,
    borderWidth: 4,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  heroWarningText: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '900',
  },
  heroCopy: {
    flex: 1,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '900',
  },
  heroSubtitle: {
    color: '#ffe8ec',
    fontSize: 14,
    marginTop: 8,
  },
  heroRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 8,
    borderColor: '#ffffff55',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCount: {
    color: '#fff',
    fontSize: 42,
    fontWeight: '900',
  },
  heroButton: {
    position: 'absolute',
    right: 18,
    bottom: 12,
    minWidth: 116,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  heroButtonText: {
    color: palette.red,
    fontSize: 13,
    fontWeight: '900',
  },
});
