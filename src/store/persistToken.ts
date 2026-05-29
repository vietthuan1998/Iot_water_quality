import { createMMKV } from 'react-native-mmkv'

const storage = createMMKV()

export const saveToken = (token: string) => {
    storage.set('token', token)
}

export const getToken = () => {
    return storage.getString('token')
}

export const removeToken = () => {
    storage.remove('token')
}