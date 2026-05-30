import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { alerts } from '../../db/mockData';
import { AlertCard } from '../components/alerts/AlertCard';
import { palette } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import Loading from '../components/Loading';
import { RefreshControl } from 'react-native-gesture-handler';
import { getChartsData } from '../api/chartApi';

type DetailScreenProps = {
  onBack: () => void;
  metricId: any;
};

export function DetailScreen({ onBack, metricId }: DetailScreenProps) {
  console.log('DetailScreen metricId:', metricId);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(true);

  const getDataCharts = async () => {
    try {
      setLoading(true);
      // Giả lập gọi API lấy dữ liệu mới
      const res = await getChartsData();
      console.log('Dữ liệu charts mới:', res);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu charts:', error);
      setLoading(false);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  useEffect(() => {
    getDataCharts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getDataCharts();
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.alertScroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.alertHeader}>
          <Pressable
            accessibilityRole="button"
            onPress={onBack}
            style={styles.iconButton}
          >
            <Text style={styles.iconText}>‹</Text>
          </Pressable>
          <Text style={styles.screenTitle}>Lịch sử</Text>
          <View style={styles.iconButton}>
            <Icon name="filter" size={24} />
          </View>
        </View>
        {alerts.map((item, index) => (
          <AlertCard key={item.id} alert={item} index={index + 1} />
        ))}
        <View style={styles.supportCard}>
          <View>
            <Text style={styles.supportTitle}>Cần hỗ trợ ngay?</Text>
            <Text style={styles.supportCopy}>
              Kỹ thuật viên sẵn sàng hỗ trợ 24/7
            </Text>
          </View>
          <Pressable style={styles.callButton}>
            <Text style={styles.callButtonText}>Gọi kỹ thuật</Text>
          </Pressable>
        </View>
      </ScrollView>
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
  filterIcon: {
    color: '#42495d',
    fontSize: 26,
    transform: [{ rotate: '90deg' }],
  },
  screenTitle: {
    flex: 1,
    color: palette.ink,
    fontSize: 23,
    fontWeight: '900',
    marginLeft: 10,
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
});
