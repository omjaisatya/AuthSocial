import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  clearUserData,
  getUserData,
  saveUserData,
  UserData,
} from './storageService';

GoogleSignin.configure({
  webClientId:
    '3491342404-slr0osibrgd265hok5ch2okcmqv6dj0u.apps.googleusercontent.com',
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

export const signInWithGoogle = async (): Promise<UserData | null> => {
  try {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    const userInfo = await GoogleSignin.signIn();

    const idToken = userInfo.data?.idToken;
    if (!idToken) {
      throw new Error('ID Token is undefined or null');
    }

    const credential = auth.GoogleAuthProvider.credential(idToken);
    const userCredential = await auth().signInWithCredential(credential);

    // firebase sign
    const userData: UserData = {
      name: userCredential.user.displayName || 'Unknown',
      email: userCredential.user.email || '',
      photo: userCredential.user.photoURL || '',
    };

    // google sign
    // const userData: UserData = {
    //   name: userInfo.data?.user.name || '',
    //   email: userInfo.data?.user.email || '',
    //   photo: userInfo.data?.user.photo || '',
    // };

    await saveUserData(userData);
    return userData;
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);

    if (error.code) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          console.log('User cancelled login');
          break;
        case statusCodes.IN_PROGRESS:
          console.log('Sign-in already in progress');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.log('Play Services not available');
          break;
        default:
          console.log('Unknown error:', error);
      }
    }
    return null;
  }
};

export const signOutFromGoogle = async (): Promise<void> => {
  try {
    await auth().signOut();
    await GoogleSignin.signOut();
    await clearUserData();
    console.log('User signed out and data cleared');
  } catch (error) {
    console.error('Google Sign-Out Error:', error);
    throw error;
  }
};

export const isSignedIn = async (): Promise<boolean> => {
  try {
    const isSignedIns = await GoogleSignin.signIn();
    const userData = await getUserData();
    return isSignedIns && userData !== null;
  } catch (error) {
    console.error('Error checking sign-in status:', error);
    return false;
  }
};
