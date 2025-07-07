// app/(auth)/_layout.tsx
import useAuthStore from "@/store/auth.store";
import { Redirect, Slot } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar } from "react-native";

export default function AuthLayout() {
  const {isAuthenticated}= useAuthStore();
  if(isAuthenticated) return <Redirect href={"/"}/>
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        className="bg-[#FFF8F0] flex-1"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
