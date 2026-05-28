import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { StackActions } from '@react-navigation/native';
import { owner, waterArea } from '../../db/mockData';
import { AppRoute } from '../navigation/types';
import { palette } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logout } from '../store/authSlice';
import { removeToken } from '../store/persistToken';
import { store } from '../store';

const drawerItems: Array<{ label: string; route: AppRoute; icon: string }> = [
  { label: 'Tổng quan', route: 'Home', icon: '⌂' },
  { label: 'Cảnh báo', route: 'Alerts', icon: '!' },
  { label: 'Lịch sử', route: 'History', icon: '◷' },
  { label: 'Thiết bị', route: 'Devices', icon: '▤' },
  { label: 'Cài đặt', route: 'Settings', icon: '⚙' },
];

export function AppDrawerContent({ navigation }: DrawerContentComponentProps) {
  const handleLogout = () => {
    removeToken();
    store.dispatch(logout());
    navigation.getParent()?.dispatch(StackActions.replace('Login'));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.drawer}>
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{owner.avatarInitials}</Text>
          </View>
          <View style={styles.profileCopy}>
            <Text style={styles.name}>{owner.name}</Text>
            <Text style={styles.role}>{owner.role}</Text>
          </View>
        </View>

        <View style={styles.areaBox}>
          <Text style={styles.areaLabel}>Khu vực đang theo dõi</Text>
          <Text style={styles.areaName}>{waterArea.name}</Text>
          <Text style={styles.areaStatus}>{waterArea.status}</Text>
        </View>

        <View style={styles.menuList}>
          {drawerItems.map(item => (
            <Pressable
              key={item.route}
              onPress={() =>
                navigation.navigate('Dashboard', { screen: item.route })
              }
              style={styles.menuItem}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 20,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0d8c3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#764821',
    fontSize: 14,
    fontWeight: '900',
  },
  profileCopy: {
    flex: 1,
  },
  name: {
    color: palette.ink,
    fontSize: 15,
    fontWeight: '900',
  },
  role: {
    color: palette.muted,
    fontSize: 12,
    marginTop: 4,
  },
  areaBox: {
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: '#fff0f2',
    padding: 14,
  },
  areaLabel: {
    color: palette.muted,
    fontSize: 12,
  },
  areaName: {
    color: palette.ink,
    fontSize: 15,
    fontWeight: '900',
    marginTop: 5,
  },
  areaStatus: {
    color: palette.red,
    fontSize: 13,
    fontWeight: '900',
    marginTop: 7,
  },
  menuList: {
    marginTop: 18,
    flex: 1,
    gap: 6,
  },
  menuItem: {
    minHeight: 48,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  menuIcon: {
    width: 30,
    color: '#5f667b',
    fontSize: 20,
    fontWeight: '900',
  },
  menuLabel: {
    color: '#394158',
    fontSize: 14,
    fontWeight: '800',
  },
  logoutButton: {
    minHeight: 48,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#ffe1e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: palette.red,
    fontSize: 14,
    fontWeight: '900',
  },
});
