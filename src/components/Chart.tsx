import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { palette } from '../theme';
import moment from 'moment';

const WIDTH_SCREEN = Dimensions.get('window').width;

export default function Chart({ data, zone }: { data: any[]; zone: any[] }) {
  const maxXLabel = 12;
  const tempData = data?.[0]?.points || [];
  const step = Math.max(1, Math.ceil(tempData?.length / maxXLabel));
  const lastPoint = tempData.length - 1;

  console.log('zone', zone);
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
        data={normalizedData(data?.[0]?.points || undefined)}
        color={palette.blue}
        data2={normalizedData(data?.[1]?.points || undefined)}
        color2={palette.green}
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
    </>
  );
}
const styles = StyleSheet.create({
  chartXStyle: {
    color: '#666',
    fontSize: 10,
    width: 40,
  },
});
