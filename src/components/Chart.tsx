import React, { useMemo } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { palette } from '../theme';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';

const WIDTH_SCREEN = Dimensions.get('window').width;
const CHART_HEIGHT = 200;
const DATA_POINT_LABEL_WIDTH = 100;
const DATA_POINT_LABEL_HEIGHT = 48;
const DATA_POINT_LABEL_GAP = 10;
const CHART_INTERNAL_TOP_PADDING = 10;
const CHART_OVERFLOW_TOP = DATA_POINT_LABEL_HEIGHT + DATA_POINT_LABEL_GAP;
const DATA_POINT_LABEL_SHIFT_Y_ABOVE =
  CHART_OVERFLOW_TOP +
  CHART_INTERNAL_TOP_PADDING -
  DATA_POINT_LABEL_HEIGHT -
  DATA_POINT_LABEL_GAP;
const DATA_POINT_LABEL_SHIFT_Y_BELOW =
  CHART_OVERFLOW_TOP + CHART_INTERNAL_TOP_PADDING + DATA_POINT_LABEL_GAP;
const chartColors = [
  '#3B82F6', // blue
  '#EF4444', // red
  '#10B981', // green
  '#F59E0B', // amber
  '#8B5CF6', // violet
];

const renderDataPointLabel = (item: any) => (
  <View style={styles.dataPointLabel}>
    <Text style={styles.dataPointLabelText}>{item.value}</Text>
    <Text style={styles.dataPointLabelText}>{item.timestamp}</Text>
  </View>
);

const normalizedZone = (arr: any[]) => {
  const q = arr?.map((item: any) => ({
    min: item.minValue,
    max: item.maxValue,
    status: item.alertLevel.code,
    colorCode: item.alertLevel.colorCode,
  }));
  return q.sort((a, b) => a.min - b.min);
};

export default function Chart({ data, zone }: { data: any[]; zone: any[] }) {
  const maxXLabel = 12;

  const maxY = useMemo(() => {
    const values =
      data
        ?.flatMap(series => series?.points || [])
        .map(point => Number(point.value))
        .filter(value => Number.isFinite(value)) || [];

    if (values.length > 0) {
      const maxDataValue = Math.max(...values);
      return Math.max(1, Math.ceil(maxDataValue * 1.1));
    }

    const zones = normalizedZone(zone ? zone : []);
    return zones.length > 0 ? zones[zones.length - 1].max : 100;
  }, [data, zone]);

  const normalizedData = (arr: any[]) => {
    const step = Math.max(1, Math.ceil((arr?.length || 0) / maxXLabel));
    const lastPoint = (arr?.length || 0) - 1;

    return arr?.map((item: any, index: number) => {
      const value = Number(item.value);
      const labelTopIfAbove =
        CHART_HEIGHT +
        DATA_POINT_LABEL_SHIFT_Y_ABOVE -
        (value * CHART_HEIGHT) / maxY;

      return {
        value,
        label:
          index === 0 || index === lastPoint || index % step === 0
            ? moment(item.time).format('HH:mm')
            : undefined,
        timestamp: moment(item.time).format('HH:mm:ss'),
        dataPointLabelShiftY:
          labelTopIfAbove < 0
            ? DATA_POINT_LABEL_SHIFT_Y_BELOW
            : DATA_POINT_LABEL_SHIFT_Y_ABOVE,
      };
    });
  };

  const chartProps: any = {};
  data?.slice(0, 5).forEach((series, index) => {
    const dataKey = index === 0 ? 'data' : `data${index + 1}`;
    const colorKey = index === 0 ? 'color' : `color${index + 1}`;
    chartProps[colorKey] = chartColors[index];
    chartProps[dataKey] = normalizedData(series?.points || []);
  });

  return (
    <>
      <LineChart
        // data={normalizedData(data?.[0]?.points || undefined)}
        // color={chartColors[0]}
        // data2={normalizedData(data?.[1]?.points || undefined)}
        // color2={chartColors[1]}
        {...chartProps}
        curved
        width={WIDTH_SCREEN}
        height={CHART_HEIGHT}
        overflowTop={CHART_OVERFLOW_TOP}
        initialSpacing={20}
        endSpacing={45}
        scrollToEnd={true}
        spacing={20}
        // Y
        yAxisThickness={0}
        noOfSections={4}
        maxValue={maxY}
        // maxValue={10}
        // X
        xAxisThickness={1}
        xAxisColor={palette.blue}
        xAxisLabelTextStyle={styles.chartXStyle}
        focusEnabled
        showDataPointOnFocus
        // showStripOnFocus
        showTextOnFocus
        showValuesAsDataPointsText
        dataPointLabelWidth={DATA_POINT_LABEL_WIDTH}
        dataPointLabelComponent={renderDataPointLabel}
      />
      <View style={styles.legend}>
        {data?.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <Icon name="circle" size={10} color={chartColors[index]} />
            <Text style={{ marginLeft: 6, flexShrink: 1 }} numberOfLines={2}>
              {item.parameterName}
            </Text>
          </View>
        ))}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  dataPointLabel: {
    backgroundColor: '#1F2937',
    borderRadius: 8,
    height: DATA_POINT_LABEL_HEIGHT,
    padding: 8,
    width: DATA_POINT_LABEL_WIDTH,
  },
  dataPointLabelText: {
    color: '#FFF',
    fontSize: 12,
    lineHeight: 16,
  },
  chartXStyle: {
    color: '#666',
    fontSize: 10,
    width: 40,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },

  legendItem: {
    width: '50%', // 2 cột
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
});
