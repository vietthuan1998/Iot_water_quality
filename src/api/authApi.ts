import { http } from './httpClient';

export type LoginResponse = {
  code: number;
  message: string;
  data?: { token: string };
};

export async function login(username: string, password: string) {
  const res = await http.post<LoginResponse>('auth/userlogin', {
    username,
    password,
  });
  if (res.data.code !== 0 || !res.data.data?.token) {
    throw new Error(res.data.message || 'Đăng nhập thất bại');
  }
  return res.data.data.token;
}
export async function getUserRole() {
  const res = await http.get('auth/get-user-role');
  return res.data;
}
export async function getRoles() {
  const res = await http.get('auth/roles');
  return res.data;
}
