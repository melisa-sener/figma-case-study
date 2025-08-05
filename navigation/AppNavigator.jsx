import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen.jsx';
import PaywallScreen from '../screens/PaywallScreen.jsx';
import HomeScreen from '../screens/HomeScreen.jsx';
import BottomSettingsScreen from '../screens/BottomSettingsScreen.jsx';
import GeneratedVideoScreen from '../screens/GeneratedVideoScreen.jsx';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Paywall" component={PaywallScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="BottomSettings"
          component={BottomSettingsScreen}
          options={{
            presentation: 'formSheet',
            contentStyle: { backgroundColor: '#01030C' },
            sheetAllowedDetents: [0.45],
            sheetCornerRadius: 20,
          }}
        />
        <Stack.Screen name="GeneratedVideo" component={GeneratedVideoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
