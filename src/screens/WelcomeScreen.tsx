import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {signInWithGoogle} from '../services/authService';
import GradientText from '../components/GradientText';
import ProgressBar from '../components/ProgressBar';

const {width, height} = Dimensions.get('window');

const scaleFontSize = (size: number) => size * (width / 375);

type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<Props> = ({navigation}) => {
  const handleGoogleLogin = async () => {
    const user = await signInWithGoogle();
    if (user) {
      console.log('User logged in:', user);
      console.log('Navigating to Name Screen...');
      navigation.navigate('Name', {user});
    } else {
      console.error('User sign-in failed. User is null.');
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <ProgressBar progress="10%" />
        <View style={styles.textContainer}>
          <GradientText style={styles.title} boldText="Mindful Journey">
            Begin Your {'\n'}
          </GradientText>
          <Text style={styles.subtitle}>
            Log In Or Sign Up To Begin Your Journey With Personalized,
            Human-Like Wellness Support
          </Text>
        </View>
      </View>

      <LinearGradient
        colors={['#FF9A5A', '#FF78C4']}
        style={styles.containerSocial}>
        <View style={styles.pagination}>
          <View style={styles.activeDot} />
          <View style={styles.inactiveDot} />
          <View style={styles.inactiveDot} />
        </View>

        <TouchableOpacity style={[styles.button, styles.appleButton]}>
          <Image
            source={require('../assets/apple-logo.png')}
            style={styles.icon}
          />
          <Text style={styles.appleButtonText}>Continue With Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.googleButton]}
          onPress={handleGoogleLogin}>
          <Image
            source={require('../assets/google-logo.png')}
            style={styles.icon}
          />
          <Text style={styles.googleButtonText}>Continue With Google</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.divider} />
        </View>

        <Text style={styles.termsText}>
          I agree to <Text style={styles.linkText}>Privacy Policy</Text> &{' '}
          <Text style={styles.linkText}>Terms of Service</Text>
        </Text>
      </LinearGradient>
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
  textContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  title: {
    fontSize: scaleFontSize(44),
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    textAlign: 'center',
    color: '#333',
    fontSize: scaleFontSize(14),
    marginTop: height * 0.015,
    paddingHorizontal: '5%',
  },
  containerSocial: {
    alignItems: 'center',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: height * 0.04,
    paddingHorizontal: '5%',
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: height * 0.025,
    borderColor: '#EAEAEA',
    borderWidth: 1,
    borderRadius: 20,
    padding: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeDot: {
    width: width * 0.02,
    height: width * 0.02,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: width * 0.015,
    marginHorizontal: width * 0.01,
  },
  inactiveDot: {
    width: width * 0.02,
    height: width * 0.02,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: width * 0.0125,
    marginHorizontal: width * 0.01,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    padding: height * 0.02,
    borderRadius: 30,
    justifyContent: 'center',
    marginVertical: height * 0.015,
  },
  appleButton: {
    backgroundColor: '#000',
  },
  googleButton: {
    backgroundColor: '#fff',
  },
  appleButtonText: {
    color: '#fff',
    fontSize: scaleFontSize(16),
    fontWeight: '500',
    marginLeft: width * 0.02,
  },
  googleButtonText: {
    color: '#333',
    fontSize: scaleFontSize(16),
    fontWeight: '500',
    marginLeft: width * 0.02,
  },
  icon: {
    width: width * 0.06,
    height: width * 0.06,
    resizeMode: 'contain',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.02,
    width: '90%',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#fff',
  },
  orText: {
    marginHorizontal: width * 0.025,
    fontSize: scaleFontSize(14),
    color: '#fff',
  },
  termsText: {
    fontSize: scaleFontSize(12),
    textAlign: 'center',
    marginTop: height * 0.015,
    color: '#fff',
  },
  linkText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default WelcomeScreen;
