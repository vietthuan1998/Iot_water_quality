import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { palette } from '../theme';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';

const WIDTH_SCREEN = Dimensions.get('window').width;
const chartColors = [
  '#3B82F6', // blue
  '#EF4444', // red
  '#10B981', // green
  '#F59E0B', // amber
  '#8B5CF6', // violet
  '#EC4899', // pink
];

export default function Chart({ data, zone }: { data: any[]; zone: any[] }) {
  const maxXLabel = 12;
  const tempData = data?.[0]?.points || [];
  const step = Math.max(1, Math.ceil(tempData?.length / maxXLabel));
  const lastPoint = tempData.length - 1;

  const normalizedData = (arr: any[]) => {
    return arr?.map((item: any, index: number) => ({
      value: item.value,
      label:
        index === 0 || index === lastPoint || index % step === 0
          ? moment(item.time).format('HH:mm')
          : undefined,
      timestamp: moment(item.time).format('HH:mm:ss'),
    }));
  };

  const chartProps: any = {};
  data?.slice(0, 5).forEach((series, index) => {
    console.log('Series', index, series);
    const dataKey = index === 0 ? 'data' : `data${index + 1}`;
    const colorKey = index === 0 ? 'color' : `color${index + 1}`;
    chartProps[colorKey] = chartColors[index];
    chartProps[dataKey] = normalizedData(series?.points || []);
  });

  const normalizedZone = (arr: any[]) => {
    const q = arr?.map((item: any) => ({
      min: item.minValue,
      max: item.maxValue,
      status: item.alertLevel.code,
      colorCode: item.alertLevel.colorCode,
    }));
    return q.sort((a, b) => a.min - b.min);
  };
  const maxY = normalizedZone(zone ? zone : []);

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
        initialSpacing={20}
        endSpacing={45}
        scrollToEnd={true}
        spacing={20}
        // Y
        yAxisThickness={0}
        noOfSections={4}
        maxValue={maxY.length > 0 ? maxY[maxY.length - 1].max : 100}
        // maxValue={65}
        // X
        xAxisThickness={1}
        xAxisColor={palette.blue}
        xAxisLabelTextStyle={styles.chartXStyle}
        focusEnabled
        showDataPointOnFocus
        // showStripOnFocus
        showTextOnFocus
        showValuesAsDataPointsText
        dataPointLabelComponent={(item: any) => (
          <View
            style={{
              backgroundColor: '#1F2937',
              padding: 8,
              borderRadius: 8,
              width: 100,
              marginTop: -50,
            }}
          >
            <Text style={{ color: '#FFF' }}>{item.value}</Text>
            <Text style={{ color: '#FFF' }}>{item.timestamp}</Text>
          </View>
        )}
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
