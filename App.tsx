import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {AppDrawerContent} from './src/components/AppDrawerContent';
import {
  AppRoute,
  AppStackParamList,
  DrawerParamList,
  RootStackParamList,
} from './src/navigation/types';
import {AlertsScreen} from './src/screens/AlertsScreen';
import {HomeScreen} from './src/screens/HomeScreen';
import {LoginScreen} from './src/screens/LoginScreen';
import {PlaceholderScreen} from './src/screens/PlaceholderScreen';
import {palette} from './src/theme';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={palette.page} />
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Login" component={LoginRoute} />
        <RootStack.Screen name="MainDrawer" component={MainDrawerRoute} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

function LoginRoute({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Login'>) {
  return <LoginScreen onLogin={() => navigation.replace('MainDrawer')} />;
}

function MainDrawerRoute() {
  return (
    <Drawer.Navigator
      drawerContent={AppDrawerContent}
      screenOptions={{
        drawerStyle: {width: 304},
        headerShown: false,
        swipeEnabled: true,
      }}>
      <Drawer.Screen name="Dashboard" component={AppStackRoute} />
    </Drawer.Navigator>
  );
}

function AppStackRoute() {
  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
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
  return <PlaceholderScreen route="History" onBack={() => navigation.goBack()} />;
}

function DevicesRoute({
  navigation,
}: NativeStackScreenProps<AppStackParamList, 'Devices'>) {
  return <PlaceholderScreen route="Devices" onBack={() => navigation.goBack()} />;
}

function SettingsRoute({
  navigation,
}: NativeStackScreenProps<AppStackParamList, 'Settings'>) {
  return <PlaceholderScreen route="Settings" onBack={() => navigation.goBack()} />;
}

export default App;
