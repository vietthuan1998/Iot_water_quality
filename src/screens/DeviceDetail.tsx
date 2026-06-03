import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { palette } from '../theme';
type DetailScreenProps = {
  onBack: () => void;
  data?: any;
};
export default function DeviceDetail({ onBack, data }: DetailScreenProps) {
  console.log(data);
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
        <Text style={styles.screenTitle}>Chi tiết thiết bị</Text>
      </View>
      <View>
        <Text>Đang phát triển...</Text>
      </View>
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
    fontWeight: '700',
    marginLeft: 10,
  },
});
