import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import ExploreCard from '../components/ExploreCard';

const horizontalPadding = 12;

const styleOptions = [
  { id: '1', label: '35 mm', thumbnail: require('../assets/images/35mm.png') },
  { id: '2', label: '3D Render', thumbnail: require('../assets/images/3drender.png') },
  { id: '3', label: 'Abandoned', thumbnail: require('../assets/images/abandoned.png') },
  { id: '4', label: 'Abstract Sculpture', thumbnail: require('../assets/images/abstract.png') },
  { id: '5', label: 'Frost', thumbnail: require('../assets/images/frost.png') },
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

const StyleThumbnailTile = ({ thumbnail, label, isSelected, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.styleTile, isSelected ? styles.styleTileSelected : styles.styleTileUnselected]}
  >
    <Image source={thumbnail} style={styles.styleThumbnail} />
    <Text style={styles.styleLabel}>{label}</Text>
  </TouchableOpacity>
);

export default function HomeScreen({ navigation }) {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>Video AI</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.proButton}
              onPress={() => navigation.navigate('Paywall')}
            >
              <Ionicons name="sparkles-sharp" size={14} color="#FFFFFF" />
              <Text style={styles.proText}>PRO</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Settings')}>
              <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Prompt Input */}
        <View style={styles.promptHeader}>
          <Text style={styles.sectionTitle}>Enter Prompt</Text>
          <TouchableOpacity style={styles.inspireButton}>
            <Image source={require('../assets/images/flash.png')} />
            <Text style={styles.inspireText}>inspire me</Text>
          </TouchableOpacity>
        </View>

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

        {/* Style Selection */}
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
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          renderItem={({ item }) => (
            <StyleThumbnailTile
              thumbnail={item.thumbnail}
              label={item.label}
              isSelected={selectedStyle === item.id}
              onPress={() => setSelectedStyle(item.id)}
            />
          )}
        />

        {/* Advanced Settings */}
        <TouchableOpacity style={styles.advancedBtn} onPress={() => navigation.navigate('BottomSettings')}>
          <Ionicons name="options-outline" size={18} color="#FFFFFF" />
          <Text style={styles.advancedText}>Advanced Settings <Text style={styles.optionalText}>(Optional)</Text></Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.generateBtn,
            { backgroundColor: prompt.trim() && selectedStyle ? '#FF6D00' : '#0B0B0F' },
          ]}
          disabled={!prompt.trim() || !selectedStyle}
          onPress={() => 
            navigation.navigate('GeneratedVideo', {
              prompt,
              selectedStyle,
            })
          }
        >
          <Text style={styles.generateText}>Generate</Text>
        </TouchableOpacity>

        {/* Explore Beyond */}
        <View style={styles.exploreContainer}>
          <Text style={styles.sectionTitle}>Explore Beyond</Text>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <View style={{ flex: 1 }}>
              <ExploreCard {...explorePrompts[0]} heightRatio={1.2} />
              <ExploreCard {...explorePrompts[2]} heightRatio={1.6} />
            </View>
            <View style={{ flex: 1 }}>
              <ExploreCard {...explorePrompts[1]} heightRatio={1.6} />
              <ExploreCard {...explorePrompts[3]} heightRatio={1.2} />
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0F',
    paddingHorizontal: horizontalPadding,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
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
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginLeft: 4,
  },
  promptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  promptContainer: {
    backgroundColor: '#00111C',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  promptInput: {
    color: '#DEE2E6',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    color: '#9CA3AF',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
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
    fontFamily: 'Poppins-Medium',
  },
  styleHeader: {
    marginTop: 8,
  },
  sectionSubtitle: {
    color: '#DEE2E6',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    lineHeight: 18,
    marginTop: 8,
  },
  styleTile: {
    width: 120,
    height: 156,
    backgroundColor: '#001523',
    borderRadius: 12,
    alignItems: 'center',
  },
  styleThumbnail: {
    width: 96,
    height: 96,
    borderRadius: 8,
    resizeMode: 'cover',
    marginTop: 8,
  },
  styleLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    marginTop: 8,
  },
  styleTileSelected: {
    backgroundColor: 'rgba(255, 84, 0, 0.12)',
    borderColor: '#FF6D00',
    borderWidth: 1.5,
  },
  styleTileUnselected: {
    backgroundColor: '#001523',
    borderColor: '#001523',
    borderWidth: 1.5,
  },
  advancedBtn: {
    marginTop: 24,
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
    fontFamily: 'Poppins-Medium',
    marginLeft: 8,
  },
  optionalText: {
    color: '#DEE2E6',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  generateBtn: {
    backgroundColor: '#0B0B0F',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginVertical: 24,
  },
  generateText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  exploreContainer: {
    marginTop: 12,
  },
});
