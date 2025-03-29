import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

interface ContinueButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

const ContinueButton: React.FC<ContinueButtonProps> = ({onPress, disabled}) => {
  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}>
      <LinearGradient colors={['#FF9A5A', '#FF78C4']} style={styles.gradient}>
        <Text style={styles.text}>Continue</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ContinueButton;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    borderRadius: height * 0.03,
    overflow: 'hidden',
    alignSelf: 'center',
    position: 'absolute',
    bottom: height * 0.05,
  },
  disabled: {
    opacity: 0.5,
  },
  gradient: {
    paddingVertical: height * 0.02,
    alignItems: 'center',
    borderRadius: height * 0.03,
  },
  text: {
    fontSize: width * 0.045,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
