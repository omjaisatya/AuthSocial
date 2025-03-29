import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/AppNavigator';
import {getUserData, UserData} from '../services/storageService';
import Svg, {Path} from 'react-native-svg';
import ContinueButton from '../components/ContinueButton';
import ProgressBar from '../components/ProgressBar';

const {width, height} = Dimensions.get('window');

const scaleFont = (size: number) => {
  const scaleFactor = width / 375;
  return Math.round(size * Math.min(scaleFactor, 1.5));
};

const verticalScale = (size: number) => {
  const scaleFactor = height / 812;
  return Math.round(size * scaleFactor);
};

const INPUT_HEIGHT = verticalScale(50);
const BUTTON_PADDING = verticalScale(15);
const PROGRESS_HEIGHT = verticalScale(4);

type NameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Name'>;
type NameScreenRouteProp = RouteProp<RootStackParamList, 'Name'>;

interface Props {
  navigation: NameScreenNavigationProp;
  route: NameScreenRouteProp;
}

const NameScreen: React.FC<Props> = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [storedUser, setStoredUser] = useState<UserData | null>(null);

  const routeUser = route.params?.user;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        setStoredUser(userData);
        setName(routeUser?.name || userData?.name || '');
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [routeUser]);

  const handleContinue = () => {
    if (name.trim().length > 0) {
      navigation.navigate('Age', {user: {...storedUser, name}});
    }
  };

  if (isLoading) {
    return (
      <LinearGradient colors={['#FFFFFF', '#FDF2EB']} style={styles.container}>
        <ActivityIndicator size="large" color="#FF9A5A" />
      </LinearGradient>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <ProgressBar progress="10%" />

        <View style={styles.contentContainer}>
          <Text style={styles.subHeading}>Let’s get to know each other</Text>
          <Text style={styles.heading}>
            <Text style={styles.highlight}>What</Text> Should We Call{' '}
            <Text style={styles.bold}>You?</Text>
            <Svg height="20" width="45" style={styles.curvedLine}>
              <Path
                d="M 45 10 C 18 -2 11 -1 8 5"
                stroke="#FF69B4"
                strokeWidth="3"
                fill="none"
              />
            </Svg>
          </Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Edit your name"
            editable={false}
          />
        </View>
      </View>
      <ContinueButton onPress={handleContinue} disabled={!name.trim()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    marginBottom: verticalScale(80),
  },
  subHeading: {
    fontSize: scaleFont(14),
    color: '#777',
    textAlign: 'center',
  },
  heading: {
    fontSize: scaleFont(28),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: verticalScale(30),
  },
  highlight: {
    color: '#FF9A5A',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
    position: 'relative',
  },
  curvedLine: {
    position: 'absolute',
    top: verticalScale(80),
    right: '10%',
    zIndex: 1,
    color: '#FF9A5A',
  },
  input: {
    width: '90%',
    height: INPUT_HEIGHT,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: INPUT_HEIGHT / 2,
    paddingHorizontal: width * 0.05,
    fontSize: scaleFont(16),
    color: '#333',
    backgroundColor: '#F9F9F9',
    marginBottom: verticalScale(40),
  },
  button: {
    width: '90%',
    borderRadius: INPUT_HEIGHT / 2,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: verticalScale(20),
  },
  gradientButton: {
    paddingVertical: BUTTON_PADDING,
    alignItems: 'center',
    borderRadius: INPUT_HEIGHT / 2,
  },
  buttonText: {
    color: '#FFF',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },
});

export default NameScreen;
