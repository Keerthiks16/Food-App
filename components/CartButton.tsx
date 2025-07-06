import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function CartButton({ cartCount = 0 }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="relative p-3 bg-blue-950 rounded-full shadow-md shadow-blue-900"
    >
      <Ionicons name="bag-outline" size={24} color="white" />

      {cartCount > 0 && (
        <View className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full items-center justify-center">
          <Text className="text-white text-xs font-bold">{cartCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
