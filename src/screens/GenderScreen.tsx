import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {saveUserData, getUserData} from '../services/storageService';
import Svg, {Path} from 'react-native-svg';
import ContinueButton from '../components/ContinueButton';
import ProgressBar from '../components/ProgressBar';

const {width, height} = Dimensions.get('window');

const scaleFont = (size: number) => {
  const scaleFactor = width / 375;
  return Math.round(size * Math.min(scaleFactor, 1.8));
};

const verticalScale = (size: number) => (size / 812) * height;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scaleFont(size) - size) * factor;

const OPTION_WIDTH = width * 0.9;
const INPUT_HEIGHT = verticalScale(50);
const BUTTON_PADDING = verticalScale(15);

type GenderScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Gender'
>;

interface Props {
  navigation: GenderScreenNavigationProp;
}

const GenderScreen: React.FC<Props> = ({navigation}) => {
  const [gender, setGender] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [existingData, setExistingData] = useState<Record<string, any>>({});

  useEffect(() => {
    const loadExistingData = async () => {
      try {
        const data = await getUserData();
        if (data) {
          setExistingData(data);
          if (data.gender) setGender(data.gender);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadExistingData();
  }, []);

  const handleContinue = async () => {
    if (!gender) return;

    try {
      setIsLoading(true);
      await saveUserData({...existingData, gender});
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error saving gender:', error);
      Alert.alert('Error', 'Failed to save gender selection');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF69B4" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProgressBar progress="10%" />

      <View style={styles.textContainer}>
        <Text style={styles.heading}>
          Choose the <Text style={styles.highlight}>identity</Text> that {'\n'}
          feels right for <Text style={styles.bold}> You?</Text>
        </Text>
        <Svg height="20" width="45" style={styles.curvedLine}>
          <Path
            d="M 45 10 C 18 -2 11 -1 8 5"
            stroke="#FF69B4"
            strokeWidth="3"
            fill="none"
          />
        </Svg>
      </View>

      <View style={styles.optionContainer}>
        {['Male', 'Female', 'Other'].map(item => (
          <TouchableOpacity
            key={item}
            style={[styles.option, gender === item && styles.selectedOption]}
            onPress={() => setGender(item)}>
            <Text
              style={[
                styles.optionText,
                gender === item && styles.selectedText,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ContinueButton onPress={handleContinue} disabled={!gender} />
    </View>
  );
};

export default GenderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: scaleFont(14),
    color: '#777',
    marginBottom: verticalScale(10),
    textAlign: 'center',
    lineHeight: moderateScale(20),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: verticalScale(20),
    lineHeight: moderateScale(32),
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 10,
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
  textWithCurve: {
    position: 'relative',
    alignItems: 'center',
  },
  optionContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  option: {
    width: OPTION_WIDTH,
    paddingVertical: verticalScale(15),
    backgroundColor: '#E0E0E0',
    borderRadius: moderateScale(30),
    alignItems: 'center',
    marginVertical: verticalScale(10),
  },
  selectedOption: {
    backgroundColor: '#FFA07A',
  },
  optionText: {
    fontSize: scaleFont(18),
    color: '#333',
  },
  selectedText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  continueButton: {
    width: '90%',
    borderRadius: INPUT_HEIGHT / 2,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: verticalScale(20),
    paddingVertical: verticalScale(15),
    marginTop: verticalScale(30),
    position: 'absolute',
    bottom: verticalScale(40),
  },
  gradientButton: {
    paddingVertical: BUTTON_PADDING,
    alignItems: 'center',
    borderRadius: INPUT_HEIGHT / 2,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: scaleFont(18),
    color: '#FFF',
    fontWeight: 'bold',
  },
});
