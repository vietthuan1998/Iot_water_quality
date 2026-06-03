import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/EvilIcons';

export default function Dropdown({
  data,
  value,
  setValue,
}: {
  data: any[];
  value?: number;
  setValue?: (value: any) => void;
}) {
  return (
    <SelectDropdown
      data={data}
      defaultValue={data.find(item => item.id === value)}
      onSelect={selectedItem => {
        setValue?.(selectedItem?.id);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.dropdownButtonStyle}>
            <Text style={styles.dropdownButtonTxtStyle}>
              {(selectedItem &&
                (selectedItem.deviceName || selectedItem.name)) ||
                'Chọn thiết bị'}
            </Text>
            <Icon
              name={isOpened ? 'chevron-up' : 'chevron-down'}
              style={styles.dropdownButtonArrowStyle}
            />
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && { backgroundColor: '#D2D9DF' }),
            }}
          >
            <Text style={styles.dropdownItemTxtStyle}>
              {item.deviceName || item.name}
            </Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
}
const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: '100%',
    height: 50,
    // backgroundColor: '#E9ECEF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 16,
    paddingHorizontal: 20,
    color: '#111827',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 15,
    // fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
