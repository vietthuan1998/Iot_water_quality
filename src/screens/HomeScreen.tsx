import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SectionTitle } from '../components/SectionTitle';
import { AlertHero } from '../components/home/AlertHero';
import { Header } from '../components/home/Header';
import { MetricGrid } from '../components/home/MetricGrid';
import { StatusPanel } from '../components/home/StatusPanel';
import { Navigate } from '../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getSensorsValue } from '../api/sensorApi';
import { SensorMetric } from '../../db/mockData';
import { RefreshControl } from 'react-native-gesture-handler';
import Loading from '../components/Loading';
import { useWarningLevels } from '../context/WarningLevelContext';
import { normalizeValue } from '../services/normalizeValue';

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

function getAlertColor(
  value: number,
  deviceId: number,
  parameterCode: number,
  thresholds: any[],
) {
  const matchedRule = thresholds.find(
    item =>
      item.parameterId === parameterCode &&
      item.deviceIdFk === deviceId &&
      value >= item.minValue &&
      value <= item.maxValue,
  );
  return {
    colorCode: matchedRule?.alertLevel?.colorCode,
    name: matchedRule?.alertLevel?.name,
  };
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
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const thresholdValue = useWarningLevels().thresholdValue;

  const getAllData = useCallback(async () => {
    try {
      setLoading(true);

      const [phRes, tempWaterRes, tdsRes, tempAndHumidityAirRes] =
        await Promise.all([
          getSensorsValue({ deviceId: DeviceId.ph, pageSize: 2 }),
          getSensorsValue({ deviceId: DeviceId.tempWater, pageSize: 2 }),
          getSensorsValue({ deviceId: DeviceId.tds, pageSize: 2 }),
          getSensorsValue({
            deviceId: DeviceId.tempAndHumidityAir,
            pageSize: 4,
          }),
        ]);

      setPhRaw(phRes?.data);
      setTempWaterRaw(tempWaterRes?.data);
      setTdsRaw(tdsRes?.data);
      setHumidityAirRaw(
        tempAndHumidityAirRes.data.filter(
          (ele: { parameter: { code: string } }) =>
            ele.parameter.code === 'humidity',
        ),
      );
      setTempAirRaw(
        tempAndHumidityAirRes.data.filter(
          (ele: { parameter: { code: string } }) =>
            ele.parameter.code !== 'humidity',
        ),
      );
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAllData();
  }, [getAllData]);
  // getAlertLevelCode(phRaw, thresholdValue);
  useEffect(() => {
    getAllData();
  }, [getAllData]);

  /** Chuyển đổi raw API → SensorMetric[] */
  const metrics: SensorMetric[] = useMemo(() => {
    const result: any[] = [];
    // console.log(getAlertColor(7, DeviceId.ph, thresholdValue));
    if (phRaw) {
      console.log(
        'normalize Data',
        normalizeValue(phRaw[0] || {}, thresholdValue || []),
      );
      const value: number = phRaw[0].valueNumeric;
      const { colorCode, name } = getAlertColor(
        value,
        phRaw[0].deviceIdFk,
        phRaw[0].parameterId,
        thresholdValue,
      );
      result.push({
        id: phRaw[0].id,
        deviceId: DeviceId.ph,
        label: 'pH',
        icon: 'ph',
        value,
        unit: '',
        status: name,
        severity: name,
        trend: value < 6.5 ? 'down' : value > 7.5 ? 'up' : 'stable',
        safeRange: '6.5 – 7.5',
        color: colorCode,
        history: [],
      });
    }

    if (tempWaterRaw) {
      const value: number = tempWaterRaw[0].valueNumeric;
      const { colorCode, name } = getAlertColor(
        value,
        tempWaterRaw[0].deviceIdFk,
        tempWaterRaw[0].parameterId,
        thresholdValue,
      );
      result.push({
        id: tempWaterRaw[0].id,
        deviceId: DeviceId.tempWater,
        label: 'Nhiệt độ nước',
        icon: 'thermometer',
        value,
        unit: '°C',
        status: name,
        severity: name,
        trend: value < 24 ? 'down' : value > 28 ? 'up' : 'stable',
        safeRange: '24 – 28 °C',
        color: colorCode,
        history: [],
      });
    }

    if (tdsRaw) {
      const value: number = tdsRaw[0].valueNumeric;
      const { colorCode, name } = getAlertColor(
        value,
        tdsRaw[0].deviceIdFk,
        tdsRaw[0].parameterId,
        thresholdValue,
      );
      result.push({
        id: tdsRaw[0].id,
        deviceId: DeviceId.tds,
        label: 'TDS',
        icon: 'water-opacity',
        value,
        unit: 'ppm',
        status: name,
        severity: name,
        trend: value < 100 ? 'down' : value > 250 ? 'up' : 'stable',
        safeRange: '< 300 ppm',
        color: colorCode,
        history: [],
      });
    }

    if (tempAirRaw) {
      const value: number = tempAirRaw[0]?.valueNumeric;
      const { colorCode, name } = getAlertColor(
        value,
        tempAirRaw[0].deviceIdFk,
        tempAirRaw[0].parameterId,
        thresholdValue,
      );
      result.push({
        id: tempAirRaw[0]?.id,
        deviceId: DeviceId.tempAndHumidityAir,
        label: 'Nhiệt độ môi trường',
        icon: 'thermometer',
        value,
        unit: '°C',
        status: name,
        severity: name,
        trend: value < 25 ? 'down' : value > 30 ? 'up' : 'stable',
        safeRange: '25 – 30 °C',
        color: colorCode,
        history: [],
      });
    }

    if (humidityAirRaw) {
      const value: number = humidityAirRaw[0]?.valueNumeric;
      const { colorCode, name } = getAlertColor(
        value,
        humidityAirRaw[0].deviceIdFk,
        humidityAirRaw[0].parameterId,
        thresholdValue,
      );
      result.push({
        id: humidityAirRaw[0]?.id,
        deviceId: DeviceId.tempAndHumidityAir,
        label: 'Độ ẩm môi trường',
        icon: 'water-percent',
        value,
        unit: '%',
        status: name,
        severity: name,
        trend: value < 50 ? 'down' : value > 70 ? 'up' : 'stable',
        safeRange: '50 – 70 %',
        color: colorCode,
        history: [],
      });
    }

    return result;
  }, [phRaw, tempWaterRaw, tdsRaw, tempAirRaw, humidityAirRaw, thresholdValue]);

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
