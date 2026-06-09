import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import FormField from '../FormField';
import { DateTimeField } from '../DateTimeField';

type EditDeviceModalProps = {
  visible: boolean;
  device: any;
  deviceTypes: any;
  onClose: () => void;
  onSave: (data: any) => void;
};
type Device = {
  createdAt?: string;
  deviceId: string;
  deviceName?: string;
  deviceType?: any;
  deviceTypeId?: number;
  firmwareVersion?: string;
  id: string;
  isActive?: boolean;
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  installedAt?: string;
};

export default function ModelDevice({
  visible,
  device,
  deviceTypes,
  onClose,
  onSave,
}: EditDeviceModalProps) {
  console.log(device);
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const [form, setForm] = useState<Device>({
    id: '',
    deviceId: '',
    deviceName: '',
    deviceTypeId: 0,
    manufacturer: '',
    model: '',
    serialNumber: '',
    firmwareVersion: '',
    installedAt: '',
    isActive: true,
  });

  // console.log('Device types in ModelDevice:', deviceTypes);

  useEffect(() => {
    if (device) {
      setForm({
        id: device.id ?? '',
        deviceId: device.deviceId ?? '',
        deviceName: device.deviceName ?? '',
        deviceTypeId: device.deviceTypeId ?? 0,
        manufacturer: device.manufacturer ?? '',
        model: device.model ?? '',
        serialNumber: device.serialNumber ?? '',
        firmwareVersion: device.firmwareVersion ?? '',
        installedAt: device.installedAt ?? '',
        isActive: device.isActive ?? true,
      });
    }
  }, [device]);

  const updateField = (key: keyof Device, value: any) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View
          style={[
            styles.modalContainer,
            !isTablet && styles.modalContainerMobile,
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Chỉnh sửa thiết bị</Text>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <Icon name="x" size={28} color="#8A94A6" />
            </Pressable>
          </View>
          {/* Form */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.formContent}
          >
            <View style={styles.row}>
              <View style={[styles.field, !isTablet && styles.fieldFullWidth]}>
                <FormField
                  label="Mã thiết bị"
                  required
                  value={form.deviceId}
                  onChangeText={v => updateField('deviceId', v)}
                  placeholder="Nhập mã thiết bị"
                  disabled
                />
              </View>
              <View style={[styles.field, !isTablet && styles.fieldFullWidth]}>
                <FormField
                  label="Tên thiết bị"
                  value={form.deviceName}
                  onChangeText={v => updateField('deviceName', v)}
                  placeholder="Nhập tên thiết bị"
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={[styles.field, !isTablet && styles.fieldFullWidth]}>
                <FormField
                  label="Loại thiết bị"
                  value={form.deviceTypeId?.toString()}
                  onChangeText={v => updateField('deviceType', v)}
                  placeholder="Loại thiết bị"
                  dropdown
                  data={deviceTypes}
                />
              </View>
              <View style={[styles.field, !isTablet && styles.fieldFullWidth]}>
                <FormField
                  label="Nhà sản xuất"
                  value={form.manufacturer}
                  onChangeText={v => updateField('manufacturer', v)}
                  placeholder="Nhà sản xuất"
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={[styles.field, !isTablet && styles.fieldFullWidth]}>
                <FormField
                  label="Model"
                  value={form.model}
                  onChangeText={v => updateField('model', v)}
                  placeholder="Model"
                />
              </View>
              <View style={[styles.field, !isTablet && styles.fieldFullWidth]}>
                <FormField
                  label="Số serial"
                  value={form.serialNumber}
                  onChangeText={v => updateField('serialNumber', v)}
                  placeholder="Số serial"
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={[styles.field, !isTablet && styles.fieldFullWidth]}>
                <FormField
                  label="Phiên bản firmware"
                  value={form.firmwareVersion}
                  onChangeText={v => updateField('firmwareVersion', v)}
                  placeholder="Firmware"
                />
              </View>
              <View style={[styles.field, !isTablet && styles.fieldFullWidth]}>
                {/* <FormField
                  label="Ngày lắp đặt"
                  value={form.installedAt}
                  onChangeText={v => updateField('installedAt', v)}
                  placeholder="DD/MM/YYYY"
                /> */}
                <DateTimeField
                  label="Ngày lắp đặt"
                  onChange={v => {
                    updateField('installedAt', v.toISOString());
                  }}
                  value={
                    form.installedAt ? new Date(form.installedAt) : undefined
                  }
                />
              </View>
            </View>
            {/* Status */}
            <View style={styles.statusContainer}>
              <Switch
                value={!!form.isActive}
                onValueChange={value => updateField('isActive', value)}
              />
              <Text style={styles.statusText}>Đang hoạt động</Text>
            </View>
          </ScrollView>
          {/* Footer */}
          <View style={styles.footer}>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Huỷ</Text>
            </Pressable>
            <Pressable style={styles.saveButton} onPress={() => onSave(form)}>
              <Text style={styles.saveText}>Lưu thay đổi</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContainer: {
    width: '95%',
    maxWidth: 1280,
    maxHeight: '92%',
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    overflow: 'hidden',
  },
  modalContainerMobile: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
    maxHeight: undefined,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingTop: 28,
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E293B',
  },
  closeButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContent: {
    paddingHorizontal: 32,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
    flexWrap: 'wrap',
  },
  field: {
    flex: 1,
    minWidth: 300,
  },
  fieldFullWidth: {
    width: '100%',
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 10,
  },
  required: {
    color: '#EF4444',
  },
  input: {
    height: 72,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 18,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 12,
  },
  statusText: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  cancelButton: {
    width: 120,
    height: 40,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    // fontSize: 18,
    // fontWeight: '700',
    color: '#475569',
  },
  saveButton: {
    width: 120,
    height: 40,
    borderRadius: 16,
    backgroundColor: '#4F5EF7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    // fontSize: 18,
    // fontWeight: '700',
    color: '#FFFFFF',
  },
});
