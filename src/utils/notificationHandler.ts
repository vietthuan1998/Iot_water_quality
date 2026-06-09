import { Navigate } from '../navigation/types';

export const handleNotification = (remoteMessage: any) => {
  const data = remoteMessage?.data;
  const onNavigate: Navigate = () => {};

  if (!data) {
    return;
  }

  switch (data.type) {
    case 'chat':
      onNavigate('Home', {
        roomId: data.roomId,
      });
      break;

    case 'order':
      onNavigate('Home', {
        orderId: data.orderId,
      });
      break;

    default:
      break;
  }
};
