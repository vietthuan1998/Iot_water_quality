import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {AlertItem} from '../../../db/mockData';
import {MiniChart} from '../MiniChart';
import {palette} from '../../theme';

type AlertCardProps = {
  alert: AlertItem;
  index: number;
};

export function AlertCard({alert, index}: AlertCardProps) {
  return (
    <View style={[styles.alertCard, {borderColor: `${alert.color}26`}]}>
      <View style={styles.alertCardHeader}>
        <View style={[styles.alertNumber, {backgroundColor: alert.color}]}>
          <Text style={styles.alertNumberText}>{index}</Text>
        </View>
        <Text style={styles.alertTitle}>{alert.title}</Text>
        <Text style={[styles.alertLevel, {color: alert.color}]}>{alert.level}</Text>
      </View>
      <View style={styles.alertBody}>
        <View style={styles.alertValueBlock}>
          <Text style={[styles.alertValue, {color: alert.color}]}>
            {alert.value}
            <Text style={styles.alertValueUnit}> {alert.unit}</Text>
          </Text>
          <Text style={styles.safeRange}>Ngưỡng an toàn: {alert.safeRange}</Text>
        </View>
        <MiniChart data={alert.history} color={alert.color} />
      </View>
      <View style={styles.recommendBox}>
        <Text style={[styles.recommendTitle, {color: alert.color}]}>KHUYẾN NGHỊ</Text>
        <View style={styles.recommendContent}>
          <View style={styles.recommendList}>
            {alert.recommendations.map((item, itemIndex) => (
              <View key={item} style={styles.recommendRow}>
                <View style={[styles.recommendIndex, {backgroundColor: alert.color}]}>
                  <Text style={styles.recommendIndexText}>{itemIndex + 1}</Text>
                </View>
                <Text style={styles.recommendText}>{item}</Text>
              </View>
            ))}
          </View>
          <View style={styles.actionColumn}>
            {alert.primaryAction ? (
              <Pressable style={[styles.primaryAction, {backgroundColor: alert.color}]}>
                <Text style={styles.primaryActionText}>{alert.primaryAction}</Text>
              </Pressable>
            ) : null}
            {alert.secondaryAction ? (
              <Pressable style={styles.secondaryAction}>
                <Text style={[styles.secondaryActionText, {color: alert.color}]}>
                  {alert.secondaryAction}
                </Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  alertCard: {
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: '#fff',
    marginBottom: 18,
    padding: 16,
  },
  alertCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  alertNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertNumberText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
  },
  alertTitle: {
    flex: 1,
    color: palette.ink,
    fontSize: 16,
    fontWeight: '900',
  },
  alertLevel: {
    fontSize: 13,
    fontWeight: '900',
  },
  alertBody: {
    flexDirection: 'row',
    marginTop: 18,
    alignItems: 'center',
  },
  alertValueBlock: {
    width: 158,
  },
  alertValue: {
    fontSize: 32,
    fontWeight: '900',
  },
  alertValueUnit: {
    color: palette.ink,
    fontSize: 16,
    fontWeight: '800',
  },
  safeRange: {
    color: '#5d6479',
    fontSize: 12,
    marginTop: 10,
  },
  recommendBox: {
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: '#fff8f8',
    borderWidth: 1,
    borderColor: '#ffe4e4',
    padding: 14,
  },
  recommendTitle: {
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 10,
  },
  recommendContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendList: {
    flex: 1,
    gap: 8,
  },
  recommendRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  recommendIndex: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginTop: 1,
  },
  recommendIndexText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '900',
  },
  recommendText: {
    flex: 1,
    color: '#2d3447',
    fontSize: 12,
    lineHeight: 17,
  },
  actionColumn: {
    width: 132,
    gap: 10,
    marginLeft: 12,
  },
  primaryAction: {
    minHeight: 44,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  primaryActionText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'center',
  },
  secondaryAction: {
    minHeight: 42,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#ffe5e5',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  secondaryActionText: {
    fontSize: 12,
    fontWeight: '900',
    textAlign: 'center',
  },
});
