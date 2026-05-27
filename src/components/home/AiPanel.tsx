import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SensorMetric, aiInsights} from '../../../db/mockData';
import {palette} from '../../theme';

export function AiPanel() {
  const score = 38;

  return (
    <View style={styles.aiCard}>
      <View style={styles.scoreWrap}>
        <View style={styles.scoreGauge}>
          <Text style={styles.scoreNumber}>{score}</Text>
          <Text style={styles.scoreMax}>/100</Text>
        </View>
        <Text style={styles.scoreCaption}>Điểm sức khỏe</Text>
        <Text style={styles.scoreDanger}>Nguy hiểm</Text>
      </View>
      <View style={styles.aiList}>
        {aiInsights.map(item => (
          <View key={item.id} style={styles.aiRow}>
            <View style={[styles.aiDot, dotColor(item.severity)]}>
              <Text style={styles.aiDotText}>
                {item.severity === 'normal' ? '✓' : '!'}
              </Text>
            </View>
            <Text style={styles.aiText}>{item.text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function dotColor(severity: SensorMetric['severity']) {
  if (severity === 'danger') {
    return {backgroundColor: palette.red};
  }
  if (severity === 'warning') {
    return {backgroundColor: palette.orange};
  }
  return {backgroundColor: palette.green};
}

const styles = StyleSheet.create({
  aiCard: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: '#fff',
    padding: 18,
    flexDirection: 'row',
  },
  scoreWrap: {
    width: 128,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: palette.border,
    marginRight: 18,
    paddingRight: 12,
  },
  scoreGauge: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 8,
    borderColor: '#e3e5eb',
    borderLeftColor: palette.red,
    borderTopColor: palette.red,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  scoreNumber: {
    color: palette.ink,
    fontSize: 31,
    fontWeight: '900',
  },
  scoreMax: {
    color: palette.muted,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 15,
  },
  scoreCaption: {
    color: palette.ink,
    fontSize: 12,
    marginTop: 10,
  },
  scoreDanger: {
    color: palette.red,
    fontSize: 14,
    fontWeight: '900',
    marginTop: 4,
  },
  aiList: {
    flex: 1,
    gap: 12,
    justifyContent: 'center',
  },
  aiRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  aiDotText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '900',
  },
  aiText: {
    flex: 1,
    color: '#3b4358',
    fontSize: 12,
    lineHeight: 17,
  },
});
