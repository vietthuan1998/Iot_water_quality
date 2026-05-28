import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { AppDrawerContent } from '../components/AppDrawerContent';
import { AlertsScreen } from '../screens/AlertsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { PlaceholderScreen } from '../screens/PlaceholderScreen';
import {
  AppRoute,
  AppStackParamList,
  DrawerParamList,
  RootStackParamList,
} from './types';
import { getToken, saveToken } from '../store/persistToken';
import { setToken } from '../store/authSlice';
import { store } from '../store';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

export function AppNavigation() {
  const [isReady, setIsReady] = useState(false);
  const [initialRoute, setInitialRoute] =
    useState<keyof RootStackParamList>('Login');

  useEffect(() => {
    const token = getToken();
    if (token) {
      store.dispatch(setToken(token));
      setInitialRoute('MainDrawer');
    }
    setIsReady(true);
  }, []);

  const handleLogin = () => {
    const token = 'demo-token';
    saveToken(token);
    store.dispatch(setToken(token));
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
  onLogin: () => void;
};

function LoginRoute({ navigation, onLogin }: LoginRouteProps) {
  return (
    <LoginScreen
      onLogin={() => {
        onLogin();
        navigation.replace('MainDrawer');
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
        swipeEnabled: true,
      }}
    >
      <Drawer.Screen name="Dashboard" component={AppStackRoute} />
    </Drawer.Navigator>
  );
}

function AppStackRoute() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Home" component={HomeRoute} />
      <AppStack.Screen name="Alerts" component={AlertsRoute} />
      <AppStack.Screen name="History" component={HistoryRoute} />
      <AppStack.Screen name="Devices" component={DevicesRoute} />
      <AppStack.Screen name="Settings" component={SettingsRoute} />
    </AppStack.Navigator>
  );
}

function HomeRoute({
  navigation,
}: NativeStackScreenProps<AppStackParamList, 'Home'>) {
  const navigate = (route: AppRoute) => navigation.navigate(route);

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
  return <AlertsScreen onBack={() => navigation.goBack()} />;
}

function HistoryRoute({
  navigation,
}: NativeStackScreenProps<AppStackParamList, 'History'>) {
  return (
    <PlaceholderScreen route="History" onBack={() => navigation.goBack()} />
  );
}

function DevicesRoute({
  navigation,
}: NativeStackScreenProps<AppStackParamList, 'Devices'>) {
  return (
    <PlaceholderScreen route="Devices" onBack={() => navigation.goBack()} />
  );
}

function SettingsRoute({
  navigation,
}: NativeStackScreenProps<AppStackParamList, 'Settings'>) {
  return (
    <PlaceholderScreen route="Settings" onBack={() => navigation.goBack()} />
  );
}
