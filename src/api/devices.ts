import { http } from './httpClient';

export async function getAllDeviceTypes(page: number, pageSize: number) {
  const params: any = {
    pageSize: pageSize || 20,
    page: page || 1,
  };

  const res = await http.get('dmdevicetype/get-all', { params });
  return res.data;
}

export async function UpdateDevice(id: number, data: any) {
  const res = await http.post('/iotdevice/update/' + id, data);
  return res.data;
}
