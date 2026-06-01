import axios from 'axios';
import { API_BASE_URL, TIMEOUT } from '../constants/url';
import { getToken } from '../store/persistToken';

export const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
});

http.interceptors.request.use(async config => {
  const token = await getToken();
  console.log('Data:', JSON.stringify(config.params, null, 2));
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  res => res,
  error => {
    const msg =
      error?.response?.data?.message ||
      error?.message ||
      'Lỗi không xác định khi gọi API';
    return Promise.reject(new Error(msg));
  },
);
