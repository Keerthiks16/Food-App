// app/(auth)/sign-in.tsx
import { signIn } from "@/lib/appwrite";
import { Ionicons } from "@expo/vector-icons";
import * as Sentry from "@sentry/react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    const { email, password } = form;
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    setIsSubmitting(true);
    // console.log(`Form: `, form);

    try {
      await signIn({ email, password });
      router.replace("/");
    } catch (e: any) {
      Alert.alert("Failed", e.message);
      Sentry.captureEvent(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="flex-1 bg-[#FFF8F0]"
          keyboardShouldPersistTaps="handled"
        >
          <View className="relative h-60">
            <Image
              source={require("../../assets/images/fast-food.png")}
              className="w-full h-full"
              resizeMode="cover"
            />

            {/* App Name */}
            <View className="absolute inset-0 justify-center items-center ">
              <Text className="text-white text-6xl font-fredokabold text-center border-2 backdrop-blur-xl rounded-3xl p-6 border-white">
                FastBite
              </Text>
              <Text className="text-white text-lg opacity-90 mt-1">
                Delicious Food Delivered
              </Text>
            </View>
          </View>

          {/* Form Section */}
          <View className="flex-1 px-6 pt-8 pb-8">
            {/* Welcome Text */}
            <View className="mb-8 items-center">
              <Text className="text-4xl font-fredokasemi text-[#FF3C38] mb-2 text-center">
                Welcome Back
              </Text>
              <Text className="text-[#1E1E1E] opacity-70 text-lg text-center">
                Sign in to your account
              </Text>
            </View>

            {/* Form Container */}
            <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              {/* Email Input */}
              <View className="mb-5">
                <Text className="text-[#1E1E1E] font-semibold mb-3 text-base">
                  Email Address
                </Text>
                <View className="relative">
                  <View className="absolute left-4 top-4 z-10">
                    <Ionicons name="mail-outline" size={20} color="#FF7F11" />
                  </View>
                  <TextInput
                    placeholder="Enter your email"
                    placeholderTextColor="#1E1E1E60"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    className="bg-[#F8F9FA] w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 text-[#1E1E1E] text-base"
                    value={form.email}
                    onChangeText={(text) => handleChange("email", text)}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View className="mb-6">
                <Text className="text-[#1E1E1E] font-semibold mb-3 text-base">
                  Password
                </Text>
                <View className="relative">
                  <View className="absolute left-4 top-4 z-10">
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color="#FF7F11"
                    />
                  </View>
                  <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor="#1E1E1E60"
                    secureTextEntry={!showPassword}
                    className="bg-[#F8F9FA] w-full pl-12 pr-12 py-4 rounded-xl border border-gray-200 text-[#1E1E1E] text-base"
                    value={form.password}
                    onChangeText={(text) => handleChange("password", text)}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4"
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#1E1E1E60"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Error Message */}
              {error !== "" && (
                <View className="mb-4 bg-red-50 p-3 rounded-lg border border-red-200">
                  <Text className="text-[#D90429] text-center font-medium">
                    {error}
                  </Text>
                </View>
              )}

              {/* Sign In Button */}
              <TouchableOpacity
                disabled={isSubmitting}
                onPress={handleSubmit}
                className={`w-full p-4 rounded-xl shadow-sm ${
                  isSubmitting ? "bg-[#FF7F11] opacity-70" : "bg-[#FF7F11]"
                }`}
              >
                {isSubmitting ? (
                  <View className="flex-row justify-center items-center">
                    <ActivityIndicator color="white" size="small" />
                    <Text className="text-white font-bold text-lg ml-2">
                      Signing In...
                    </Text>
                  </View>
                ) : (
                  <Text className="text-white text-center font-bold text-lg">
                    Sign In
                  </Text>
                )}
              </TouchableOpacity>

              {/* Forgot Password */}
              <TouchableOpacity className="mt-4">
                <Text className="text-[#FF7F11] text-center text-base font-medium">
                  Forgot your password?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View className="flex-row items-center my-8">
              <View className="flex-1 h-px bg-gray-300"></View>
              <Text className="mx-4 text-[#1E1E1E] opacity-50 text-sm">OR</Text>
              <View className="flex-1 h-px bg-gray-300"></View>
            </View>

            {/* Sign Up Link */}
            <TouchableOpacity
              onPress={() => router.push("/sign-up")}
              className="bg-white border border-[#FF3C38] rounded-xl p-4 shadow-sm"
            >
              <Text className="text-[#FF3C38] text-center text-base font-semibold">
                New here? Create an account
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
