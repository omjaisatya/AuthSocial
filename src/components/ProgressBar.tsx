import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {height} = Dimensions.get('window');

const verticalScale = (size: number) => Math.round(size * (height / 812));

const PROGRESS_HEIGHT = verticalScale(4);

const ProgressBar = ({progress = '20%'}) => {
  return (
    <View style={styles.progressBar}>
      <LinearGradient
        colors={['#FFA07A', '#FF69B4']}
        style={[styles.progressFill, {width: progress}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    marginBottom: 40,
    width: '90%',
    height: PROGRESS_HEIGHT,
    backgroundColor: '#EAEAEA',
    borderRadius: PROGRESS_HEIGHT / 2,
    alignSelf: 'center',
    marginTop: verticalScale(90),
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
});

export default ProgressBar;
