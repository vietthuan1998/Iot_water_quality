import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SectionTitle } from '../components/SectionTitle';
import { AlertHero } from '../components/home/AlertHero';
import { Header } from '../components/home/Header';
import { MetricGrid } from '../components/home/MetricGrid';
import { StatusPanel } from '../components/home/StatusPanel';
import { Navigate } from '../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getSensorsValue } from '../api/sensorApi';
import { SensorMetric, Severity } from '../../db/mockData';
import { RefreshControl } from 'react-native-gesture-handler';
import Loading from '../components/Loading';

type HomeScreenProps = {
  onOpenDrawer: () => void;
  onOpenAlerts: () => void;
  onNavigate: Navigate;
};
const DeviceId = {
  ph: 14,
  tempWater: 13,
  tds: 15,
  tempAndHumidityAir: 16,
};

// ─── Helpers đánh giá ngưỡng ──────────────────────────────────────────────────

function getPhSeverity(v: number): { severity: Severity; status: string } {
  if (v >= 6.8 && v <= 8.0) return { severity: 'normal', status: 'Tốt' };
  if ((v >= 6.5 && v < 6.8) || (v > 8.0 && v <= 8.5))
    return { severity: 'warning', status: 'Hơi lệch' };
  return { severity: 'danger', status: 'Nguy hiểm' };
}

function getTempWaterSeverity(v: number): {
  severity: Severity;
  status: string;
} {
  if (v >= 22 && v <= 28) return { severity: 'normal', status: 'Bình thường' };
  if ((v > 28 && v <= 32) || (v >= 18 && v < 22))
    return { severity: 'warning', status: v > 28 ? 'Hơi cao' : 'Hơi thấp' };
  return { severity: 'danger', status: v > 32 ? 'Quá cao' : 'Quá thấp' };
}

function getTdsSeverity(v: number): { severity: Severity; status: string } {
  if (v < 300) return { severity: 'normal', status: 'Tốt' };
  if (v < 500) return { severity: 'warning', status: 'Hơi cao' };
  return { severity: 'danger', status: 'Quá cao' };
}

function getTempAirSeverity(v: number): { severity: Severity; status: string } {
  if (v >= 20 && v <= 35) return { severity: 'normal', status: 'Bình thường' };
  if ((v > 35 && v <= 39) || (v >= 15 && v < 20))
    return { severity: 'warning', status: v > 35 ? 'Hơi nóng' : 'Hơi lạnh' };
  return { severity: 'danger', status: 'Nguy hiểm' };
}

function getHumidityAirSeverity(v: number): {
  severity: Severity;
  status: string;
} {
  if (v >= 40 && v <= 60) return { severity: 'normal', status: 'Bình thường' };
  if (v > 60 && v <= 80) return { severity: 'warning', status: 'Hơi ẩm' };
  return { severity: 'danger', status: v < 40 ? 'Quá khô' : 'Quá ẩm' };
}

// Màu sắc dựa theo severity
function severityColor(severity: Severity, normalColor = '#19b85a'): string {
  if (severity === 'danger') return '#ef233c';
  if (severity === 'warning') return '#ff6b1a';
  return normalColor;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HomeScreen({
  onNavigate,
  onOpenAlerts,
  onOpenDrawer,
}: HomeScreenProps) {
  const [phRaw, setPhRaw] = useState<any>(null);
  const [tempWaterRaw, setTempWaterRaw] = useState<any>(null);
  const [tdsRaw, setTdsRaw] = useState<any>(null);
  const [tempAirRaw, setTempAirRaw] = useState<any>(null);
  const [humidityAirRaw, setHumidityAirRaw] = useState<any>(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(true);

  const getAllData = async () => {
    try {
      setLoading(true);

      const [phRes, tempWaterRes, tdsRes, tempAndHumidityAirRes] =
        await Promise.all([
          getSensorsValue({ deviceId: DeviceId.ph, pageSize: 1 }),
          getSensorsValue({ deviceId: DeviceId.tempWater, pageSize: 1 }),
          getSensorsValue({ deviceId: DeviceId.tds, pageSize: 1 }),
          getSensorsValue({
            deviceId: DeviceId.tempAndHumidityAir,
            pageSize: 2,
          }),
        ]);

      setPhRaw(phRes?.data?.[0] ?? null);
      setTempWaterRaw(tempWaterRes?.data?.[0] ?? null);
      setTdsRaw(tdsRes?.data?.[0] ?? null);
      setTempAirRaw(tempAndHumidityAirRes?.data?.[0] ?? null);
      setHumidityAirRaw(tempAndHumidityAirRes?.data?.[1] ?? null);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAllData();
  }, []);

  useEffect(() => {
    getAllData();
  }, []);

  /** Chuyển đổi raw API → SensorMetric[] */
  const metrics: SensorMetric[] = useMemo(() => {
    const result: any[] = [];

    if (phRaw) {
      const value: number = phRaw.valueNumeric;
      const { severity, status } = getPhSeverity(value);
      result.push({
        id: phRaw.id,
        deviceId: DeviceId.ph,
        label: 'pH nước',
        shortLabel: 'pH',
        value,
        unit: '',
        status,
        severity,
        trend: 'stable',
        safeRange: '6.8 – 8.0',
        color: severityColor(severity, '#19b85a'),
        history: [],
      });
    }

    if (tempWaterRaw) {
      const value: number = tempWaterRaw.valueNumeric;
      const { severity, status } = getTempWaterSeverity(value);
      result.push({
        id: tempWaterRaw.id,
        deviceId: DeviceId.tempWater,
        label: 'Nhiệt độ nước',
        shortLabel: '°C',
        value,
        unit: '°C',
        status,
        severity,
        trend: 'stable',
        safeRange: '22 – 28 °C',
        color: severityColor(severity, '#ff6b1a'),
        history: [],
      });
    }

    if (tdsRaw) {
      const value: number = tdsRaw.valueNumeric;
      const { severity, status } = getTdsSeverity(value);
      result.push({
        id: tdsRaw.id,
        deviceId: DeviceId.tds,
        label: 'TDS',
        shortLabel: 'TDS',
        value,
        unit: 'ppm',
        status,
        severity,
        trend: 'stable',
        safeRange: '< 300 ppm',
        color: severityColor(severity, '#1179ff'),
        history: [],
      });
    }

    if (tempAirRaw) {
      const value: number = tempAirRaw.valueNumeric;
      const { severity, status } = getTempAirSeverity(value);
      result.push({
        id: tempAirRaw.id,
        deviceId: DeviceId.tempAndHumidityAir,
        label: 'Nhiệt độ môi trường',
        shortLabel: '°C',
        value,
        unit: '°C',
        status,
        severity,
        trend: 'stable',
        safeRange: '20 – 35 °C',
        color: severityColor(severity, '#8f43ff'),
        history: [],
      });
    }

    if (humidityAirRaw) {
      const value: number = humidityAirRaw.valueNumeric;
      const { severity, status } = getHumidityAirSeverity(value);
      result.push({
        id: humidityAirRaw.id,
        deviceId: DeviceId.tempAndHumidityAir,
        label: 'Độ ẩm môi trường',
        shortLabel: '%',
        value,
        unit: '%',
        status,
        severity,
        trend: 'stable',
        safeRange: '40 – 60 %',
        color: '#43a047',
        history: [],
      });
    }

    return result;
  }, [phRaw, tempWaterRaw, tdsRaw, tempAirRaw, humidityAirRaw]);

  const onSelectMetric = (metricId: string) => {
    onNavigate('Detail', { metricId });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.appShell}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header onOpenAlerts={onOpenAlerts} onOpenDrawer={onOpenDrawer} />
        <AlertHero onOpenAlerts={onOpenAlerts} />
        <SectionTitle title="Tổng quan hồ" />
        <StatusPanel />
        <SectionTitle
          title="Chỉ số quan trọng"
          action="Xem chi tiết"
          onPress={onOpenAlerts}
        />
        <MetricGrid data={metrics} onSelect={onSelectMetric} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appShell: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 112,
  },
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
