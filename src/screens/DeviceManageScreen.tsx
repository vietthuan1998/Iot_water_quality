import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { palette } from '../theme';
import { DeviceCard } from '../components/device/DeviceCard';
import Loading from '../components/Loading';
import { getAllIotDevices } from '../api/sensorApi';
import { RefreshControl } from 'react-native-gesture-handler';
import { Navigate } from '../navigation/types';
import ModelDevice from '../components/device/ModelDevice';
import { getAllDeviceTypes, UpdateDevice } from '../api/devices';

type DetailScreenProps = {
  onBack: () => void;
  onNavigate: Navigate;
};
const PageSize = 10;
export default function DeviceManageScreen({
  onBack,
  onNavigate,
}: DetailScreenProps) {
  const [devices, setDevices] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [deviceTypes, setDeviceTypes] = useState<any[]>([]);

  const getDeviceTypes = useCallback(async () => {
    try {
      const res = await getAllDeviceTypes(1, 100);
      setDeviceTypes(res.data || []);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  }, []);

  const getDevices = useCallback(
    async (
      pageToLoad: number,
      mode: 'initial' | 'refresh' | 'more' = 'initial',
    ) => {
      if (mode === 'initial') setLoading(true);
      if (mode === 'refresh') setRefreshing(true);
      if (mode === 'more') setLoadingMore(true);
      try {
        const res = await getAllIotDevices({
          page: pageToLoad,
          pageSize: PageSize,
        });
        const list = res.data || [];
        setHasMore(list.length === PageSize);
        setPage(pageToLoad);
        if (mode === 'more') {
          setDevices(prev => [...prev, ...list]);
        } else {
          setDevices(list);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
        setRefreshing(false);
        setLoadingMore(false);
      }
    },
    [],
  );

  const updateDevice = useCallback(async (data: any) => {
    try {
      setLoading(true);
      // console.log(data);
      const res = await UpdateDevice(data.id, data);
      if (res.code !== 0) {
        throw new Error('Cập nhật thiết bị thất bại' + res.message);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getDeviceTypes();
    getDevices(1, 'initial');
  }, [getDevices, getDeviceTypes]);

  const handleEdit = (device: any) => {
    setSelectedDevice(device);
    setEditVisible(true);
  };
  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.renderFooter}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  const onEndReached = () => {
    if (loading || loadingMore || !hasMore) return;
    if (devices.length === 0) return;

    getDevices(page + 1, 'more');
  };

  const onRefresh = () => {
    setRefreshing(true);
    getDevices(1, 'refresh');
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.alertHeader}>
        <Pressable
          accessibilityRole="button"
          onPress={onBack}
          style={styles.iconButton}
        >
          <Text style={styles.iconText}>‹</Text>
        </Pressable>
        <Text style={styles.screenTitle}>Quản lý thiết bị</Text>
      </View>
      <FlatList
        data={devices}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 120,
        }}
        renderItem={({ item }) => (
          <DeviceCard
            item={item}
            onView={() => {
              onNavigate('DeviceDetail', { data: item });
            }}
            onEdit={() => {
              handleEdit(item);
            }}
            onPower={() => {}}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        ListFooterComponent={renderFooter}
        initialNumToRender={10}
      />
      <ModelDevice
        visible={editVisible}
        device={selectedDevice}
        deviceTypes={deviceTypes}
        onClose={() => setEditVisible(false)}
        onSave={async data => {
          await updateDevice(data);
          setEditVisible(false);
          getDevices(1, 'refresh');
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
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
  renderFooter: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
