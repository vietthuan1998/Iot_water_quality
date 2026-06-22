import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
    <Pressable
      style={styles.metricCard}
      onPress={() => onSelect(metric.deviceId)}
    >
      <View style={styles.metricHeader}>
        <View style={[styles.metricIcon, { backgroundColor: metric.color }]}>
          <MaterialCommunityIcons
            name={metric.icon || 'chart-bubble'}
            size={22}
            color="#fff"
          />
        </View>
        <Text style={styles.metricLabel}>{metric.label}</Text>
      </View>
      <Text style={styles.metricValue}>
        {typeof metric.value === 'number'
          ? parseFloat(metric.value.toFixed(2))
          : metric.value}
        <Text style={styles.metricUnit}> {metric.unit}</Text>
      </Text>
      <View style={[styles.metricStatus, statusTint(metric.severity)]}>
        <Text style={[styles.metricStatusText, { color: metric.color }]}>
          {metric.status}
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
    alignItems: 'stretch',
    margin: 2,
  },
  metricHeader: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricLabel: {
    color: '#7c8295',
    fontSize: 12,
    lineHeight: 16,
    flex: 1,
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
  moreText: {
    color: '#1269d3',
    fontSize: 13,
    fontWeight: '700',
  },
});
