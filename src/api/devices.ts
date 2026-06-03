import { http } from './httpClient';

export async function getAllDeviceTypes(page: number, pageSize: number) {
  const params: any = {
    pageSize: pageSize || 20,
    page: page || 1,
  };

  const res = await http.get('dmdevicetype/get-all', { params });
  return res.data;
}
