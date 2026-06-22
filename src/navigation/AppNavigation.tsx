import React, { useCallback, useEffect, useState } from 'react';
import {
  createDrawerNavigator,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { AppDrawerContent } from '../components/AppDrawerContent';
import { BottomNav } from '../components/BottomNav';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { PlaceholderScreen } from '../screens/PlaceholderScreen';
import {
  AppRoute,
  AppStackParamList,
  DrawerParamList,
  MainTabRoute,
  RootStackParamList,
} from './types';
import { getToken, saveToken } from '../store/persistToken';
import { setRole, setToken, setUser } from '../store/authSlice';
import { store } from '../store';
import { DetailScreen } from '../screens/DetailScreen';
import DeviceManageScreen from '../screens/DeviceManageScreen';
import DeviceDetail from '../screens/DeviceDetail';
import { useWarningLevels } from '../context/WarningLevelContext';
import { login } from '../api/authApi';
import { jwtDecode } from 'jwt-decode';
// import { getFCMToken } from '../services/fcmService';
import {
  // getAPNSToken,
  getMessaging,
  onMessage,
  requestPermission,
} from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';
import AlertScreen2 from '../screens/AlertsScreen2';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

type JwtPayload = {
  sub?: string;
  username: string;
  exp?: number;
};

const app = getApp();
const messagingInstance = getMessaging(app);

export function AppNavigation() {
  const [isReady, setIsReady] = useState(false);
  const [initialRoute, setInitialRoute] =
    useState<keyof RootStackParamList>('Login');
  const { refreshWarningLevels, getAllThresholdValue } = useWarningLevels();

  const init = useCallback(async () => {
    const token = getToken();
    // console.log('token', getFCMToken());

    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);

      store.dispatch(setToken(token));
      store.dispatch(setUser(decoded));
      await refreshWarningLevels();
      await getAllThresholdValue();
      setInitialRoute('MainDrawer');
    }

    setIsReady(true);
  }, [refreshWarningLevels, getAllThresholdValue]);

  const initFCM = async () => {
    // Android 13+
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      console.log('Notification permission:', result);
    }
    // Xin quyền FCM
    await requestPermission(messagingInstance);
    // Lấy token
    // const token = await getAPNSToken(messagingInstance);
    // console.log('FCM TOKEN:', token);
    // Lắng nghe khi app đang mở
    onMessage(messagingInstance, async remoteMessage => {
      console.log('Foreground:', remoteMessage);
    });
  };

  useEffect(() => {
    init();
    initFCM();
  }, [init]);

  const handleLogin = async (username: string, password: string) => {
    try {
      const token = await login(username, password);
      const decoded = jwtDecode<JwtPayload>(token);

      saveToken(token);
      store.dispatch(setToken(token));
      store.dispatch(setUser(decoded));
      store.dispatch(setRole('Admin'));
      // console.log('token', getFCMToken());
      await refreshWarningLevels();
      await getAllThresholdValue();

      return true;
    } catch (err: any) {
      Alert.alert('Đăng nhập thất bại', err.message || 'Vui lòng thử lại');
      return false;
    }
  };

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen name="Login">
          {props => <LoginRoute {...props} onLogin={handleLogin} />}
        </RootStack.Screen>
        <RootStack.Screen name="MainDrawer" component={MainDrawerRoute} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

type LoginRouteProps = NativeStackScreenProps<RootStackParamList, 'Login'> & {
  onLogin: (username: string, password: string) => Promise<boolean>;
};

function LoginRoute({ navigation, onLogin }: LoginRouteProps) {
  return (
    <LoginScreen
      onLogin={async (username: string, password: string) => {
        const isLoggedIn = await onLogin(username, password);
        if (isLoggedIn) {
          navigation.replace('MainDrawer');
        }
      }}
    />
  );
}

function MainDrawerRoute() {
  return (
    <Drawer.Navigator
      drawerContent={AppDrawerContent}
      screenOptions={{
        drawerStyle: { width: 304 },
        headerShown: false,
        swipeEnabled: false,
      }}
    >
      <Drawer.Screen name="Dashboard" component={AppStackRoute} />
    </Drawer.Navigator>
  );
}

function AppStackRoute({
  navigation,
}: DrawerScreenProps<DrawerParamList, 'Dashboard'>) {
  const [activeRoute, setActiveRoute] = useState<AppRoute>('Home');

  const navigate = (route: AppRoute, params?: any) => {
    navigation.navigate('Dashboard', { screen: route, params });
  };

  const isMainTabRoute = (route: AppRoute): route is MainTabRoute =>
    route !== 'Detail';

  return (
    <View style={styles.appStackShell}>
      <AppStack.Navigator
        screenOptions={{ headerShown: false }}
        screenListeners={{
          state: event => {
            const state = event.data.state;
            const route = state.routes[state.index]?.name as AppRoute;
            setActiveRoute(route);
          },
        }}
      >
        <AppStack.Screen name="Home" component={HomeRoute} />
        <AppStack.Screen name="Alerts" component={AlertsRoute} />
        <AppStack.Screen name="History" component={HistoryRoute} />
        <AppStack.Screen name="Devices" component={DevicesRoute} />
        <AppStack.Screen name="Settings" component={SettingsRoute} />
        {/* <AppStack.Screen name="Settings" component={AlertScreen2} /> */}
        <AppStack.Screen name="Detail" component={DetailRoute} />
        <AppStack.Screen name="DeviceDetail" component={DeviceDetailRoute} />
      </AppStack.Navigator>
      {isMainTabRoute(activeRoute) ? (
        <BottomNav activeRoute={activeRoute} onNavigate={navigate} />
      ) : null}
    </View>
  );
}

function HomeRoute({
  navigation,
}: NativeStackScreenProps<AppStackParamList, 'Home'>) {
  const navigate = (route: AppRoute, params?: any) =>
    navigation.navigate(route as any, params);

  return (
    <HomeScreen
      onNavigate={navigate}
      onOpenAlerts={() => navigation.navigate('Alerts')}
      onOpenDrawer={() => navigation.dispatch(DrawerActions.openDrawer())}
    />
  );
}

function AlertsRoute({
  navigation,
}: NativeStackScreenProps<AppStackParamList, 'Alerts'>) {
  return <AlertScreen2 onBack={() => navigation.goBack()} />;
}

function HistoryRoute({
  navigation,
}: NativeStackScreenProps<AppStackParamList, 'History'>) {
  return <DetailScreen onBack={() => navigation.goBack()} />;
}

function DevicesRoute({
  navigation,
}: NativeStackScreenProps<AppStackParamList, 'Devices'>) {
  const navigate = (route: AppRoute, params?: any) =>
    navigation.navigate(route as any, params);
  return (
    <DeviceManageScreen
      onBack={() => navigation.goBack()}
      onNavigate={navigate}
    />
  );
}

function SettingsRoute({
  navigation,
}: NativeStackScreenProps<AppStackParamList, 'Settings'>) {
  return (
    <PlaceholderScreen route="Settings" onBack={() => navigation.goBack()} />
  );
}

function DetailRoute({
  navigation,
  route,
}: NativeStackScreenProps<AppStackParamList, 'Detail'>) {
  return (
    <DetailScreen
      onBack={() => navigation.goBack()}
      metricId={route.params.metricId}
    />
  );
}

function DeviceDetailRoute({
  navigation,
  route,
}: NativeStackScreenProps<AppStackParamList, 'DeviceDetail'>) {
  return (
    <DeviceDetail onBack={() => navigation.goBack()} data={route.params.data} />
  );
}

const styles = StyleSheet.create({
  appStackShell: {
    flex: 1,
  },
});
