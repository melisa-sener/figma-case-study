// BottomSettingsScreen.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native';
import Slider from '@react-native-community/slider';

const aspectRatios = [
  { label: '1:1',  value: '1:1',  imageSource: require('../assets/images/1.1.png') },
  { label: '4:3',  value: '4:3',  imageSource: require('../assets/images/4.3.png') },
  { label: '3:4',  value: '3:4',  imageSource: require('../assets/images/3.4.png') },
  { label: '2:3',  value: '2:3',  imageSource: require('../assets/images/2.3.png') },
  { label: '3:2',  value: '3:2',  imageSource: require('../assets/images/3.2.png') },
  { label: '9:16', value: '9:16', imageSource: require('../assets/images/3.4.png') },
  { label: '16:9', value: '16:9', imageSource: require('../assets/images/3.2.png') },
  
];

const BottomSettingsScreen = () => {
  const [selectedRatio, setSelectedRatio] = useState('3:4');
  const [motionScore, setMotionScore] = useState(0.5);

  const renderRatioItem = ({ item }) => {
    const isSelected = selectedRatio === item.value;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.ratioBox, isSelected && styles.selectedBox]}
        onPress={() => setSelectedRatio(item.value)}
      >
        <Image source={item.imageSource} style={styles.ratioImage} resizeMode="contain" />
        <Text style={styles.ratioText}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Aspect Ratio */}
        <Text style={styles.title}>
          Aspect Ratio <Text style={styles.optional}>(Optional)</Text>
        </Text>
        <Text style={styles.subtitle}>
          You can specify the orientation of the video output.
        </Text>

        <FlatList
          data={aspectRatios}
          renderItem={renderRatioItem}
          keyExtractor={(item) => item.value}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.ratioList}
          contentContainerStyle={styles.ratioContainer}
          ListFooterComponent={<View style={{ width: 16 }} />}
        />

        {/* Motion Score */}
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
          onValueChange={setMotionScore}
        />

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BottomSettingsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#01030C',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginTop: 16,
  },
  optional: {
    color: '#DEE2E6',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  subtitle: {
    color: '#DEE2E6',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginTop: 4,
    marginBottom: 12,
  },
  ratioContainer: {
    paddingVertical: 6,
  },
  ratioList: {
    height: 48,
  },
  ratioBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00111C',
    borderRadius: 10,
    padding: 8,
    marginRight: 8,
  },
  selectedBox: {
    borderWidth: 1.5,
    borderColor: '#FF6D00',
    backgroundColor: 'rgba(255, 109, 0, 0.12)',
  },
  ratioImage: {
    width: 32,
    height: 22,
    marginRight: 8,
  },
  ratioText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  motionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  motionValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 24,
  },
  saveButton: {
    backgroundColor: '#FF6D00',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
});
