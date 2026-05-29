import { http } from './httpClient';

export type getAllSensorsParams = {
  // id thiet bi
  deviceId?: number;
  // id loai chi so
  parameterId?: number;
  fromTime?: number;
  toTime?: number;
  page?: number;
  pageSize?: number;
};

export async function getNewSensorsValue(params: getAllSensorsParams) {
  const body: any = {
    pageSize: params.pageSize || 2,
    page: params.page || 1,
  };
  if (params.parameterId) {
    body.parameterId = params.parameterId;
  }
  if (params.deviceId) {
    body.deviceId = params.deviceId;
  }
  const res = await http.get('api/iotobservation/get-all', { params: body });
  return res.data;
}

// export async function getNewAllDevices() {
