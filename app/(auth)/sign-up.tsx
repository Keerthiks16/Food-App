// app/(auth)/sign-up.tsx
import { createUser } from "@/lib/appwrite";
import { Ionicons } from "@expo/vector-icons";
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

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    const { name, email, password } = form;
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    setIsSubmitting(true);
    // console.log(`Form: `, form);
    try {
      await createUser({ email, password, name });
      router.replace("/");
    } catch (e: any) {
      Alert.alert("Failed", e.message);
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
          keyboardDismissMode="handle"
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
                Create Account
              </Text>
              <Text className="text-[#1E1E1E] opacity-70 text-lg text-center">
                Join us and start ordering
              </Text>
            </View>

            {/* Form Container */}
            <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              {/* Name Input */}
              <View className="mb-5">
                <Text className="text-[#1E1E1E] font-semibold mb-3 text-base">
                  Full Name
                </Text>
                <View className="relative">
                  <View className="absolute left-4 top-4 z-10">
                    <Ionicons name="person-outline" size={20} color="#FF7F11" />
                  </View>
                  <TextInput
                    placeholder="Enter your full name"
                    placeholderTextColor="#1E1E1E60"
                    className="bg-[#F8F9FA] w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 text-[#1E1E1E] text-base"
                    value={form.name}
                    onChangeText={(text) => handleChange("name", text)}
                  />
                </View>
              </View>

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
                    autoCapitalize="none"
                    placeholderTextColor="#1E1E1E60"
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

              {/* Sign Up Button */}
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
                      Creating Account...
                    </Text>
                  </View>
                ) : (
                  <Text className="text-white text-center font-bold text-lg">
                    Create Account
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View className="flex-row items-center my-8">
              <View className="flex-1 h-px bg-gray-300"></View>
              <Text className="mx-4 text-[#1E1E1E] opacity-50 text-sm">OR</Text>
              <View className="flex-1 h-px bg-gray-300"></View>
            </View>

            {/* Sign In Link */}
            <TouchableOpacity
              onPress={() => router.push("/sign-in")}
              className="bg-white border border-[#FF3C38] rounded-xl p-4 shadow-sm"
            >
              <Text className="text-[#FF3C38] text-center text-base font-semibold">
                Already have an account? Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
