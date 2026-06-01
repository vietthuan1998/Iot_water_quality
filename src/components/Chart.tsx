import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { palette } from '../theme';
import moment from 'moment';

const WIDTH_SCREEN = Dimensions.get('window').width;

export default function Chart({ data }: { data: any[] }) {
  const maxXLabel = 12;
  const tempData = data?.[0]?.points || [];
  const step = Math.max(1, Math.ceil(tempData?.length / maxXLabel));
  const lastPoint = tempData.length - 1;

  const normalizedData = (arr: any[]) => {
    return arr.map((item: any, index: number) => ({
      value: item.value,
      label:
        index === 0 || index === lastPoint || index % step === 0
          ? moment(item.time).format('HH:mm')
          : undefined,
    }));
  };
  return (
    // <View style={styles.container}>
    <LineChart
      data={normalizedData(data?.[0]?.points || [])}
      color={palette.blue}
      data2={normalizedData(data?.[1]?.points || [])}
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
      maxValue={Math.max(
        ...normalizedData(data?.[0]?.points || []).map(
          (item: any) => item.value,
        ),
        ...normalizedData(data?.[1]?.points || []).map(
          (item: any) => item.value,
        ),
      )}
      // X
      xAxisThickness={1}
      xAxisColor={palette.blue}
      xAxisLabelTextStyle={styles.chartXStyle}
    />
    // </View>
  );
}
const styles = StyleSheet.create({
  chartXStyle: {
    color: '#666',
    fontSize: 10,
    width: 40,
  },
});
