import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {saveUserData, getUserData} from '../services/storageService';
import ContinueButton from '../components/ContinueButton';
import ProgressBar from '../components/ProgressBar';
import AppLoadingScreen from '../components/AppLoadingScreen';

const {width, height} = Dimensions.get('window');

const scaleFont = (size: number) => {
  const scaleFactor = width / 375;
  return Math.round(size * Math.min(scaleFactor, 1.8));
};

const verticalScale = (size: number) => (size / 812) * height;
const moderateScale = (size: number, factor: number = 0.5): number =>
  size + (scaleFont(size) - size) * factor;

const INPUT_HEIGHT = verticalScale(50);
const BUTTON_PADDING = verticalScale(15);

type AgeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Age'>;

interface Props {
  navigation: AgeScreenNavigationProp;
}

const AgeScreen: React.FC<Props> = ({navigation}) => {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [existingData, setExistingData] = useState<Record<string, any>>({});

  const ageGroups = ['Under 18', '18-24', '25-34', '35-44', '45-54', '55+'];

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await getUserData();
        if (data) {
          setExistingData(data);
          if (data.age) setSelectedAge(data.age);
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleContinue = async () => {
    if (!selectedAge) return;
    try {
      setIsLoading(true);
      await saveUserData({...existingData, age: selectedAge});
      navigation.navigate('Gender');
    } catch (error) {
      console.error('Failed to save age:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <AppLoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <ProgressBar progress="20%" />

      <Text style={styles.subtitle}>Great, Let's make Mynd all about you!</Text>
      <Text style={styles.title}>
        How long have you been rocking this{' '}
        <Text style={styles.highlight}>World?</Text>
      </Text>

      <View style={styles.ageContainer}>
        {ageGroups.map(age => (
          <TouchableOpacity
            key={age}
            style={[
              styles.ageButton,
              selectedAge === age && styles.selectedAgeButton,
            ]}
            onPress={() => setSelectedAge(age)}>
            <Text
              style={[
                styles.ageText,
                selectedAge === age && styles.selectedAgeText,
              ]}>
              {age}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ContinueButton onPress={handleContinue} disabled={!selectedAge} />
    </View>
  );
};

export default AgeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subtitle: {
    fontSize: scaleFont(14),
    color: '#777',
    marginTop: verticalScale(30),
    textAlign: 'center',
    lineHeight: moderateScale(20),
    paddingTop: verticalScale(40),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: verticalScale(10),
    lineHeight: moderateScale(32),
  },
  highlight: {
    color: '#FFA07A',
    fontWeight: 'bold',
  },
  ageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: verticalScale(20),
    gap: verticalScale(8),
    paddingTop: verticalScale(40),
  },
  ageButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: verticalScale(12),
    paddingHorizontal: width * 0.06,
    borderRadius: moderateScale(30),
    minWidth: width * 0.35,
  },
  selectedAgeButton: {
    backgroundColor: '#FFA07A',
  },
  ageText: {
    fontSize: scaleFont(16),
    color: '#333',
    textAlign: 'center',
  },
  selectedAgeText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  continueButton: {
    width: '90%',
    borderRadius: INPUT_HEIGHT / 2,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: verticalScale(20),
    position: 'absolute',
    bottom: verticalScale(40),
  },
  disabledButton: {
    opacity: 0.5,
  },
  gradientButton: {
    paddingVertical: BUTTON_PADDING,
    alignItems: 'center',
    borderRadius: INPUT_HEIGHT / 2,
  },
  buttonText: {
    fontSize: scaleFont(18),
    color: '#FFF',
    fontWeight: 'bold',
  },
});
