import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type CounterProps = {
  value: number;
  label: string;
  color: string;
};

export function Counter({value, label, color}: CounterProps) {
  return (
    <View style={styles.counter}>
      <Text style={[styles.counterValue, {color}]}>{value}</Text>
      <Text style={styles.counterLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  counter: {
    width: 58,
    alignItems: 'center',
  },
  counterValue: {
    fontSize: 29,
    fontWeight: '900',
  },
  counterLabel: {
    color: '#555e75',
    fontSize: 11,
    marginTop: 5,
  },
});
