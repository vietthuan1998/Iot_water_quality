import { StyleSheet, Text, View } from 'react-native';
import Svg, { Line, Polyline, Text as SvgText } from 'react-native-svg';
import { Observation } from '../screens/AlertsScreen2';
const CHART_WIDTH = 140;
const CHART_HEIGHT = 56;
// ── Mini sparkline SVG ────────────────────────────────────────────────────────
interface MiniChartProps {
  observations: Observation[] | undefined;
  thresholdValue: number;
  color: string;
}

export function MiniChart2({
  observations,
  thresholdValue,
  color,
}: MiniChartProps) {
  if (!observations || observations.length < 2) {
    return (
      <View style={styles.chartEmpty}>
        <Text style={styles.chartEmptyText}>Không có dữ liệu</Text>
      </View>
    );
  }

  const values = observations.map(o => o.valueNumeric);
  const allValues = [...values, thresholdValue].filter(v => v != null);
  const minV = Math.min(...allValues);
  const maxV = Math.max(...allValues);
  const range = maxV - minV || 1;

  const pad = { top: 10, bottom: 6, left: 4, right: 4 };
  const w = CHART_WIDTH - pad.left - pad.right;
  const h = CHART_HEIGHT - pad.top - pad.bottom;

  const toX = (i: number) => pad.left + (i / (values.length - 1)) * w;
  const toY = (v: number) => pad.top + h - ((v - minV) / range) * h;

  const points = values.map((v, i) => `${toX(i)},${toY(v)}`).join(' ');
  const threshY = toY(thresholdValue);

  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderColor: '#bbbbbb',
        overflow: 'hidden',
      }}
    >
      <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
        <Line
          x1={pad.left}
          y1={threshY}
          x2={CHART_WIDTH - pad.right}
          y2={threshY}
          stroke={color}
          strokeWidth={1}
          strokeDasharray="3,3"
          opacity={0.6}
        />
        <SvgText
          x={CHART_WIDTH - pad.right - 18}
          y={threshY - 2}
          fontSize={8}
          fill={color}
        >
          {thresholdValue}
        </SvgText>
        <Polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  chartEmpty: {
    width: CHART_WIDTH,
    height: CHART_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 6,
  },
  chartEmptyText: { fontSize: 10, color: '#BBB' },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: '#F0F0F0',
  },
});
