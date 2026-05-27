import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export function CameraPanel() {
  return (
    <View style={styles.cameraCard}>
      <View style={styles.pondScene}>
        <View style={[styles.fish, styles.fishOne]} />
        <View style={[styles.fish, styles.fishTwo]} />
        <View style={[styles.fish, styles.fishThree]} />
        <View style={[styles.fish, styles.fishFour]} />
        <View style={styles.waterfall} />
        <View style={styles.playCircle}>
          <Text style={styles.playText}>▶</Text>
        </View>
        <Text style={styles.cameraTime}>09:41:25</Text>
        <Text style={styles.cameraTool}>▣  ⛶</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraCard: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#071c20',
    minHeight: 236,
  },
  pondScene: {
    minHeight: 236,
    padding: 16,
    backgroundColor: '#0a2f35',
  },
  fish: {
    position: 'absolute',
    width: 84,
    height: 22,
    borderRadius: 12,
    backgroundColor: '#f4f4f2',
    borderLeftWidth: 22,
    borderLeftColor: '#f05a28',
  },
  fishOne: {
    left: 56,
    top: 80,
    transform: [{rotate: '-14deg'}],
  },
  fishTwo: {
    right: 54,
    top: 112,
    transform: [{rotate: '12deg'}],
  },
  fishThree: {
    left: 120,
    bottom: 58,
    transform: [{rotate: '9deg'}],
  },
  fishFour: {
    right: 138,
    top: 152,
    transform: [{rotate: '-8deg'}],
  },
  waterfall: {
    position: 'absolute',
    right: 48,
    top: 18,
    width: 86,
    height: 30,
    borderBottomWidth: 6,
    borderBottomColor: '#d8f7ff',
    opacity: 0.85,
  },
  playCircle: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: 64,
    height: 64,
    marginLeft: -32,
    marginTop: -32,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000030',
  },
  playText: {
    color: '#fff',
    fontSize: 26,
    marginLeft: 4,
  },
  cameraTime: {
    position: 'absolute',
    left: 18,
    bottom: 14,
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  cameraTool: {
    position: 'absolute',
    right: 18,
    bottom: 14,
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
});
