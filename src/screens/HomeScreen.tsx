import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import {getUserData, clearUserData, UserData} from '../services/storageService';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import AppLoadingScreen from '../components/AppLoadingScreen';

const {width, height} = Dimensions.get('window');

const scaleSize = (size: number) => (size / 375) * width;
const scaleFont = (size: number) => Math.round(size * (width / 375));
const verticalScale = (size: number) => (size / 812) * height;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scaleFont(size) - size) * factor;

const PROFILE_IMAGE_SIZE = moderateScale(100);
const BUTTON_PADDING = verticalScale(15);
const CONTAINER_PADDING = width * 0.05;

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
      } catch (error) {
        console.error('Error loading user data:', error);
        Alert.alert('Error', 'Failed to load user data');
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await clearUserData();
      await GoogleSignin.signOut();
      navigation.reset({index: 0, routes: [{name: 'Welcome'}]});
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to logout');
    }
  };

  const confirmLogout = () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Logout', onPress: handleLogout},
    ]);
  };

  if (loading) {
    return <AppLoadingScreen />;
  }

  return (
    <View style={styles.container}>
      {userData?.photo ? (
        <Image source={{uri: userData.photo}} style={styles.profileImage} />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}

      <Text style={styles.title}>{userData?.name || 'Undefined User'}</Text>
      <Text style={styles.email}>{userData?.email || 'N/A'}</Text>
      <Text style={styles.provider}>
        Logged in with: {userData?.provider || 'Unknown'}
      </Text>

      <Text style={styles.text}>Age: {userData?.age || 'N/A'}</Text>
      <Text style={styles.text}>Gender: {userData?.gender || 'N/A'}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: CONTAINER_PADDING,
    paddingTop: verticalScale(40),
    alignItems: 'center',
  },
  profileImage: {
    width: PROFILE_IMAGE_SIZE,
    height: PROFILE_IMAGE_SIZE,
    borderRadius: PROFILE_IMAGE_SIZE / 2,
    marginBottom: verticalScale(15),
  },
  placeholderImage: {
    width: PROFILE_IMAGE_SIZE,
    height: PROFILE_IMAGE_SIZE,
    borderRadius: PROFILE_IMAGE_SIZE / 2,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(15),
  },
  placeholderText: {
    color: '#888',
    fontSize: scaleFont(14),
  },
  title: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
    textAlign: 'center',
    color: '#2D3436',
  },
  email: {
    fontSize: scaleFont(16),
    color: '#636E72',
    marginBottom: verticalScale(10),
    textAlign: 'center',
  },
  provider: {
    fontSize: scaleFont(14),
    color: '#888',
    marginBottom: verticalScale(10),
  },
  text: {
    fontSize: scaleFont(18),
    marginBottom: verticalScale(5),
    color: '#636E72',
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: verticalScale(20),
    backgroundColor: '#d9534f',
    paddingVertical: BUTTON_PADDING,
    paddingHorizontal: scaleSize(50),
    borderRadius: moderateScale(8),
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: scaleFont(16),
    fontWeight: '600',
  },
});
