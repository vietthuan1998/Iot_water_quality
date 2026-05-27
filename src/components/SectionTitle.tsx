import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {palette} from '../theme';

type SectionTitleProps = {
  title: string;
  action?: string;
  onPress?: () => void;
};

export function SectionTitle({title, action, onPress}: SectionTitleProps) {
  return (
    <View style={styles.sectionTitleRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? (
        <Pressable onPress={onPress}>
          <Text style={styles.sectionAction}>{action} ›</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitleRow: {
    marginTop: 24,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: palette.ink,
    fontSize: 16,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  sectionAction: {
    color: '#166adf',
    fontSize: 13,
    fontWeight: '700',
  },
});
