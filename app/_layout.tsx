// app/_layout.js or app/_layout.tsx (older versions may call it RootLayout.js)
import {
  Fredoka_400Regular,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
  useFonts,
} from "@expo-google-fonts/fredoka";
import { Stack } from "expo-router";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { View } from "react-native";

import "./global.css"; // Tailwind/nativewind setup assumed

// Prevent splash from auto-hiding
ExpoSplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
