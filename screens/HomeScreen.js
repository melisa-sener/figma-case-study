import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useVideoPlayer, VideoView } from 'expo-video';

const styleOptions = [
  {
    id: '1',
    label: '35 mm',
    video: require('../assets/videos/35mm.mp4'),
  },
  {
    id: '2',
    label: '3D Render',
    video: require('../assets/videos/3drender.mp4'),
  },
  {
    id: '3',
    label: 'Abandoned',
    video: require('../assets/videos/abandoned.mp4'),
  },
];

const explorePrompts = [
  {
    id: '1',
    video: require('../assets/videos/prompt1.mp4'),
    prompt: 'Subtle reflections of a woman on the window of a train moving at hyper-speed in a Japanese city.',
  },
  {
    id: '2',
    video: require('../assets/videos/prompt2.mp4'),
    prompt: 'Ultra-fast disorienting hyperlapse racing through a tunnel into a labyrinth of rapidly growing vines',
  },
  {
    id: '3',
    video: require('../assets/videos/prompt3.mp4'),
    prompt: 'Thrilling safari adventure through the African savanna. Lions, elephants, zebras, and giraffes roam freely in their natural habitat, while the sun sets in a stunning display of colors',
  },
  {
    id: '4',
    video: require('../assets/videos/prompt4.mp4'),
    prompt: 'Handheld tracking shot at night in abandon old European street.',
  },
];

const StyleVideoTile = ({ video, label }) => {
  const player = useVideoPlayer(video, (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  return (
    <TouchableOpacity style={styles.styleTile}>
      <VideoView
        player={player}
        style={styles.styleVideo}
        resizeMode="cover"
      />
      <Text style={styles.styleLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const ExploreCard = ({ video, prompt }) => {
  const player = useVideoPlayer(video, (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  return (
    <TouchableOpacity style={styles.exploreCard}>
      <VideoView
        player={player}
        style={styles.exploreVideo}
        resizeMode="cover"
      />
      <View style={styles.exploreOverlay}>
        <View style={styles.tryPromptTag}>
          <Ionicons name="sparkles-sharp" size={12} color="#FFFFFF" />
          <Text style={styles.tryPromptText}>Try Prompt</Text>
        </View>
        <Text style={styles.explorePrompt} numberOfLines={2}>
          {prompt}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const [prompt, setPrompt] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Video AI</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.proButton}>
            <Ionicons name="sparkles-sharp" size={14} color="#FFFFFF" />
            <Text style={styles.proText}>PRO</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Settings')}>
            <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={[{ key: 'main' }]}
        renderItem={() => (
          <>
            {/* Prompt Section Header */}
            <View style={styles.promptHeader}>
                <Text style={styles.sectionTitle}>Enter Prompt</Text>
                <TouchableOpacity style={styles.inspireButton}>
                    <Image source={require('../assets/images/flash.png')}/>
                    <Text style={styles.inspireText}>inspire me</Text>
                </TouchableOpacity>
            </View>

            {/* Prompt Input Box */}
            <View style={styles.promptContainer}>
                <TextInput
                    style={styles.promptInput}
                    multiline
                    numberOfLines={6}
                    maxLength={320}
                    placeholder="Provide a detailed description of the video you have for your artwork."
                    placeholderTextColor="#9CA3AF"
                    value={prompt}
                    onChangeText={setPrompt}
                />
                <Text style={styles.charCount}>{`${prompt.length}/320`}</Text>
            </View>

            {/* Style Section */}
            <View style={styles.styleHeader}>
                <Text style={styles.sectionTitle}>Select Style</Text>
                <Text style={styles.sectionSubtitle}>
                    Styles are adjustments directly related to how the video will appear.
                </Text>
            </View>

            <FlatList
                data={styleOptions}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.styleListContainer}
                ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                renderItem={({ item }) => (
                    <StyleVideoTile video={item.video} label={item.label} />
                )}
            />

            {/* Advanced Settings */}
            <TouchableOpacity style={styles.advancedBtn}>
                <Ionicons name="options-outline" size={18} color="#FFFFFF" />
                <Text style={styles.advancedText}>
                    Advanced Settings <Text style={styles.optionalText}>(Optional)</Text>
                </Text>
            </TouchableOpacity>

            {/* Generate Button */}
            <TouchableOpacity style={styles.generateBtn}>
              <Text style={styles.generateText}>Generate</Text>
            </TouchableOpacity>

            {/* Explore Beyond Section */}
            <View style={styles.exploreContainer}>
                <Text style={styles.sectionTitle}>Explore Beyond</Text>
                <View style={styles.exploreGrid}>
                    {explorePrompts.map((item) => (
                    <ExploreCard key={item.id} video={item.video} prompt={item.prompt} />
                    ))}
                </View>
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0F',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 12,
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  proButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6D00',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
  },
  proText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 4,
  },

  // Prompt Section
  promptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '00',
  },
  promptContainer: {
    backgroundColor: '#00111C',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 12,
  },
  promptInput: {
    color: '#DEE2E6',
    fontSize: 14,
    fontWeight: '400',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    color: '#9CA3AF',
    fontSize: 12,
    textAlign: 'right',
    marginTop: 8,
  },
  inspireButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#FF6D00',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
  inspireText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },

  // Style Section
  styleHeader: {
    paddingHorizontal: 12,
    marginTop: 8,
  },
  sectionSubtitle: {
    color: '#DEE2E6',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    marginTop: 8,
  },
  styleListContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  styleTile: {
    width: 120,
    backgroundColor: '#001523',
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  styleVideo: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
  },
  styleLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 8,
  },

  // Advanced Settings Button
  advancedBtn: {
    marginTop: 24,
    marginHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#00111C',
    borderRadius: 8,
  },
  advancedText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  optionalText: {
    color: '#DEE2E6',
    fontSize: 14,
    fontWeight: '400',
  },

  // Generate Button
  generateBtn: {
    backgroundColor: '#0B0B0F',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginVertical: 24,
  },
  generateText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },

  // Explore Beyond Section
  exploreContainer: {
    paddingHorizontal: 12,
    marginTop: 24,
  },
  exploreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  exploreCard: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#001523',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    marginTop: 12,
    position: 'relative',
  },
  exploreVideo: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    zIndex: -1,
    position: 'absolute',
  },
  exploreOverlay: {
    flex: 1,
    justifyContent: 'flex-end', 
    padding: 16,
    zIndex: 1,
  },
  tryPromptTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(18, 17, 31, 0.4)',
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
    zIndex: 2,
  },
  tryPromptText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  explorePrompt: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowRadius: 4,
  },
});
