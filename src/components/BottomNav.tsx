import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Navigate } from '../navigation/types';
import { palette } from '../theme';

type BottomNavProps = {
  onNavigate: Navigate;
};

export function BottomNav({ onNavigate }: BottomNavProps) {
  return (
    <View style={styles.bottomNav}>
      <NavItem
        label="Trang chủ"
        icon="⌂"
        active
        onPress={() => onNavigate('Home')}
      />
      <NavItem label="Lịch sử" icon="◷" onPress={() => onNavigate('History')} />
      <Pressable onPress={() => onNavigate('Alerts')} style={styles.addButton}>
        <Text style={styles.addButtonText}>＋</Text>
      </Pressable>
      <NavItem
        label="Thiết bị"
        icon="▤"
        onPress={() => onNavigate('Devices')}
      />
      <NavItem
        label="Cài đặt"
        icon="⚙"
        onPress={() => onNavigate('Settings')}
      />
    </View>
  );
}

type NavItemProps = {
  label: string;
  icon: string;
  onPress: () => void;
  active?: boolean;
};

function NavItem({ label, icon, active, onPress }: NavItemProps) {
  return (
    <Pressable onPress={onPress} style={styles.navItem}>
      <Text style={[styles.navIcon, active && styles.navActive]}>{icon}</Text>
      <Text style={[styles.navLabel, active && styles.navActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 12,
    minHeight: 76,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#14213d',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 8,
  },
  navItem: {
    width: 66,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  navIcon: {
    color: '#5f667b',
    fontSize: 23,
    fontWeight: '800',
  },
  navLabel: {
    color: '#5f667b',
    fontSize: 11,
    fontWeight: '700',
  },
  navActive: {
    color: '#19a95a',
  },
  addButton: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#20bd63',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#20bd63',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 7,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 35,
    lineHeight: 38,
    fontWeight: '400',
  },
});
