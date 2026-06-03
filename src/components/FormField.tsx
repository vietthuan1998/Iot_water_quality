import React from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
} from 'react-native';
import Dropdown from './Dropdown';

type FormFieldProps = TextInputProps & {
  label: string;
  required?: boolean;
  disabled?: boolean;
  dropdown?: boolean;
  data?: any[];
  onChangeText: (text: string) => void;
};

export default function FormField({
  label,
  required,
  disabled,
  dropdown,
  data,
  onChangeText,
  ...inputProps
}: FormFieldProps) {
  return (
    <View>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>

      {dropdown ? (
        <Dropdown
          {...inputProps}
          data={data || []}
          value={Number(inputProps.value) || 0}
          setValue={onChangeText}
        />
      ) : (
        <TextInput
          {...inputProps}
          style={[
            styles.input,
            disabled && styles.inputDisabled,
            inputProps.style,
          ]}
          onChangeText={onChangeText}
          placeholderTextColor="#94A3B8"
          editable={!disabled}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontWeight: '700',
    color: '#334155',
    marginBottom: 10,
  },
  required: {
    color: '#EF4444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 16,
    paddingHorizontal: 20,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },
  inputDisabled: {
    backgroundColor: '#F8FAFC',
    color: '#94A3B8',
    borderColor: '#E2E8F0',
  },
});
