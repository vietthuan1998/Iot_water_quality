import { http } from './httpClient';

export async function getChartsData(
  deviceId?: number,
  parameterId?: number,
  fromTime?: string,
  toTime?: string,
) {
  const body: any = {};
  body.toTime = toTime ? toTime : new Date().toISOString();
  body.fromTime = fromTime
    ? fromTime
    : new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  if (parameterId) {
    body.parameterId = parameterId;
  }
  if (deviceId) {
    body.deviceId = deviceId;
  }
  const res = await http.get('api/iotobservation/chart-data', { params: body });
  return res.data;
}

// export async function getNewAllDevices() {
