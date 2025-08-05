import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Slider from '@react-native-community/slider';

const aspectRatios = [
  { label: '1:1', value: '1:1', imageSource: require('../assets/images/1.1.png') },
  { label: '4:3', value: '4:3', imageSource: require('../assets/images/4.3.png') },
  { label: '3:4', value: '3:4', imageSource: require('../assets/images/3.4.png') },
  { label: '2:3', value: '2:3', imageSource: require('../assets/images/2.3.png') },
  { label: '3:2', value: '3:2', imageSource: require('../assets/images/3.2.png') },
];

const BottomSettingsScreen = () => {
  const [selectedRatio, setSelectedRatio] = useState('3:4');
  const [motionScore, setMotionScore] = useState(0.5);

  return (
    <View style={styles.container}>
      {/* Aspect Ratio Section */}
      <Text style={styles.title}>
        Aspect Ratio <Text style={styles.optional}>(Optional)</Text>
      </Text>
      <Text style={styles.subtitle}>
        You can specify the orientation of the video output.
      </Text>

      <View style={styles.ratioContainer}>
        {aspectRatios.map((ratio) => {
          const isSelected = selectedRatio === ratio.value;
          return (
            <TouchableOpacity
              key={ratio.value}
              style={[styles.ratioBox, isSelected && styles.selectedBox]}
              onPress={() => setSelectedRatio(ratio.value)}
            >
              <Image source={ratio.imageSource} style={styles.ratioImage} resizeMode="contain" />
              <Text style={styles.ratioText}>{ratio.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Motion Score Section */}
      <View style={styles.motionHeader}>
        <Text style={styles.title}>
          Motion Score <Text style={styles.optional}>(Optional)</Text>
        </Text>
        <Text style={styles.motionValue}>{Math.round(motionScore * 10)}</Text>
      </View>
      <Text style={styles.subtitle}>
        Increase or decrease the intensity of motion in your video. Higher values result in more motion.
      </Text>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={motionScore}
        step={0.01}
        minimumTrackTintColor="#FF6D00"
        maximumTrackTintColor="#001A2C"
        thumbTintColor="#FF6D00"
        onValueChange={value => setMotionScore(value)}
      />

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomSettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01030C',
    padding: 20,
    paddingBottom: 32,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  optional: {
    color: '#DEE2E6',
    fontSize: 12,
    fontWeight: '400',
  },
  subtitle: {
    color: '#DEE2E6',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 4,
    marginBottom: 12,
  },
  ratioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratioBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00111C',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginRight: 4,
    marginBottom: 10,
  },
  selectedBox: {
    borderWidth: 1.5,
    borderColor: '#FF6D00',
    backgroundColor: 'rgba(255, 84, 0, 0.12)',
  },
  ratioImage: {
    marginRight: 4,
  },
  ratioText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  motionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  motionValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 24,
  },
  saveButton: {
    backgroundColor: '#FF6D00',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  saveText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 16,
  },
});
