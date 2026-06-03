import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  infoItem: {
    width: '50%',
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '600',
  },
});
