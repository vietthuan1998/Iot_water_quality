import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { owner } from '../../../db/mockData';
import { palette } from '../../theme';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type HeaderProps = {
  onOpenDrawer: () => void;
  onOpenAlerts: () => void;
};

export function Header({ onOpenAlerts, onOpenDrawer }: HeaderProps) {
  const temp = useSelector((state: RootState) => state.auth.user);
  console.log(temp.name);
  return (
    <View style={styles.header}>
      <Pressable onPress={onOpenDrawer} style={styles.menuButton}>
        <Text style={styles.menuText}>☰</Text>
      </Pressable>
      <View style={styles.headerTitleWrap}>
        {/* <Text style={styles.areaName}>{waterArea.name}⌄</Text>
        <Text style={styles.location}>● {waterArea.location}</Text> */}
      </View>
      <View style={styles.ownerAvatar}>
        <Text style={styles.ownerInitials}>{owner.avatarInitials}</Text>
      </View>
      <View style={styles.ownerBlock}>
        <Text style={styles.ownerName} numberOfLines={1}>
          {temp.name}
        </Text>
        <Text style={styles.ownerRole}>{owner.role}</Text>
      </View>
      <Pressable onPress={onOpenAlerts} style={styles.bellButton}>
        {/* <Text style={styles.bellText}>♢</Text> */}
        <Icon name="bell" size={24} color="#000000" />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>3</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuButton: {
    width: 34,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    color: '#4c5367',
    fontSize: 30,
    lineHeight: 32,
  },
  headerTitleWrap: {
    flex: 1,
    minWidth: 110,
  },
  areaName: {
    color: palette.ink,
    fontSize: 18,
    fontWeight: '800',
  },
  location: {
    color: '#20a957',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '700',
  },
  ownerAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#f0d8c3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ownerInitials: {
    color: '#764821',
    fontSize: 13,
    fontWeight: '900',
  },
  ownerBlock: {
    width: 82,
  },
  ownerName: {
    color: palette.ink,
    fontSize: 12,
    fontWeight: '800',
  },
  ownerRole: {
    color: palette.muted,
    fontSize: 11,
    marginTop: 3,
  },
  bellButton: {
    width: 38,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellText: {
    color: '#454d66',
    fontSize: 28,
  },
  badge: {
    position: 'absolute',
    right: 3,
    top: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: palette.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '900',
  },
});
