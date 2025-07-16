import { offers } from "@/constants";
import useCartStore from "@/zustand/CartStore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const OfferItem = () => {
  const { id } = useLocalSearchParams();
  const [offer, setOffer] = useState(offers[id-1] || {});
  const { addToCart, getCartItemCount } = useCartStore();

  const handleAddToCart = (item) => {
    try {
      addToCart(
        item.item,
        item.quantity,
        item.customs ? [item.customs] : [],
        item.total
      );
      Alert.alert("Success", "Item added to cart!", [
        { text: "OK", style: "default" },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to add item to cart");
    }
  };

  if (!offer.title) {
    return (
      <View className="bg-[#FFF8F0] justify-center items-center h-full">
        <FontAwesome name="exclamation-triangle" size={60} color="#d1d5db" />
        <Text className="font-fredokasemi text-gray-500 text-lg mt-4">
          Offer not found
        </Text>
      </View>
    );
  }

  return (
    <View className="bg-[#FFF8F0] h-full">
      {/* Header */}
<View className="px-5 pt-4 pb-2 bg-[#FFF8F0]">
  <View className="flex-row items-center justify-between mb-4">
    {/* Left section: back icon + title */}
    <View className="flex-row items-center">
      <TouchableOpacity
        onPress={() => router.back()}
        className="p-2 rounded-full bg-white shadow-sm"
      >
        <FontAwesome name="arrow-left" size={20} color="#374151" />
      </TouchableOpacity>
      <Text className="font-fredokasemi text-xl text-gray-800 ml-2">
        Special Offer
      </Text>
    </View>

    {/* Optional right side action (can leave empty or repurpose later) */}
    <View className="w-10" />
  </View>
</View>


      {/* Offer Packages */}
      <FlatList
        data={offer.packages}
        keyExtractor={(item, index) => index.toString()}
        contentContainerClassName="px-5 pb-32"
        renderItem={({ item }) => (
          <View className="bg-white rounded-2xl p-4 mb-6 shadow-sm flex-row">
            {/* Image on the left */}
            <Image
              source={item.image}
              className="w-[40%] h-36 rounded-xl"
              resizeMode="cover"
            />

            {/* Content on the right */}
            <View className="flex-1 pl-4 justify-between">
              <View>
                <Text
                  className="text-base font-fredokasemi text-gray-800"
                  numberOfLines={2}
                >
                  {item.item}
                </Text>

                <View className="flex-row items-center mt-2">
                  <View className="bg-blue-100 px-2 py-1 rounded-full">
                    <Text className="text-xs font-fredoka text-blue-600">
                      Qty: {item.quantity}
                    </Text>
                  </View>
                </View>

                {item.customs && (
                  <View className="mt-2">
                    <Text className="text-xs font-fredoka text-gray-500 mb-1">
                      Customizations:
                    </Text>
                    <View className="bg-orange-100 px-2 py-1 rounded-full">
                      <Text
                        className="text-xs font-fredoka text-orange-600"
                        numberOfLines={1}
                      >
                        {item.customs}
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              {/* Price and Add Button */}
              <View className="flex-row justify-between items-center mt-3">
                <Text className="text-lg font-fredokasemi text-green-700">
                  ₹{parseFloat(item.total).toFixed(2)}
                </Text>

                <TouchableOpacity
                  onPress={() => handleAddToCart(item)}
                  className="bg-red-600 px-4 py-2 rounded-full flex-row items-center"
                >
                  <FontAwesome name="plus" size={12} color="white" />
                  <Text className="text-white font-fredokasemi text-xs ml-1">
                    Add
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="items-center mt-20">
            <FontAwesome name="gift" size={60} color="#d1d5db" />
            <Text className="font-fredokasemi text-gray-500 text-lg mt-4 text-center">
              No packages available
            </Text>
            <Text className="font-fredoka text-gray-400 text-sm mt-2 text-center px-8">
              This offer doesn't have any packages at the moment
            </Text>
          </View>
        )}
      />

      {/* Cart Button - Fixed at bottom */}
      <View className="absolute bottom-8 right-5">
        <TouchableOpacity
          onPress={() => router.push("/cart")}
          className="bg-blue-950 rounded-full p-4 shadow-lg flex-row items-center"
        >
          <FontAwesome name="shopping-cart" size={20} color="white" />
          {getCartItemCount() > 0 && (
            <View className="bg-white rounded-full ml-2 px-3 py-1">
              <Text className="text-blue-950 font-fredokasemi text-sm">
                {getCartItemCount()}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OfferItem;
