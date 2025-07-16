import { getItemByName } from "@/lib/appwrite";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCartStore from "./../../zustand/CartStore";

const cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
  } = useCartStore();
  const [cartItems, setCartItems] = useState([]);

  // useEffect(() => {
  //   const items = cartItems.map((item) => getItemByName(item.item));
  //   console.log(items);
  // }, [cart]);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const handleQuantityChange = (id, currentQuantity, increment, itemPrice) => {
    const newQuantity = increment ? currentQuantity + 1 : currentQuantity - 1;

    if (newQuantity <= 0) {
      handleRemoveItem(id);
      return;
    }

    // Calculate new total (you can pass this from parent if needed)
    const newTotal = (itemPrice * newQuantity).toFixed(2);
    updateQuantity(id, newQuantity, newTotal);
  };

  const handleRemoveItem = (id) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from cart?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => removeFromCart(id),
        },
      ]
    );
  };

  const handleClearCart = () => {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to remove all items from cart?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear All", style: "destructive", onPress: clearCart },
      ]
    );
  };

  const handleProceedToPayment = () => {
    if (cartItems.length === 0) {
      Alert.alert("Empty Cart", "Please add items to cart before proceeding.");
      return;
    }
    // Navigate to payment screen
    Alert.alert("Proceed to Payment", "Redirecting to payment screen...");
  };

  const getItemPrice = (total, quantity) => {
    return (parseFloat(total) / quantity).toFixed(2);
  };

  const renderCartItem = ({ item }) => (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm mx-5">
      {/* Item Header */}
      <View className="flex-row justify-between items-start mb-3">
        <View className="w-3/4">
          <Text className="font-fredokasemi text-lg text-gray-800">
            {item.item}
          </Text>
          <Text className="font-fredoka text-green-600 text-lg mt-1">
            ₹{item.total}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => handleRemoveItem(item.id)}
          className="bg-red-100 p-2 rounded-full"
        >
          <MaterialIcons name="delete-outline" size={20} color="#dc2626" />
        </TouchableOpacity>
      </View>

      {/* Customizations */}
      {item.customs.length > 0 && (
        <View className="bg-gray-50 rounded-xl p-3 mb-3">
          <Text className="font-fredoka text-sm text-gray-600 mb-1">
            Customizations:
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {item.customs.map((custom, index) => (
              <View key={index} className="bg-white px-2 py-1 rounded-full">
                <Text className="font-fredoka text-xs text-gray-700">
                  {custom}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Quantity Controls */}
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Text className="font-fredoka text-gray-600 mr-2">
            ₹{getItemPrice(item.total, item.quantity)} each
          </Text>
        </View>
        <View className="flex-row items-center gap-x-3">
          <TouchableOpacity
            onPress={() =>
              handleQuantityChange(
                item.id,
                item.quantity,
                false,
                getItemPrice(item.total, item.quantity)
              )
            }
            className="bg-gray-100 rounded-full p-2"
          >
            <AntDesign name="minus" size={16} color="gray" />
          </TouchableOpacity>
          <Text className="font-fredokasemi text-lg text-gray-800 w-8 text-center">
            {item.quantity}
          </Text>
          <TouchableOpacity
            onPress={() =>
              handleQuantityChange(
                item.id,
                item.quantity,
                true,
                getItemPrice(item.total, item.quantity)
              )
            }
            className="bg-red-100 rounded-full p-2"
          >
            <AntDesign name="plus" size={16} color="#dc2626" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View className="px-5 pt-4 pb-2 bg-[#FFF8F0]">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <MaterialIcons name="shopping-cart" size={24} color="#374151" />
          <Text className="font-fredokasemi text-xl text-gray-800 ml-2">
            Your Cart ({getCartItemCount()})
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleClearCart}
          className="bg-red-100 px-3 py-2 rounded-full"
        >
          <Text className="font-fredoka text-red-600 text-sm">Clear All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View className="bg-white border-t border-gray-200 p-5 mx-5 rounded-t-2xl mt-4 mb-8">
      {/* Order Summary */}
      <View className="mb-6">
        <Text className="font-fredokasemi text-lg text-gray-800 mb-4">
          Order Summary
        </Text>
        <View className="flex-row justify-between items-center mb-2">
          <Text className="font-fredoka text-gray-600">Subtotal</Text>
          <Text className="font-fredoka text-gray-800">₹{getCartTotal()}</Text>
        </View>
        <View className="flex-row justify-between items-center mb-2">
          <Text className="font-fredoka text-gray-600">Delivery Fee</Text>
          <Text className="font-fredoka text-gray-800">₹25.00</Text>
        </View>
        <View className="flex-row justify-between items-center mb-2">
          <Text className="font-fredoka text-gray-600">Taxes</Text>
          <Text className="font-fredoka text-gray-800">
            ₹{(parseFloat(getCartTotal()) * 0.05).toFixed(2)}
          </Text>
        </View>
        <View className="border-t border-gray-200 pt-2">
          <View className="flex-row justify-between items-center">
            <Text className="font-fredokasemi text-lg text-gray-800">
              Total
            </Text>
            <Text className="font-fredokasemi text-lg text-gray-800">
              ₹
              {(
                parseFloat(getCartTotal()) +
                25 +
                parseFloat(getCartTotal()) * 0.05
              ).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      {/* Proceed Button */}
      <TouchableOpacity
        onPress={handleProceedToPayment}
        className="bg-red-600 rounded-2xl py-4 flex-row justify-center items-center gap-x-2"
      >
        <MaterialIcons name="payment" size={24} color="white" />
        <Text className="font-fredokasemi text-white text-lg">
          Proceed to Payment
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyCart = () => (
    <View className="items-center justify-center h-96">
      <MaterialIcons name="shopping-cart" size={80} color="#d1d5db" />
      <Text className="font-fredokasemi text-xl text-gray-500 mt-4">
        Your cart is empty
      </Text>
      <Text className="font-fredoka text-gray-400 mt-2 text-center">
        Add some delicious items to get started!
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="bg-[#FFF8F0] flex-1">
      {cartItems.length === 0 ? (
        <View className="flex-1">
          {renderHeader()}
          {renderEmptyCart()}
        </View>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCartItem}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
};

export default cart;
