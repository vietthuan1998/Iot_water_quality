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

export async function getSensorsValue(params: getAllSensorsParams) {
  const body: any = {
    pageSize: params.pageSize || 20,
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

export async function getAllIotDevices(params: {
  page?: number;
  pageSize?: number;
}) {
  const body: any = {
    pageSize: params.pageSize || 20,
    page: params.page || 1,
  };
  const res = await http.get('iotdevice/get-all', { params: body });
  return res.data;
}

export async function getThresholdValue(params: {
  deviceId?: number;
  deviceTypeId?: number;
  page?: number;
  pageSize?: number;
}) {
  const body: any = {
    pageSize: params.pageSize || 20,
    page: params.page || 1,
  };
  if (params.deviceId) {
    body.deviceId = params.deviceId;
  }
  if (params.deviceTypeId) {
    body.deviceTypeId = params.deviceTypeId;
  }
  const res = await http.get('iotparameterthreshold/get-all', { params: body });
  return res.data;
}
