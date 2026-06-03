import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import InfoItem from '../InfoItem';

type DeviceCardProps = {
  item: any;
  onView?: () => void;
  onEdit?: () => void;
  onPower?: () => void;
};

export function DeviceCard({ item, onView, onEdit, onPower }: DeviceCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.deviceName}</Text>
          <Text style={styles.deviceId}>{item.deviceType.name}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            item.isActive ? styles.onlineBadge : styles.offlineBadge,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color: item.isActive ? '#16A34A' : '#DC2626',
              },
            ]}
          >
            {item.isActive ? 'Hoạt động' : 'Mất kết nối'}
          </Text>
        </View>
      </View>

      <View style={styles.infoGrid}>
        <InfoItem label="Loại thiết bị" value={item.deviceType.name || '--'} />
        <InfoItem label="Model" value={item.model || '--'} />
        <InfoItem label="Hãng SX" value={item.manufacturer || '--'} />
        <InfoItem label="Firmware" value={item.firmware || '--'} />
      </View>

      <View style={styles.actionRow}>
        <ActionButton icon="eye" onPress={onView} />
        <ActionButton icon="edit-2" onPress={onEdit} />
        <ActionButton icon="power" danger onPress={onPower} />
      </View>
    </View>
  );
}

function ActionButton({ icon, danger, onPress, disable }: any) {
  return (
    <Pressable
      style={[styles.actionBtn, danger && styles.dangerBtn]}
      onPress={onPress}
      disabled={disable}
    >
      <Icon name={icon} size={18} color={danger ? '#FF3B30' : '#2563EB'} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EEF2F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },
  deviceId: {
    marginTop: 4,
    fontSize: 13,
    color: '#2563EB',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  onlineBadge: {
    backgroundColor: '#DCFCE7',
  },
  offlineBadge: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '700',
  },
  infoGrid: {
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 4,
  },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerBtn: {
    backgroundColor: '#f2f1ff',
  },
});
