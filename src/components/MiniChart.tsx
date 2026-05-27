import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type MiniChartProps = {
  data: number[];
  color: string;
};

export function MiniChart({data, color}: MiniChartProps) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = Math.max(max - min, 1);

  return (
    <View style={styles.chart}>
      {[0, 1, 2, 3].map(line => (
        <View key={line} style={[styles.chartLine, {top: 14 + line * 28}]} />
      ))}
      <View style={styles.chartBars}>
        {data.map((value, index) => {
          const height = 18 + ((value - min) / span) * 72;

          return (
            <View key={`${value}-${index}`} style={styles.chartColumn}>
              <View
                style={[
                  styles.chartDot,
                  {
                    backgroundColor: color,
                    bottom: height,
                  },
                ]}
              />
              <View
                style={[
                  styles.chartStem,
                  {
                    backgroundColor: `${color}22`,
                    height,
                  },
                ]}
              />
            </View>
          );
        })}
      </View>
      <View style={styles.chartFooter}>
        <Text style={styles.chartTick}>08:41</Text>
        <Text style={styles.chartTick}>09:11</Text>
        <Text style={styles.chartTick}>09:26</Text>
        <Text style={styles.chartTick}>09:41</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chart: {
    flex: 1,
    height: 150,
    paddingBottom: 24,
  },
  chartLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#edf0f5',
  },
  chartBars: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  chartColumn: {
    width: 16,
    height: 112,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  chartStem: {
    width: 3,
    borderRadius: 2,
  },
  chartDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    zIndex: 2,
  },
  chartFooter: {
    height: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  chartTick: {
    color: '#697086',
    fontSize: 10,
  },
});
