import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SensorMetric } from '../../../db/mockData';
import { palette } from '../../theme';

export function MetricGrid({
  data,
  onSelect,
}: {
  data: any;
  onSelect: (metricId: string) => void;
}) {
  console.log('Render MetricGrid with data:', data);
  return (
    <View style={styles.metricGrid}>
      {data?.length > 0 &&
        data?.map((v: any) => (
          <MetricCard key={v.id} metric={v} onSelect={onSelect} />
        ))}
      <Pressable style={styles.moreCard}>
        <View style={styles.waterIcon}>
          <Text style={styles.waterIconText}>≈</Text>
        </View>
        <Text style={styles.moreText}>Xem thêm</Text>
      </Pressable>
    </View>
  );
}

function MetricCard({
  metric,
  onSelect,
}: {
  metric: any;
  onSelect: (metricId: string) => void;
}) {
  // console.log(metric)
  return (
    <Pressable style={styles.metricCard} onPress={() => onSelect(metric.id)}>
      <View style={[styles.metricIcon, { backgroundColor: metric.color }]}>
        <Text style={styles.metricIconText}>
          {metric.id === 'temp' ? '°C' : metric.shortLabel}
        </Text>
      </View>
      <Text style={styles.metricLabel}>{metric.label}</Text>
      <Text style={styles.metricValue}>
        {typeof metric.value === 'number'
          ? parseFloat(metric.value.toFixed(2))
          : metric.value}
        <Text style={styles.metricUnit}> {metric.unit}</Text>
      </Text>
      <View style={[styles.metricStatus, statusTint(metric.severity)]}>
        <Text style={[styles.metricStatusText, { color: metric.color }]}>
          {metric.status}{' '}
          {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '✓'}
        </Text>
      </View>
    </Pressable>
  );
}

function statusTint(severity: SensorMetric['severity']) {
  if (severity === 'danger') {
    return styles.tintDanger;
  }
  if (severity === 'warning') {
    return styles.tintWarning;
  }
  return styles.tintNormal;
}

const styles = StyleSheet.create({
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  metricCard: {
    width: '31.5%',
    minHeight: 168,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: '#fff',
    padding: 12,
    alignItems: 'center',
    margin: 2,
  },
  metricIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  metricIconText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '900',
  },
  metricLabel: {
    color: '#3f465c',
    fontSize: 12,
    minHeight: 34,
    textAlign: 'center',
  },
  metricValue: {
    color: palette.ink,
    fontSize: 24,
    fontWeight: '900',
    marginTop: 4,
    textAlign: 'center',
  },
  metricUnit: {
    color: palette.ink,
    fontSize: 12,
    fontWeight: '700',
  },
  metricStatus: {
    minHeight: 34,
    borderRadius: 6,
    paddingHorizontal: 8,
    marginTop: 12,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricStatusText: {
    fontSize: 12,
    fontWeight: '900',
    textAlign: 'center',
  },
  tintDanger: {
    backgroundColor: '#fff0f2',
  },
  tintWarning: {
    backgroundColor: '#fff5ee',
  },
  tintNormal: {
    backgroundColor: '#eefbf4',
  },
  moreCard: {
    width: '31.5%',
    minHeight: 168,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: '#fff',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waterIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#1179ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  waterIconText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '900',
  },
  moreText: {
    color: '#1269d3',
    fontSize: 13,
    fontWeight: '700',
  },
});
