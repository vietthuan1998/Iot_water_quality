import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import {
  GroupedAlert,
  LEVEL_BG,
  LEVEL_COLOR,
  Observation,
  STATUS_COLOR,
  STATUS_LABEL,
} from '../../screens/AlertsScreen2';
const CHART_WIDTH = 140;
const CHART_HEIGHT = 56;
interface AlertCardProps {
  group: GroupedAlert;
  observations: Observation[] | undefined;
  loadingObs: boolean;
}

export default function AlertCard({
  group,
  observations,
  loadingObs,
}: AlertCardProps) {
  const { latest, count } = group;
  const levelCode = latest.alertLevel?.code ?? 'warning';
  const color =
    latest.alertLevel?.colorCode ?? LEVEL_COLOR[levelCode] ?? '#F2C94C';
  const bg = LEVEL_BG[levelCode] ?? '#FAEEDA';
  const statusColor = STATUS_COLOR[latest.status] ?? '#888';

  const alertedAt = new Date(latest.alertTime);
  const minutesAgo = Math.round((Date.now() - alertedAt.getTime()) / 60000);
  const timeLabel =
    minutesAgo < 60
      ? `${minutesAgo} phút trước`
      : minutesAgo < 1440
      ? `${Math.round(minutesAgo / 60)} giờ trước`
      : alertedAt.toLocaleDateString('vi-VN');

  return (
    <View
      style={[
        styles.card,
        {
          borderLeftColor: color,
          borderLeftWidth: 3,
          borderBottomColor: color,
          borderBottomWidth: 3,
        },
      ]}
    >
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Text style={styles.deviceName} numberOfLines={1}>
            {latest.device?.deviceName ?? String(latest.deviceIdFk)}
          </Text>
          <Text style={styles.paramName} numberOfLines={1}>
            {latest.parameter?.name ?? ''} · {latest.device?.deviceId ?? ''}
          </Text>
        </View>
        <View style={styles.badgeRow}>
          {/* Badge số lần cảnh báo */}
          {count > 1 && (
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{count} lần</Text>
            </View>
          )}
          {/* Badge mức độ */}
          <View style={[styles.badge, { backgroundColor: bg }]}>
            <Text style={[styles.badgeText, { color }]}>
              {latest.alertLevel?.name ?? levelCode}
            </Text>
          </View>
        </View>
      </View>

      {/* Giá trị + chart */}
      <View style={styles.cardBody}>
        <View style={styles.valueBlock}>
          <Text style={[styles.actualValue, { color }]}>
            {latest.actualValue}
          </Text>
          <Text style={styles.thresholdText}>
            Ngưỡng: {latest.thresholdValue}
          </Text>
          <Text style={styles.alertMessage} numberOfLines={3}>
            {latest.message}
          </Text>
        </View>

        <View style={styles.chartBlock}>
          {loadingObs ? (
            <ActivityIndicator
              size="small"
              color={color}
              style={{ width: CHART_WIDTH, height: CHART_HEIGHT }}
            />
          ) : (
            <MiniChart2
              observations={observations}
              thresholdValue={latest.thresholdValue}
              color={color}
            />
          )}
          <Text style={styles.chartLabel}>1 giờ gần nhất</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.cardFooter}>
        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
        <Text style={[styles.statusText, { color: statusColor }]}>
          {STATUS_LABEL[latest.status] ?? latest.status}
        </Text>
        <Text style={styles.timeText}>{timeLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 0.5,
    borderColor: '#E8E8E8',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  deviceName: { fontSize: 14, fontWeight: '600', color: '#1A1A1A' },
  paramName: { fontSize: 12, color: '#888', marginTop: 2 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  countBadge: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  countBadgeText: { fontSize: 11, fontWeight: '600', color: '#555' },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeText: { fontSize: 11, fontWeight: '600' },
  cardBody: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  valueBlock: { flex: 1 },
  actualValue: { fontSize: 24, fontWeight: '700' },
  thresholdText: { fontSize: 12, color: '#888', marginTop: 2 },
  alertMessage: { fontSize: 11, color: '#666', marginTop: 6, lineHeight: 16 },
  chartBlock: { alignItems: 'flex-end' },
  chartLabel: { fontSize: 10, color: '#AAA', marginTop: 2, textAlign: 'right' },
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
  statusDot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
  statusText: { fontSize: 12, fontWeight: '500' },
  timeText: { fontSize: 12, color: '#AAA', marginLeft: 'auto' },
});
