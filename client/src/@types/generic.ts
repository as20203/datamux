import { SetStateAction, Dispatch } from 'react';

export type ComponentHandler<T> = Dispatch<SetStateAction<T>>;
export type Color = 'success' | 'info' | 'warning' | 'error';
export interface Device {
  Deviceeui: string;
  Devicetype: string;
  Endpointtype: string;
  Endpointdest: string;
  InclRadio: boolean;
  RawData: boolean;
  AccessToken: string;
  Customer: string;
}
export interface DeviceEndpoint {
  endpointType: string;
  endPointDest: string;
}

export interface EditDevice {
  deviceUI: string;
  deviceType: string;
  AccessToken: string;
  endpoint: DeviceEndpoint[];
  InclRadio: boolean;
  RawData: boolean;
  customer: string;
}
