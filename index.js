/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import {
  getMessaging,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';

const app = getApp();
const messagingInstance = getMessaging(app);
setBackgroundMessageHandler(messagingInstance, async remoteMessage => {
  console.log('Background Message:', remoteMessage);

  // xử lý data message nếu cần
});
AppRegistry.registerComponent(appName, () => App);
