import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import { getSensorsValue } from '../api/sensorApi';
import { getAllAler } from '../api/alertApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MiniChart2 } from '../components/MiniChart2';

// ─── Import 2 hàm này từ service của bạn ─────────────────────────────────────
// import { getSensorsValue, getAllAler } from "@/services/iot.service";
// ─────────────────────────────────────────────────────────────────────────────

// ─── Kiểu dữ liệu ────────────────────────────────────────────────────────────
interface AlertLevel {
  id: number;
  code: string;
  name: string;
  priority: number;
  colorCode: string;
}

interface Device {
  id: number;
  deviceId: string;
  deviceName: string;
}

interface Parameter {
  id: number;
  code: string;
  name: string;
}

export interface Observation {
  id: number;
  observationTime: string;
  valueNumeric: number;
  status: string;
}

interface Alert {
  id: number;
  deviceIdFk: number;
  device?: Device;
  parameterId: number;
  parameter?: Parameter;
  alertTime: string;
  thresholdValue: number;
  actualValue: number;
  alertLevel?: AlertLevel;
  status: string;
  message: string;
}

// Alert đã được group theo (deviceIdFk, parameterId)
export interface GroupedAlert {
  key: string; // `${deviceIdFk}_${parameterId}`
  latest: Alert; // bản ghi mới nhất — dùng làm đại diện hiển thị
  count: number; // số lần cảnh báo trong 1 giờ
}

interface ApiListResponse<T> {
  code: number;
  message: string;
  data: T[];
  page: number;
  pageSize: number;
  total: number;
}

type AlertsScreenProps = {
  onBack: () => void;
};

// ─── Hàm group alerts theo (deviceIdFk, parameterId) ─────────────────────────
function groupAlerts(alerts: Alert[]): GroupedAlert[] {
  const map = new Map<string, GroupedAlert>();

  for (const alert of alerts) {
    const key = `${alert.deviceIdFk}_${alert.parameterId}`;
    const existing = map.get(key);

    if (!existing) {
      map.set(key, { key, latest: alert, count: 1 });
    } else {
      existing.count += 1;
      // Giữ lại bản ghi có alertTime mới nhất
      if (new Date(alert.alertTime) > new Date(existing.latest.alertTime)) {
        existing.latest = alert;
      }
    }
  }

  // Sắp xếp: nhóm nhiều cảnh báo nhất lên đầu
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

// ─── Constants ────────────────────────────────────────────────────────────────
const CHART_WIDTH = 140;
const CHART_HEIGHT = 56;
// Lấy đủ alerts trong 1 giờ (tối đa), không cần phân trang phía alert
const PAGE_SIZE = 200;

export const LEVEL_COLOR: Record<string, string> = {
  critical: '#E24B4A',
  warning: '#F2C94C',
  info: '#378ADD',
};
export const LEVEL_BG: Record<string, string> = {
  critical: '#FCEBEB',
  warning: '#FAEEDA',
  info: '#E6F1FB',
};
export const STATUS_LABEL: Record<string, string> = {
  new: 'Mới',
  acknowledged: 'Đã nhận',
  resolved: 'Đã xử lý',
};
export const STATUS_COLOR: Record<string, string> = {
  new: '#E24B4A',
  acknowledged: '#F2C94C',
  resolved: '#3B6D11',
};

// ── Alert Card ────────────────────────────────────────────────────────────────
interface AlertCardProps {
  group: GroupedAlert;
  observations: Observation[] | undefined;
  loadingObs: boolean;
}

function AlertCard({ group, observations, loadingObs }: AlertCardProps) {
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

// ── Filter bar ────────────────────────────────────────────────────────────────
const STATUS_FILTERS: { key: string; label: string }[] = [
  { key: 'all', label: 'Tất cả' },
  { key: 'new', label: 'Mới' },
  { key: 'acknowledged', label: 'Đã nhận' },
  { key: 'resolved', label: 'Đã xử lý' },
];

interface FilterBarProps {
  selected: string;
  onSelect: (key: string) => void;
}

function FilterBar({ selected, onSelect }: FilterBarProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filterBar}
      contentContainerStyle={styles.filterBarContent}
    >
      {STATUS_FILTERS.map(f => (
        <TouchableOpacity
          key={f.key}
          onPress={() => onSelect(f.key)}
          style={[
            styles.filterChip,
            selected === f.key && styles.filterChipActive,
          ]}
        >
          <Text
            style={[
              styles.filterChipText,
              selected === f.key && styles.filterChipTextActive,
            ]}
          >
            {f.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

// ── Stats bar ─────────────────────────────────────────────────────────────────
interface StatsBarProps {
  totalGroups: number;
  totalAlerts: number;
  newCount: number;
}

function StatsBar({ totalGroups, totalAlerts, newCount }: StatsBarProps) {
  return (
    <View style={styles.statsBar}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{totalGroups}</Text>
        <Text style={styles.statLabel}>Thiết bị/chỉ số</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={[styles.statValue, { color: '#E24B4A' }]}>
          {totalAlerts}
        </Text>
        <Text style={styles.statLabel}>Lượt cảnh báo</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={[styles.statValue, { color: '#F2A500' }]}>{newCount}</Text>
        <Text style={styles.statLabel}>Chưa xử lý</Text>
      </View>
    </View>
  );
}

// ── Main Screen ───────────────────────────────────────────────────────────────
export default function AlertScreen({ onBack }: AlertsScreenProps) {
  const [groupedAlerts, setGroupedAlerts] = useState<GroupedAlert[]>([]);
  const [totalAlerts, setTotalAlerts] = useState(0);
  const [observationsMap, setObservationsMap] = useState<
    Record<string, Observation[]>
  >({});
  const [loadingObsSet, setLoadingObsSet] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  // ── Fetch observations song song cho các nhóm ───────────────────────────────
  const fetchObservationsBatch = useCallback(async (groups: GroupedAlert[]) => {
    const now = new Date();
    const fromTime = new Date(now.getTime() - 60 * 60 * 1000).toISOString();
    const toTime = now.toISOString();

    const keys = groups.map(g => g.key);

    setLoadingObsSet(prev => {
      const next = new Set(prev);
      keys.forEach(k => next.add(k));
      return next;
    });

    await Promise.all(
      groups.map(async group => {
        try {
          const res = await getSensorsValue({
            deviceId: group.latest.deviceIdFk,
            parameterId: group.latest.parameterId,
            fromTime,
            toTime,
            page: 1,
            pageSize: 100,
          });
          const sorted = (res.data ?? []).sort(
            (a: any, b: any) =>
              new Date(a.observationTime).getTime() -
              new Date(b.observationTime).getTime(),
          );
          setObservationsMap(prev => ({ ...prev, [group.key]: sorted }));
        } catch (err) {
          console.warn(`Lỗi tải observation ${group.key}:`, err);
          setObservationsMap(prev => ({ ...prev, [group.key]: [] }));
        }
      }),
    );

    setLoadingObsSet(prev => {
      const next = new Set(prev);
      keys.forEach(k => next.delete(k));
      return next;
    });
  }, []);

  // ── Fetch toàn bộ alerts trong 1 giờ gần nhất rồi group ────────────────────
  const fetchAlerts = useCallback(
    async (refresh: boolean = false) => {
      if (loading && !refresh) return;
      try {
        refresh ? setRefreshing(true) : setLoading(true);

        const now = new Date();
        const fromTime = new Date(now.getTime() - 60 * 60 * 1000).toISOString();
        const toTime = now.toISOString();

        const res = await getAllAler({
          page: 1,
          pageSize: PAGE_SIZE,
          status: filterStatus === 'all' ? undefined : filterStatus,
          fromTime,
          toTime,
        });

        const allAlerts = res.data ?? [];
        setTotalAlerts(allAlerts.length);

        const groups = groupAlerts(allAlerts);
        setGroupedAlerts(groups);

        setObservationsMap({});
        fetchObservationsBatch(groups);
      } catch (err) {
        console.error('Lỗi tải cảnh báo:', err);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [filterStatus, loading, fetchObservationsBatch],
  );

  // ── Reset & fetch khi đổi filter ───────────────────────────────────────────
  useEffect(() => {
    setGroupedAlerts([]);
    setObservationsMap({});
    fetchAlerts(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus]);

  const onRefresh = () => fetchAlerts(true);

  const newCount = groupedAlerts.filter(g => g.latest.status === 'new').length;

  const renderItem = ({ item }: { item: GroupedAlert }) => (
    <AlertCard
      group={item}
      observations={observationsMap[item.key]}
      loadingObs={loadingObsSet.has(item.key)}
    />
  );

  const renderFooter = () =>
    loading ? (
      <ActivityIndicator style={{ margin: 16 }} color="#378ADD" />
    ) : null;

  const renderEmpty = () =>
    loading ? null : (
      <View style={styles.emptyState}>
        <Text style={styles.emptyIcon}>🔕</Text>
        <Text style={styles.emptyText}>
          Không có cảnh báo nào trong 1 giờ qua
        </Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', minHeight: 58 }}
        >
          <Pressable
            accessibilityRole="button"
            onPress={onBack}
            style={styles.iconButton}
          >
            <Text style={styles.iconText}>‹</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Cảnh báo</Text>
        </View>
        <TouchableOpacity onPress={onRefresh} style={styles.refreshBtn}>
          <Text style={styles.refreshBtnText}>↻ Làm mới</Text>
        </TouchableOpacity>
      </View>

      <StatsBar
        totalGroups={groupedAlerts.length}
        totalAlerts={totalAlerts}
        newCount={newCount}
      />
      <FilterBar selected={filterStatus} onSelect={setFilterStatus} />

      <FlatList
        data={groupedAlerts}
        keyExtractor={item => item.key}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#378ADD"
          />
        }
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
      />
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F4F4F2', paddingBottom: 70 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#1A1A1A' },
  refreshBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#C0C0C0',
  },
  refreshBtnText: { fontSize: 13, color: '#378ADD' },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '600', color: '#1A1A1A' },
  statLabel: { fontSize: 11, color: '#888', marginTop: 2 },
  statDivider: { width: 0.5, backgroundColor: '#E0E0E0', marginVertical: 4 },
  filterBar: {
    // backgroundColor: '#fff',
    minHeight: 50, // hoặc height: 50
  },
  filterBarContent: {
    paddingHorizontal: 12,
    alignItems: 'center',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#C0C0C0',
    backgroundColor: '#fff',
    // minHeight: 30,
  },
  filterChipActive: { backgroundColor: '#378ADD', borderColor: '#378ADD' },
  filterChipText: { fontSize: 13, color: '#555' },
  filterChipTextActive: { color: '#fff', fontWeight: '500' },
  listContent: { padding: 12, gap: 10, paddingBottom: 32 },
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
  emptyState: { alignItems: 'center', paddingTop: 80 },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyText: { fontSize: 15, color: '#AAA' },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: '#42495d',
    fontSize: 42,
    lineHeight: 42,
  },
});
