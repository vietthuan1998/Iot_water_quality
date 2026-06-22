import React from 'react';
import { Pressable, StyleSheet, Text, View, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// Import thư viện icon - Ionicons có thiết kế rất hiện đại cho mobile
import Icon from 'react-native-vector-icons/Ionicons';
import { MainTabRoute, Navigate } from '../navigation/types';
// import { palette } from '../theme'; // Tạm thời comment nếu bạn chưa dùng tới

type BottomNavProps = {
  activeRoute: MainTabRoute;
  onNavigate: Navigate;
};

export function BottomNav({ activeRoute, onNavigate }: BottomNavProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 16) }]}>
      <View style={styles.bottomNav}>
        <NavItem
          label="Trang chủ"
          // Tự động chuyển đổi giữa icon đặc (solid) và viền (outline)
          iconName={activeRoute === 'Home' ? 'home' : 'home-outline'}
          active={activeRoute === 'Home'}
          onPress={() => onNavigate('Home')}
        />
        <NavItem
          label="Lịch sử"
          iconName={activeRoute === 'History' ? 'time' : 'time-outline'}
          active={activeRoute === 'History'}
          onPress={() => onNavigate('History')}
        />
        
        {/* Nút FAB trung tâm sử dụng Icon Add */}
        <Pressable style={styles.addButton}>
          <Icon name="add" size={36} color="#ffffff" style={styles.addIcon} />
        </Pressable>

        <NavItem
          label="Thiết bị"
          iconName={activeRoute === 'Devices' ? 'hardware-chip' : 'hardware-chip-outline'}
          active={activeRoute === 'Devices'}
          onPress={() => onNavigate('Devices')}
        />
        <NavItem
          label="Cài đặt"
          iconName={activeRoute === 'Settings' ? 'settings' : 'settings-outline'}
          active={activeRoute === 'Settings'}
          onPress={() => onNavigate('Settings')}
        />
      </View>
    </View>
  );
}

type NavItemProps = {
  label: string;
  iconName: string;
  onPress: () => void;
  active?: boolean;
};

function NavItem({ label, iconName, active, onPress }: NavItemProps) {
  // Quản lý màu sắc trực tiếp qua props của Vector Icons
  const iconColor = active ? '#20bd63' : '#8e96aa';

  return (
    <Pressable onPress={onPress} style={styles.navItem}>
      <View style={[styles.iconContainer, active && styles.activeIconContainer]}>
        <Icon name={iconName} size={24} color={iconColor} />
      </View>
      <Text style={[styles.navLabel, active && styles.navActiveText]}>{label}</Text>
      {active && <View style={styles.activeDot} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent', 
  },
  bottomNav: {
    marginHorizontal: 20, 
    height: 72,
    borderRadius: 36, 
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 10, 
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  iconContainer: {
    width: 40,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    marginBottom: 2,
  },
  activeIconContainer: {
    backgroundColor: 'rgba(32, 189, 99, 0.1)', 
  },
  navLabel: {
    color: '#8e96aa',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  navActiveText: {
    color: '#20bd63', 
    fontWeight: '700',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#20bd63',
    position: 'absolute',
    bottom: 6,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#20bd63',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30, 
    borderWidth: 4,
    borderColor: '#f5f7fa', 
    shadowColor: '#20bd63',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  addIcon: {
    // Tinh chỉnh nhẹ vị trí icon cộng cho cân đối trên iOS/Android
    marginTop: Platform.OS === 'ios' ? 2 : 0, 
    marginLeft: Platform.OS === 'ios' ? 2 : 0,
  }
});