import { http } from './httpClient';

export const registerFcmToken = async (userId: number, token: string) => {
  try {
    // const res = await http.post('https://api.example.com/device-token', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     userId,
    //     fcmToken: token,
    //   }),
    // });
    // console.log(res);
    console.log({ userId, token });
  } catch (error) {
    console.log(error);
  }
};
