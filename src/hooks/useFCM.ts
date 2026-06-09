import { useEffect } from 'react';

import {
  getFCMToken,
  getInitialNotification,
  listenForegroundMessage,
  onNotificationOpened,
  requestNotificationPermission,
} from '../services/fcmService';

import { registerFcmToken } from '../api/notificationApi';
import { handleNotification } from '../utils/notificationHandler';

export const useFCM = (userId?: number) => {
  useEffect(() => {
    const setupFCM = async () => {
      const granted = await requestNotificationPermission();

      if (!granted) {
        return;
      }

      const token = await getFCMToken();

      if (token && userId) {
        await registerFcmToken(userId, token);
      }

      const initialNotification = await getInitialNotification();

      if (initialNotification) {
        handleNotification(initialNotification);
      }
    };

    setupFCM();

    const unsubscribeForeground = listenForegroundMessage(
      (remoteMessage: any) => {
        console.log(remoteMessage);
      },
    );

    const unsubscribeOpened = onNotificationOpened((remoteMessage: any) => {
      handleNotification(remoteMessage);
    });

    return () => {
      unsubscribeForeground();
      unsubscribeOpened();
    };
  }, [userId]);
};
