import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useVideoPlayer, VideoView } from 'expo-video';
import { LinearGradient } from 'expo-linear-gradient';
import Feather from '@expo/vector-icons/Feather';

const videoSource = require('../assets/videos/main-video.mp4');

export default function PaywallScreen({ route, navigation }) {
  const [selectedPlan, setSelectedPlan] = useState('annual');

  const isNavigateFromOnboarding = !!route?.params?.isNavigateFromOnboarding;

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.playbackRate = 1.0;
    player.staysActiveInBackground = false;
    player.play();
  });

  const handleClose = useCallback(() => {
    if (isNavigateFromOnboarding) {
      navigation.navigate('Home');
    } else {
      navigation.goBack();
    }
  }, [isNavigateFromOnboarding, navigation]);

  return (
    <>
      {/* Background Video */}
      <VideoView
        style={styles.video}
        player={player}
        contentFit="cover"
        allowsFullscreen={false}
        nativeControls={false}
      />

      <LinearGradient
        colors={[
          'rgba(0,0,0,0)',
          'rgba(0,0,0,0)',
          'rgba(0,0,0,0.85)',
          '#101417'
        ]}
        locations={[0, 0.40, 0.50, 1]}
        style={styles.gradient}
      />


      <SafeAreaView style={styles.container}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={handleClose}>
            <Feather name="x" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.restoreBtn}>
            <Text style={styles.restoreText}>Restore</Text>
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View style={styles.overlay}>
          <Text style={styles.title}>SORA PRO</Text>
          <Text style={styles.subtitle}>Try AI Video, Unleash your creativity</Text>

          <View style={styles.featureList}>
            <Text style={styles.feature}>✓ Text to Video & Image to Video</Text>
            <Text style={styles.feature}>✓ Ultra HD Resolution</Text>
            <Text style={styles.feature}>✓ Unlock All Styles & Presets</Text>
          </View>

          {/* Annual Plan */}
          <TouchableOpacity onPress={() => setSelectedPlan('annual')}>
            <View style={[
              styles.planCard,
              selectedPlan === 'annual' ? styles.planCardSelected : styles.planCardUnselected
            ]}>
              <View style={styles.cardHeader}>
                <Text style={styles.planTitle}>Annually Access</Text>
              </View>
              <View style={styles.planRow}>
                <Text style={styles.planSubText}>TRY 2,379.99</Text>
                <Text style={styles.planPrice}>
                    TRY 45.64 <Text style={styles.planPriceSuffix}>/ Week</Text>
                </Text>
              </View>
              <Text style={styles.planCredits}>90 credits per week</Text>
              <Text style={[
                styles.badge,
                selectedPlan === 'annual' ? styles.badgeOrange : styles.badgeDark
              ]}>
                BEST PRICE
              </Text>
            </View>
          </TouchableOpacity>

          {/* Weekly Plan */}
          <TouchableOpacity onPress={() => setSelectedPlan('weekly')}>
            <View style={[
              styles.planCard,
              selectedPlan === 'weekly' ? styles.planCardSelected : styles.planCardUnselected
            ]}>
              <View style={styles.cardHeader}>
                <Text style={styles.planTitle}>Weekly Access</Text>
              </View>
              <View style={styles.planRow}>
                <Text style={styles.planSubText}>TRY 394.99</Text>
                <Text style={styles.planPrice}>
                    TRY 394.99 <Text style={styles.planPriceSuffix}>/ Week</Text>
                </Text>
              </View>
              <Text style={styles.planCredits}>60 credits per week</Text>
              <Text style={[
                styles.badge,
                selectedPlan === 'weekly' ? styles.badgeOrange : styles.badgeDark
              ]}>
                MOST POPULAR
              </Text>
            </View>
          </TouchableOpacity>

          {/* Bottom Section */}
          <View style={styles.bottomSection}>
            <View style={styles.autoRenewRow}>
                <Image source={require('../assets/images/vector.png')} style={styles.vectorIcon} />
                <Text style={styles.note}>Auto-Renewal, Cancel Anytime</Text>
            </View>

            <TouchableOpacity style={styles.upgradeBtn}>
              <Text style={styles.upgradeText}>Upgrade to Sora Pro</Text>
            </TouchableOpacity>

            <View style={styles.links}>
              <Text style={styles.link}>Privacy Policy</Text>
              <Text style={styles.separator}> | </Text>
              <Text style={styles.link}>Terms of Service</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1, 
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    marginTop: 'auto',
  },
  topBar: {
    position: 'absolute',
    top: 60,
    left: 24,
    right: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restoreBtn: {
    backgroundColor: 'rgba(27, 31, 35, 0.4)',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 16,
  },
  restoreText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
  },
  title: {
    color: '#FCFCFD',
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 14,
  },
  featureList: {
    alignSelf: 'center',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  feature: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 8,
    textAlign: 'left',
  },
  planCard: {
    borderRadius: 12,
    padding: 16,
    position: 'relative',
    marginBottom: 16,
  },
  planCardSelected: {
    backgroundColor: '#101417',
    borderColor: '#FF6D00',
    borderWidth: 2,
  },
  planCardUnselected: {
    backgroundColor: '#101417',
    borderColor: '#3F4E59',
    borderWidth: 1,
  },
  cardHeader: {
    marginBottom: 6,
  },
  planTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  planRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    },
  planSubText: {
    color: '#ADB5BD',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginBottom: 2,
  },
  planPrice: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginBottom: 2,
  },
  planPriceSuffix: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#ADB5BD',
    },
  planCredits: {
    color: '#ADB5BD',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    fontStyle: 'italic',
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    fontFamily: 'Poppins-Medium',
    overflow: 'hidden',
  },
  badgeOrange: {
    backgroundColor: '#FF6D00',
    color: '#FFFFFF',
  },
  badgeDark: {
    backgroundColor: '#3F4E59',
    color: '#FFFFFF',
  },
  bottomSection: {
    alignItems: 'center',
    marginTop: 12,
  },
  autoRenewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  vectorIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 6,
    },
  note: {
    color: '#ADB5BD',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  upgradeBtn: {
    backgroundColor: '#FF6D00',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
  },
  upgradeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  link: {
    color: '#FF6D00',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    textDecorationLine: 'underline',
  },
  separator: {
    color: '#FFFFFF',
  }
});