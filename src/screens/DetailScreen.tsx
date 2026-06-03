import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { palette } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '../components/Loading';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { ChartParams, getChartsData } from '../api/chartApi';
import Chart from '../components/Chart';
import {
  getAllIotDevices,
  getAllSensorsParams,
  getSensorsValue,
  getThresholdValue,
} from '../api/sensorApi';
import Dropdown from '../components/Dropdown';
import HistoryItemCard from '../components/alerts/HistoryItemCard';
import { DateTimeField } from '../components/DateTimeField';

type DetailScreenProps = {
  onBack: () => void;
  metricId?: any;
};

const PageSize = 10;

export function DetailScreen({ onBack, metricId }: DetailScreenProps) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<any[]>([]);
  const [IotDiveces, setIotDevices] = useState<any[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<any>(metricId);
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [warningZone, setWarningZone] = useState<any[]>([]);
  const [fromDate, setFromDate] = useState(
    new Date(Date.now() - 24 * 60 * 60 * 1000),
  );
  const [toDate, setToDate] = useState(new Date());

  const getDataCharts = useCallback(async () => {
    try {
      const param: ChartParams = {};
      if (selectedDevice) {
        param.deviceId = selectedDevice;
      }
      param.fromTime = fromDate.toISOString();
      param.toTime = toDate.toISOString();
      setLoading(true);
      // Giả lập gọi API lấy dữ liệu mới
      const res = await getChartsData(param);
      setChartData(res.data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  }, [selectedDevice, fromDate, toDate]);

  const getDataHistory = useCallback(
    async (
      pageToLoad: number,
      mode: 'initial' | 'refresh' | 'more' = 'initial',
    ) => {
      if (mode === 'initial') setLoading(true);
      if (mode === 'refresh') setRefreshing(true);
      if (mode === 'more') setLoadingMore(true);
      try {
        const param: getAllSensorsParams = {};
        if (selectedDevice) {
          param.deviceId = selectedDevice;
        }
        param.page = pageToLoad;
        param.pageSize = PageSize;
        param.fromTime = fromDate.toISOString();
        param.toTime = toDate.toISOString();
        const res = await getSensorsValue(param);
        const list = res.data || [];
        // Fix: Kiểm tra xem có dữ liệu tiếp theo không (nếu trả về đủ PageSize items)
        setHasMore(list.length === PageSize);
        setPage(pageToLoad);
        // Khi load thêm thì append, còn initial/refresh thì reset dữ liệu
        if (mode === 'more') {
          setHistoryData(prev => [...prev, ...list]);
        } else {
          setHistoryData(list);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false); // Nếu muốn có loading riêng cho phần history
        setRefreshing(false);
        setLoadingMore(false);
      }
    },
    [selectedDevice, fromDate, toDate],
  );

  const getIotDevices = useCallback(async () => {
    try {
      const res = await getAllIotDevices({ page: 1, pageSize: 500 });
      setIotDevices(res.data || []);
    } catch (error) {
      throw error;
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }, []);

  const getWarningZone = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getThresholdValue({
        page: 1,
        pageSize: 500,
        deviceId: selectedDevice,
      });
      setWarningZone(res.data);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }, [selectedDevice]);

  useEffect(() => {
    getIotDevices();
  }, [getIotDevices]);

  useEffect(() => {
    getDataCharts();
    getWarningZone();
    // When selectedDevice changes, reload history (replace existing list)
    getDataHistory(1, 'initial');
  }, [
    getDataCharts,
    getDataHistory,
    getWarningZone,
    selectedDevice,
    fromDate,
    toDate,
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    getDataCharts();
    getDataHistory(1, 'refresh');
  };

  const onEndReached = () => {
    if (loading || loadingMore || !hasMore) return;
    if (historyData.length === 0) return;

    getDataHistory(page + 1, 'more');
  };

  const headerComponent = () => (
    <View style={styles.headerContainer}>
      {/* Chọn thiết bị */}
      <Dropdown
        data={IotDiveces}
        value={selectedDevice}
        setValue={val => {
          setSelectedDevice(val);
        }}
      />
      <View style={styles.filterRow}>
        <DateTimeField label="From" value={fromDate} onChange={setFromDate} />
        <DateTimeField label="To" value={toDate} onChange={setToDate} />
      </View>
      <View style={styles.chartWrapper}>
        <Chart data={chartData} zone={warningZone} />
      </View>
    </View>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.renderFooter}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  if (loading) {
    return <Loading />;
  }

  return loading && page === 1 ? (
    <Loading />
  ) : (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.alertHeader}>
        <Pressable
          accessibilityRole="button"
          onPress={onBack}
          style={styles.iconButton}
        >
          <Text style={styles.iconText}>‹</Text>
        </Pressable>
        <Text style={styles.screenTitle}>Lịch sử</Text>
      </View>
      <FlatList
        style={styles.alertScroll}
        data={historyData}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <HistoryItemCard item={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={headerComponent}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
        initialNumToRender={10}
      />
      {/* <Dropdown
        data={IotDiveces}
        value={metricId}
        setValue={setSelectedDevice}
      />
      <View style={{ marginTop: 18 }}>
        <Chart data={chartData} />
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  alertScroll: {
    paddingHorizontal: 18,
    paddingBottom: 28,
  },
  alertHeader: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
  },
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
  screenTitle: {
    flex: 1,
    color: palette.ink,
    fontSize: 23,
    fontWeight: '900',
    marginLeft: 10,
  },
  filterIcon: {
    color: '#42495d',
    fontSize: 26,
    transform: [{ rotate: '90deg' }],
  },

  summaryCard: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 18,
  },
  summaryTextBlock: {
    flex: 1,
  },
  summaryTitle: {
    color: palette.ink,
    fontSize: 16,
    fontWeight: '900',
  },
  summaryTime: {
    color: palette.muted,
    fontSize: 12,
    marginTop: 9,
  },
  supportCard: {
    borderRadius: 8,
    backgroundColor: '#edf6ff',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  supportTitle: {
    color: palette.ink,
    fontSize: 14,
    fontWeight: '900',
  },
  supportCopy: {
    color: '#5d6479',
    fontSize: 12,
    marginTop: 5,
  },
  callButton: {
    minWidth: 132,
    height: 48,
    borderRadius: 7,
    backgroundColor: palette.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
  },
  renderFooter: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 112,
    flexGrow: 1,
  },
  headerContainer: {
    // paddingHorizontal: 16,
    paddingTop: 12,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 6,
  },
  filterItem: {
    flex: 1,
  },
  chartWrapper: {
    marginTop: 18,
    overflow: 'hidden',
  },
});
