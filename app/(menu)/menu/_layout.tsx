import { Slot } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function _layout() {
  return (
    <SafeAreaView>
      <Slot />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
