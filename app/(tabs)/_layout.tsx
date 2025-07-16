import useAuthStore from "@/store/auth.store";
import { TabBarIconProps } from "@/type";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => (
  <View>
    <Image
      source={icon}
      className="size-5"
      resizeMode="contain"
      tintColor={focused ? "black" : "gray"}
    />
    <Text>{title}</Text>
  </View>
);

export default function TabLayout() {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Redirect href="/sign-in" />;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#EE7530",
        tabBarInactiveTintColor: "#520100",
        tabBarStyle: {
          borderTopLeftRadius: 30,
          borderTopEndRadius: 30,
          position: "absolute",
          paddingTop: 3,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="home"
              size={24}
              color={focused ? "#EE7530" : "#520100"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="shopping-cart"
              size={24}
              color={focused ? "#EE7530" : "#520100"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search/page"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="search"
              size={24}
              color={focused ? "#EE7530" : "#520100"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={24}
              color={focused ? "#EE7530" : "#520100"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
