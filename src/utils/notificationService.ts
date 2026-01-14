import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission().then((res) => console.log("response from request permission :", res)).catch((res) => console.log("error from request permission : ", res));
    const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
    console.log('Authorization status:', authStatus);
    }
}

export async function getToken() {
    const token = await messaging().getToken()
}

