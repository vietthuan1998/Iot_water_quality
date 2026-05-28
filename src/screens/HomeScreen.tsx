import React from 'react';
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

type HomeScreenProps = {
  onOpenDrawer: () => void;
  onOpenAlerts: () => void;
  onNavigate: Navigate;
};

export function HomeScreen({
  onNavigate,
  onOpenAlerts,
  onOpenDrawer,
}: HomeScreenProps) {
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
        <MetricGrid />
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
