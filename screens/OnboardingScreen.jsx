import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const videoSource = require('../assets/videos/onboarding.mp4');

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState(0);

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
    player.playbackRate = 1.0;
    player.staysActiveInBackground = false;
  });

  const handleNext = () => setStep(prev => prev + 1);

  const renderTitle = () => {
    if (step === 0) {
      return (
        <Text style={styles.title}>
          Turn Your Words{'\n'}into Stunning{'\n'}Videos!
        </Text>
      );
    } else if (step === 1) {
      return (
        <Text style={styles.title}>
          Turn Your Words{'\n'}into Stunning{'\n'}Videos! v2 text
        </Text>
      );
    } else {
      return (
        <Text style={styles.title}>
          Turn Your <Text style={styles.highlighted}>Words</Text>{'\n'}into Stunning{'\n'}
          Videos! v3 text
        </Text>
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar/> 

      <VideoView
        style={StyleSheet.absoluteFill}
        nativeControls={false}
        player={player}
        contentFit="cover"
        allowsFullscreen
      />

      <View style={styles.overlay}>
        <View style={styles.titleWrapper}>
          {renderTitle()}
        </View>

        <View style={styles.dotsContainer}>
          {[0, 1, 2].map((i) => (
            <View
              key={i}
              style={[styles.dot, step === i ? styles.activeDot : styles.inactiveDot]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={
            step < 2
              ? handleNext
              : () => navigation.navigate('Paywall', { isNavigateFromOnboarding: true })
          }
        >
          <Text style={styles.buttonText}>
            {step === 0 ? 'Get Started' : step === 1 ? 'Next' : 'Finished'}
          </Text>
          <Feather name="arrow-right" size={20} color="white" />
        </TouchableOpacity>

        <View style={styles.disclaimerWrapper}>
          {step === 0 && (
            <Text style={styles.disclaimer}>
              By tapping Get Started you indicate that you’ve read{'\n'}
              and agree to our <Text style={styles.link}>Privacy</Text> and{' '}
              <Text style={styles.link}>Terms of Service</Text>
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 60,
    paddingHorizontal: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  titleWrapper: {
    height: 150,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    textAlign: 'left',
  },
  highlighted: {
    color: '#FF0000',
    fontWeight: '500',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
  inactiveDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  button: {
    backgroundColor: '#FF6D00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginRight: 8,
    flex: 1,
    textAlign: 'center',
  },
  disclaimerWrapper: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disclaimer: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  link: {
    color: '#FF6D00',
    textDecorationLine: 'underline',
  },
});
