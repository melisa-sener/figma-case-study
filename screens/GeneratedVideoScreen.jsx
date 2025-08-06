import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import { useVideoPlayer, VideoView } from 'expo-video';

export default function GeneratedVideoScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const { prompt = '', selectedStyle = '' } = route.params || {};
  const [watermarkEnabled, setWatermarkEnabled] = useState(true);

  const player = useVideoPlayer(require('../assets/videos/prompt1.mp4'), (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={{ paddingBottom: 10 }} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="#FFFFFF" />
      </TouchableOpacity> 

      {/* Video */}
      <View style={styles.videoWrapper}>
        <VideoView 
          player={player} 
          style={styles.video} 
          contentFit="cover" 
          nativeControls={false}
        />
        {watermarkEnabled && (
          <Text style={styles.watermarkText}>Video AI</Text>
        )}
      </View>

      {/* Prompt */}
      <View style={styles.promptBox}>
        <Text style={styles.promptText}>{prompt}</Text>
      </View>

      {/* Watermark toggle */}
      <View style={styles.watermarkRow}>
        <Text style={styles.watermarkLabel}>Watermark</Text>
        <Switch
          value={watermarkEnabled}
          onValueChange={setWatermarkEnabled}
          trackColor={{ false: '#444', true: '#FF6D00' }}
          thumbColor={'#FFFFFF'}
        />
      </View>

      {/* Bottom Action Bar */}
      <View style={styles.footer}>
        <ActionButton icon="refresh-cw" label="Regenerate" onPress={() => {}} />
        <ActionButton icon="download" label="Save" onPress={() => {}} />
        <ActionButton icon="trash-2" label="Delete" onPress={() => {}} />
        <ActionButton icon="share" label="Share" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}

function ActionButton({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <View style={styles.iconWrapper}>
        <Feather name={icon} size={22} color="#FFFFFF" />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0F',
    padding: 12,
  }, 
  videoWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 400,
    marginBottom: 12,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  watermarkText: {
    position: 'absolute',
    top: 12,
    left: 16,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },  
  promptBox: {
    backgroundColor: '#00111C',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  promptText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  watermarkRow: {
    backgroundColor: '#00111C',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  watermarkLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 40,
  },
  actionButton: {
    alignItems: 'center',
    gap: 8,
  },
  iconWrapper: {
    backgroundColor: '#00111C',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    marginTop: 6,
  },
});