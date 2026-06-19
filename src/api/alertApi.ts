import { http } from './httpClient';

export async function getAllAler(param: any) {
  const res = await http.get('iotalert/get-all', param);
  return res.data;
}
