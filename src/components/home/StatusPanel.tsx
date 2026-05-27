import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {waterArea} from '../../../db/mockData';
import {palette} from '../../theme';

export function StatusPanel() {
  return (
    <View style={styles.statusCard}>
      <View style={styles.shield}>
        <Text style={styles.shieldText}>✓</Text>
      </View>
      <View style={styles.statusCopy}>
        <Text style={styles.mutedLabel}>Trạng thái hiện tại</Text>
        <Text style={styles.dangerTitle}>{waterArea.status}</Text>
        <Text style={styles.statusDescription}>
          Cần xử lý sớm để đảm bảo an toàn cho cá
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusCard: {
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.surface,
    borderRadius: 8,
    padding: 18,
    minHeight: 112,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shield: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: palette.red,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
    shadowColor: palette.red,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.24,
    shadowRadius: 12,
    elevation: 4,
  },
  shieldText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '900',
  },
  statusCopy: {
    flex: 1,
  },
  mutedLabel: {
    color: palette.muted,
    fontSize: 13,
  },
  dangerTitle: {
    color: palette.red,
    fontSize: 21,
    fontWeight: '900',
    marginTop: 6,
  },
  statusDescription: {
    color: '#4f566c',
    fontSize: 13,
    marginTop: 8,
  },
});
