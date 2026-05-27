import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {owner, waterArea} from '../../db/mockData';
import {palette} from '../theme';

type LoginScreenProps = {
  onLogin: () => void;
};

export function LoginScreen({onLogin}: LoginScreenProps) {
  const [email, setEmail] = useState('an.nguyen@aquaguard.vn');
  const [password, setPassword] = useState('demo1234');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screen}>
      <View style={styles.brandMark}>
        <Text style={styles.brandIcon}>≈</Text>
      </View>
      <Text style={styles.title}>AquaGuard IoT</Text>
      <Text style={styles.subtitle}>
        Đăng nhập để theo dõi {waterArea.name} và nhận cảnh báo chất lượng nước.
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#9aa1b3"
          style={styles.input}
          value={email}
        />
        <Text style={styles.label}>Mật khẩu</Text>
        <TextInput
          onChangeText={setPassword}
          placeholder="Mật khẩu"
          placeholderTextColor="#9aa1b3"
          secureTextEntry
          style={styles.input}
          value={password}
        />
        <Pressable
          accessibilityRole="button"
          disabled={!email || !password}
          onPress={onLogin}
          style={({pressed}) => [
            styles.loginButton,
            pressed && styles.pressed,
            (!email || !password) && styles.disabledButton,
          ]}>
          <Text style={styles.loginButtonText}>Đăng nhập</Text>
        </Pressable>
      </View>

      <View style={styles.demoBox}>
        <Text style={styles.demoTitle}>Tài khoản demo</Text>
        <Text style={styles.demoText}>
          {owner.name} · {owner.role}
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.page,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  brandMark: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: palette.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  brandIcon: {
    color: '#fff',
    fontSize: 42,
    fontWeight: '900',
  },
  title: {
    color: palette.ink,
    fontSize: 31,
    fontWeight: '900',
  },
  subtitle: {
    color: palette.muted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 28,
  },
  form: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: '#fff',
    padding: 18,
  },
  label: {
    color: palette.ink,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 8,
  },
  input: {
    minHeight: 50,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#e5e9f1',
    color: palette.ink,
    fontSize: 15,
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  loginButton: {
    minHeight: 52,
    borderRadius: 7,
    backgroundColor: palette.red,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  disabledButton: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.82,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '900',
  },
  demoBox: {
    marginTop: 18,
    borderRadius: 8,
    backgroundColor: '#edf6ff',
    padding: 14,
  },
  demoTitle: {
    color: palette.ink,
    fontSize: 13,
    fontWeight: '900',
  },
  demoText: {
    color: '#5d6479',
    fontSize: 13,
    marginTop: 5,
  },
});
