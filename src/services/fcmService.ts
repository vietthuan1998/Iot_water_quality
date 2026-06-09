import { getApp } from '@react-native-firebase/app';
import messaging, {
  getMessaging,
  getToken,
} from '@react-native-firebase/messaging';
const app = getApp();
const messagingInstance = getMessaging(app);
export const requestNotificationPermission = async () => {
  const authStatus = await messaging().requestPermission();

  return (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  );
};

export const getFCMToken = async () => {
  try {
    const token = await getToken(messagingInstance);

    console.log('FCM TOKEN:', token);

    return token;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const listenForegroundMessage = (callback: any) => {
  return messaging().onMessage(callback);
};

export const onNotificationOpened = (callback: any) => {
  return messaging().onNotificationOpenedApp(callback);
};

export const getInitialNotification = async () => {
  return await messaging().getInitialNotification();
};
