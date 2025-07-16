import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { getCustomizations, getMenuItem } from "../../../lib/appwrite";
import useCartStore from "../../../zustand/CartStore";

export default function page() {
  const { addToCart } = useCartStore();

  const { id } = useLocalSearchParams();
  const [data, setData] = useState({});
  const [showCustomization, setShowCustomization] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addons, setAddons] = useState([]);
  const [order, setOrder] = useState({});
  const [customs, setCustoms] = useState([]);
  const [addonsPrice, setAddonsPrice] = useState(0);

  // Dummy category descriptions
  const categoryDescriptions = {
    Bowls:
      "Hearty and nutritious bowls packed with fresh ingredients, perfect for a wholesome meal that satisfies your hunger and nourishes your body.",
    Wraps:
      "Delicious wraps filled with fresh vegetables, proteins, and flavorful sauces, wrapped in soft tortillas for the perfect handheld meal.",
    Sandwiches:
      "Classic sandwiches made with premium ingredients, fresh bread, and creative combinations that deliver comfort food at its finest.",
    Burritos:
      "Authentic burritos stuffed with seasoned meats, beans, rice, and fresh toppings, delivering bold flavors in every bite.",
    Pizzas:
      "Artisan pizzas with hand-tossed dough, premium toppings, and melted cheese, baked to perfection for the ultimate comfort food experience.",
    Burgers:
      "Juicy, handcrafted burgers made with quality ingredients, fresh buns, and creative toppings that redefine the classic burger experience.",
  };

  useEffect(() => {
    const fetchItemData = async () => {
      const response = await getMenuItem(id);
      setData(response);
    };
    fetchItemData();
  }, [id]);

  useEffect(() => {
    const fetchCustoms = async () => {
      const response = await getCustomizations();
      // console.log(`Customizations: `, response);
      const fetchedAddons = response.documents.filter(
        (item) => item.type === "topping"
      );
      setAddons(fetchedAddons);
      // console.log(`Addons: `, fetchedAddons);
    };
    fetchCustoms();
  }, []);

  const getCategoryDescription = (categoryName) => {
    return (
      categoryDescriptions[categoryName] ||
      "Delicious food item crafted with care and premium ingredients."
    );
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const HandleOrder = () => {
    // setOrder({
    //   item: data.name,
    //   quantity,
    //   customs,
    //   total: ((data?.price || 0) * quantity + addonsPrice).toFixed(2),
    // });
    const totalPrice = ((data?.price || 0) * quantity + addonsPrice).toFixed(2);
    addToCart(data.name, quantity, customs, totalPrice);
  };

  return (
    <ScrollView className="bg-[#FFF8F0]" showsVerticalScrollIndicator={false}>
      {/* Hero Image Section */}
      <View className="relative">
        <Image
          source={{ uri: data?.image_url }}
          className="h-72"
          resizeMode="contain"
        />
        <View className="absolute top-12 left-4 bg-white/90 rounded-full p-2">
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={() => router.back()}
          />
        </View>
        <View className="absolute top-12 right-4 bg-white/90 rounded-full p-2">
          <AntDesign name="hearto" size={24} color="#dc2626" />
        </View>
      </View>

      {/* Content Section */}
      <View className="bg-white rounded-t-3xl -mt-6 px-6 pt-6">
        {/* Header Info */}
        <View className="mb-6">
          <View className="flex-row justify-between items-start mb-3">
            <Text className="font-fredokasemi text-3xl text-gray-800 w-3/4">
              {data?.name}
            </Text>
            <View className="bg-green-100 px-3 py-1 rounded-full">
              <Text className="font-fredokasemi text-green-700 text-sm">
                ₹{data?.price}
              </Text>
            </View>
          </View>

          {/* Category Badge */}
          <TouchableOpacity className="flex-row items-center gap-x-2 border-2 border-red-600 rounded-full px-4 py-2 self-start mb-4">
            <MaterialIcons name="restaurant" size={16} color="#dc2626" />
            <Text className="font-fredokasemi text-red-600">
              {data?.categories?.name}
            </Text>
          </TouchableOpacity>

          {/* Rating */}
          <View className="flex-row items-center gap-x-2 mb-4">
            <View className="flex-row items-center gap-x-1">
              {[...Array(5)].map((_, i) => (
                <AntDesign
                  key={i}
                  name={i < Math.floor(data?.rating || 0) ? "star" : "staro"}
                  size={18}
                  color="#fbbf24"
                />
              ))}
            </View>
            <Text className="font-fredoka text-gray-600">
              {data?.rating}/5 • 120 reviews
            </Text>
          </View>
        </View>

        {/* Description */}
        <View className="mb-6 bg-gray-50 rounded-2xl p-4">
          <Text className="font-fredokasemi text-lg text-gray-800 mb-2">
            Description
          </Text>
          <Text className="font-fredoka text-gray-600 leading-6">
            {data?.description}
          </Text>
        </View>

        {/* Category Information */}
        <View className="mb-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-4">
          <Text className="font-fredokasemi text-lg text-gray-800 mb-2">
            About {data?.categories?.name}
          </Text>
          <Text className="font-fredoka text-gray-600 leading-6">
            {getCategoryDescription(data?.categories?.name)}
          </Text>
        </View>

        {/* Nutrition Info */}
        <View className="mb-6">
          <Text className="font-fredokasemi text-lg text-gray-800 mb-3">
            Nutrition Information
          </Text>
          <View className="flex-row justify-between">
            <View className="bg-blue-50 rounded-2xl p-4 w-[48%]">
              <View className="flex-row items-center gap-x-2 mb-2">
                <MaterialIcons
                  name="fitness-center"
                  size={20}
                  color="#3b82f6"
                />
                <Text className="font-fredokasemi text-blue-600">Protein</Text>
              </View>
              <Text className="font-fredoka text-2xl text-blue-800">
                {data?.protein}g
              </Text>
            </View>
            <View className="bg-orange-50 rounded-2xl p-4 w-[48%]">
              <View className="flex-row items-center gap-x-2 mb-2">
                <MaterialIcons
                  name="local-fire-department"
                  size={20}
                  color="#f97316"
                />
                <Text className="font-fredokasemi text-orange-600">
                  Calories
                </Text>
              </View>
              <Text className="font-fredoka text-2xl text-orange-800">
                {data?.calories}
              </Text>
            </View>
          </View>
        </View>

        {/* Customization Section */}
        <View className="mb-6">
          <TouchableOpacity
            className="flex-row justify-between items-center bg-gray-50 rounded-2xl p-4 mb-4"
            onPress={() => setShowCustomization(!showCustomization)}
          >
            <Text className="font-fredokasemi text-lg text-gray-800">
              Customization Options
            </Text>
            <AntDesign
              name={showCustomization ? "up" : "down"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>

          {showCustomization && (
            <View className="bg-white border border-gray-200 rounded-2xl p-4 mb-4">
              {addons.map((option) => (
                <View
                  key={option.$id}
                  className="flex-row justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
                >
                  <View className="w-3/4">
                    <Text className="font-fredoka text-gray-800">
                      {option.name}
                    </Text>
                    {option.menuCustomization && (
                      <Text className="font-fredoka text-sm text-gray-500">
                        Additional Customs: {option.menuCustomization.length}
                      </Text>
                    )}
                  </View>
                  <View className="items-end">
                    {option.price > 0 && (
                      <Text className="font-fredoka text-green-600">
                        +₹{option.price}
                      </Text>
                    )}
                    <TouchableOpacity
                      className="bg-red-100 px-3 py-1 rounded-full mt-1"
                      onPress={() => {
                        if (customs.includes(option.name)) {
                          setCustoms((prev) =>
                            prev.filter((item) => item !== option.name)
                          );
                          setAddonsPrice((prev) => prev - option.price);
                        } else {
                          setCustoms((prev) => [...prev, option.name]);
                          setAddonsPrice((prev) => prev + option.price);
                        }
                      }}
                    >
                      {customs.includes(option.name) ? (
                        <Text className={`font-fredoka text-red-800 text-sm`}>
                          Added
                        </Text>
                      ) : (
                        <Text
                          className={`font-fredoka text-red-600 text-sm disabled`}
                        >
                          Add
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Add to Cart Section */}
        <View className="bg-white border-t border-gray-200 pt-6 pb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-fredokasemi text-lg text-gray-800">
              Quantity
            </Text>
            <View className="flex-row items-center gap-x-4">
              <TouchableOpacity
                onPress={decreaseQuantity}
                className="bg-gray-100 rounded-full p-2"
              >
                <AntDesign name="minus" size={20} color="gray" />
              </TouchableOpacity>
              <Text className="font-fredokasemi text-xl text-gray-800 w-8 text-center">
                {quantity}
              </Text>
              <TouchableOpacity
                onPress={increaseQuantity}
                className="bg-red-100 rounded-full p-2"
              >
                <AntDesign name="plus" size={20} color="#dc2626" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className="bg-red-600 rounded-2xl py-4 flex-row justify-center items-center gap-x-2"
            onPress={() => {
              HandleOrder();
              // console.log("Order: ", order);
            }}
          >
            <MaterialIcons name="shopping-cart" size={24} color="white" />
            <Text className="font-fredokasemi text-white text-lg">
              Add to Cart • ₹
              {((data?.price || 0) * quantity + addonsPrice).toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
