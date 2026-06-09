import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type HistoryItemProps = {
  item: any;
};

export default function HistoryItemCard({ item }: HistoryItemProps) {
  const getStatusColor = () => {
    switch (item.status) {
      case 'normal':
        return '#16a34a';
      case 'warning':
        return '#f59e0b';
      case 'danger':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.metricName}>{item.parameter?.name}</Text>
        <View
          style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.value}>
        {item.valueNumeric} {item.unit?.symbol}
      </Text>
      <Text style={styles.time}>
        {new Date(item.observationTime).toLocaleString('vi-VN')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    maxWidth: '80%',
  },
  value: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2563eb',
  },
  device: {
    fontSize: 14,
    color: '#4b5563',
  },
  time: {
    fontSize: 12,
    color: '#9ca3af',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
