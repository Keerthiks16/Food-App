// app/_layout.js or app/_layout.tsx (older versions may call it RootLayout.js)
import {
  Fredoka_400Regular,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
  useFonts,
} from "@expo-google-fonts/fredoka";
import { Stack } from "expo-router";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { StatusBar, View } from "react-native";
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://cad65b7e97e59c9a4f831d900cda24b4@o4509627119763456.ingest.de.sentry.io/4509627128479824',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

import "./global.css"; // Tailwind/nativewind setup assumed
import useAuthStore from "@/store/auth.store";

// Prevent splash from auto-hiding
ExpoSplashScreen.preventAutoHideAsync();

export default Sentry.wrap(function RootLayout() {
  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  const {isLoading,fetchAuthenticatedUser}=useAuthStore();

  useEffect(() => {
    fetchAuthenticatedUser();
  }, [])
  

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8F0" />
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
});