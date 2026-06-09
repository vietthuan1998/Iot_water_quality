import moment from 'moment';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import DatePicker from 'react-native-date-picker';

type Props = {
  label: string;
  value?: Date;
  onChange: (date: Date) => void;
};

export function DateTimeField({ label, value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Text style={styles.label}>{label}:</Text>
      <Pressable style={styles.input} onPress={() => setOpen(true)}>
        <Text style={[styles.value, !value && { color: '#9CA3AF' }]}>
          {moment(value).format('DD/MM/YYYY HH:mm')}
        </Text>
      </Pressable>

      <DatePicker
        modal
        open={open}
        date={value ? value : new Date()}
        mode="datetime"
        locale="vi"
        title={label}
        confirmText="Xác nhận"
        cancelText="Huỷ"
        onConfirm={date => {
          setOpen(false);
          onChange(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },

  input: {
    height: 48,
    // borderWidth: 1,
    // borderColor: '#DDD',
    // borderRadius: 8,
    // paddingHorizontal: 8,
    justifyContent: 'center',
    // backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 16,
    paddingHorizontal: 8,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },

  value: {
    fontSize: 15,
  },
});
