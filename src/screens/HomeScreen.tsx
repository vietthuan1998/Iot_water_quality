import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { BottomNav } from '../components/BottomNav';
import { SectionTitle } from '../components/SectionTitle';
import { AiPanel } from '../components/home/AiPanel';
import { AlertHero } from '../components/home/AlertHero';
import { CameraPanel } from '../components/home/CameraPanel';
import { Header } from '../components/home/Header';
import { MetricGrid } from '../components/home/MetricGrid';
import { StatusPanel } from '../components/home/StatusPanel';
import { Navigate } from '../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getNewSensorsValue } from '../api/sensorApi';
import { SensorMetric, Severity } from '../../db/mockData';

type HomeScreenProps = {
  onOpenDrawer: () => void;
  onOpenAlerts: () => void;
  onNavigate: Navigate;
};

// ─── Helpers đánh giá ngưỡng ──────────────────────────────────────────────────

function getPhSeverity(v: number): { severity: Severity; status: string } {
  if (v >= 6.8 && v <= 8.0) return { severity: 'normal', status: 'Tốt' };
  if ((v >= 6.5 && v < 6.8) || (v > 8.0 && v <= 8.5))
    return { severity: 'warning', status: 'Hơi lệch' };
  return { severity: 'danger', status: 'Nguy hiểm' };
}

function getTempWaterSeverity(v: number): { severity: Severity; status: string } {
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

// Màu sắc dựa theo severity
function severityColor(
  severity: Severity,
  normalColor = '#19b85a',
): string {
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

  useEffect(() => {
    /** pH – deviceId 14 */
    getNewSensorsValue({ deviceId: 14 }).then(res => {
      setPhRaw(res?.data?.[0] ?? null);
    });
    /** Nhiệt độ nước DS18B20 – deviceId 13 */
    getNewSensorsValue({ deviceId: 13 }).then(res => {
      setTempWaterRaw(res?.data?.[0] ?? null);
    });
    /** TDS – deviceId 15 */
    getNewSensorsValue({ deviceId: 15 }).then(res => {
      setTdsRaw(res?.data?.[0] ?? null);
    });
    /** Nhiệt độ không khí SHT31 – deviceId 16 */
    getNewSensorsValue({ deviceId: 16 }).then(res => {
      setTempAirRaw(res?.data?.[0] ?? null);
    });
  }, []);

  /** Chuyển đổi raw API → SensorMetric[] */
  const metrics: SensorMetric[] = useMemo(() => {
    const result: SensorMetric[] = [];

    if (phRaw) {
      const value: number = phRaw.valueNumeric;
      const { severity, status } = getPhSeverity(value);
      result.push({
        id: 'ph',
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
        id: 'temp',
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
        id: 'tds',
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
        id: 'temp-air',
        label: 'Nhiệt độ KK',
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

    return result;
  }, [phRaw, tempWaterRaw, tdsRaw, tempAirRaw]);

  return (
    <SafeAreaView style={styles.appShell}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header onOpenAlerts={onOpenAlerts} onOpenDrawer={onOpenDrawer} />
        <AlertHero onOpenAlerts={onOpenAlerts} />
        <SectionTitle title="Tổng quan hồ" />
        <StatusPanel />
        <SectionTitle
          title="Chỉ số quan trọng"
          action="Xem chi tiết"
          onPress={onOpenAlerts}
        />
        <MetricGrid data={metrics} />
        <SectionTitle
          title="AI nhận định"
          action="Xem chi tiết AI"
          onPress={onOpenAlerts}
        />
        <AiPanel />
        <SectionTitle title="Camera hồ" action="Xem tất cả" />
        <CameraPanel />
      </ScrollView>
      <BottomNav onNavigate={onNavigate} />
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
});
