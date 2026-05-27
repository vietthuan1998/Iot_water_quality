import { createMMKV } from 'react-native-mmkv'

const storage = createMMKV()

export const saveToken = (token: string) => {
  try {
    storage.set('token', token)
  } catch {}
}

export const getToken = () => {
  try {
    return storage.getString('token')
  } catch {
    return null
  }
}

export const removeToken = () => {
  try {
    storage.remove('token')
  } catch {}
}