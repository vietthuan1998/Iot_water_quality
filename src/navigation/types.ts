import type {NavigatorScreenParams} from '@react-navigation/native';

export type AppStackParamList = {
  Home: undefined;
  Alerts: undefined;
  History: undefined;
  Devices: undefined;
  Settings: undefined;
};

export type DrawerParamList = {
  Dashboard: NavigatorScreenParams<AppStackParamList>;
};

export type RootStackParamList = {
  Login: undefined;
  MainDrawer: undefined;
};

export type AppRoute = keyof AppStackParamList;

export type Navigate = (route: AppRoute) => void;
