import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useVideoPlayer, VideoView } from 'expo-video';

export default function ExploreCard({ video, prompt, heightRatio = 1.5, width, onPress }) {
  const player = useVideoPlayer(video, (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.card, { width, aspectRatio: 1 / heightRatio }]}
    >

      <View style={styles.roundedClip}>
        <VideoView
          player={player}
          nativeControls={false}
          contentFit="cover"
          style={styles.videoFill}
        />
      </View>

      <View style={styles.tryPromptTag}>
        <Ionicons name="sparkles-sharp" size={12} color="#FFFFFF" />
        <Text style={styles.tryPromptText}>Try Prompt</Text>
      </View>

      <View style={styles.overlay}>
        <Text style={styles.prompt} numberOfLines={3}>
          {prompt}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginTop: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  roundedClip: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
    overflow: 'hidden',
  },
  videoFill: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
  },
  prompt: {
    color: '#E9ECEF',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowRadius: 4,
  },
  tryPromptTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 3,
  },
  tryPromptText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    marginLeft: 4,
  },
});
