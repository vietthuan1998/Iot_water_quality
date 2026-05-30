import { ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Loading() {
  return (
    <SafeAreaView style={styles.loadingScreen}>
      <ActivityIndicator size="large" color="#1179ff" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
