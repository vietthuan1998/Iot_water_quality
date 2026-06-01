import { http } from './httpClient';

export interface ChartDataPoint {
  value: number;
  timestamp: string;
}
export interface ChartParams {
  deviceId?: number;
  parameterId?: number;
  fromTime?: string;
  toTime?: string;
}
export async function getChartsData(param: ChartParams) {
  const body: ChartParams = {};
  body.toTime = param.toTime ? param.toTime : new Date().toISOString();
  body.fromTime = param.fromTime
    ? param.fromTime
    : new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString();

  if (param.parameterId) {
    body.parameterId = param.parameterId;
  }
  if (param.deviceId) {
    body.deviceId = param.deviceId;
  }
  const res = await http.get('api/iotobservation/chart-data', { params: body });
  return res.data;
}

export async function getAlertLevel() {
  const res = await http.get('dmalertlevel/get-all');
  return res.data;
}
