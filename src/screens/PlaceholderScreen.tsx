import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {AppRoute} from '../navigation/types';
import {palette} from '../theme';

const screenCopy: Record<Exclude<AppRoute, 'Home' | 'Alerts'>, string> = {
  History: 'Lịch sử dữ liệu cảm biến và nhật ký chăm sóc sẽ hiển thị ở đây.',
  Devices: 'Quản lý máy oxy, bơm, bộ lọc và trạng thái cụm cảm biến.',
  Settings: 'Cấu hình ngưỡng cảnh báo, khu vực nước và tài khoản.',
};

type PlaceholderScreenProps = {
  route: Exclude<AppRoute, 'Home' | 'Alerts'>;
  onBack: () => void;
};

export function PlaceholderScreen({route, onBack}: PlaceholderScreenProps) {
  return (
    <View style={styles.screen}>
      <Pressable onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>‹</Text>
      </Pressable>
      <View style={styles.card}>
        <Text style={styles.title}>{routeTitle(route)}</Text>
        <Text style={styles.copy}>{screenCopy[route]}</Text>
      </View>
    </View>
  );
}

function routeTitle(route: AppRoute) {
  if (route === 'History') {
    return 'Lịch sử';
  }
  if (route === 'Devices') {
    return 'Thiết bị';
  }
  return 'Cài đặt';
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.page,
    padding: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  backText: {
    color: '#42495d',
    fontSize: 42,
    lineHeight: 42,
  },
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    color: palette.ink,
    fontSize: 24,
    fontWeight: '900',
  },
  copy: {
    color: palette.muted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
  },
});
