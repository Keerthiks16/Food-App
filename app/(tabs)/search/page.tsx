import CartButton from "@/components/CartButton";
import { getCategories, getMenu } from "@/lib/appwrite";
import useCartStore from "@/zustand/CartStore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const [menu, setMenu] = useState<any[]>([]);
  const [fullMenu, setFullMenu] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {getCartItemCount}= useCartStore();

  const fetchCategories = async () => {
    try {
      const cats = await getCategories();
      setCategories(cats);
      // console.log("Categories: ", cats);
    } catch (e) {
      console.error("Failed to fetch categories", e);
    }
  };

  const fetchMenu = async () => {
    try {
      const items = await getMenu({});
      setMenu(items);
      setFullMenu(items);
    } catch (e) {
      console.error("Failed to fetch menu", e);
    }
  };

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prev) => prev.filter((item) => item !== category));
    } else {
      setSelectedCategories((prev) => [...prev, category]);
    }
  };

  const getFilteredMenu = () => {
    return fullMenu.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.categories?.name);
      return matchesSearch && matchesCategory;
    });
  };

  useEffect(() => {
    fetchCategories();
    fetchMenu();
  }, []);

  const filteredMenu = getFilteredMenu();

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8F0]">
      {/* Search + Categories Header */}
      <View className="px-5 pt-4 pb-2 bg-[#FFF8F0]">
        {/* Top Bar */}
        <View className="flex-row items-center mb-4">
          {/* <Text className="text-2xl font-fredokasemi w-full text-gray-800 flex-1">
            Search
          </Text> */}
          <View className="flex-row items-center mr-2 border border-gray-200 bg-white px-4 py-3 rounded-2xl shadow-sm w-4/5">
            <FontAwesome name="search" size={18} color="#9ca3af" />
            <TextInput
              placeholder="Search your favourites"
              placeholderTextColor="#9ca3af"
              className="ml-2 flex-1 text-sm text-gray-800 font-fredoka"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
          </View>
          <View className="ml-4 mb-2">
          <CartButton cartCount={getCartItemCount()} />
          </View>
        </View>

        {/* Category Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row pb-2"
        >
          {categories.map((cat) => {
            const isSelected = selectedCategories.includes(cat.name);
            return (
              <TouchableOpacity
                key={cat.$id}
                onPress={() => toggleCategory(cat.name)}
                className={`px-4 py-2 mr-3 rounded-full border-2 ${
                  isSelected
                    ? "bg-red-600 border-red-600"
                    : "bg-white border-gray-300"
                }`}
              >
                <Text
                  className={`text-sm font-fredokasemi ${
                    isSelected ? "text-white" : "text-gray-700"
                  }`}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Filtered Menu List */}
      <FlatList
        data={filteredMenu}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName="justify-between px-5"
        contentContainerClassName="pb-32 pt-4"
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-white rounded-2xl p-4 mb-6 shadow-sm w-[47%]"
            onPress={() => {
              router.push(`/menu/${item.$id}`);
            }}
          >
            <Image
              source={{ uri: item.image_url }}
              className="w-full h-32 rounded-xl"
              resizeMode="cover"
            />
            <Text className="mt-3 text-base font-fredokasemi text-gray-800" numberOfLines={2}>
              {item.name}
            </Text>
            <View className="flex-row items-center mt-1">
              <View className="bg-red-100 px-2 py-1 rounded-full">
                <Text className="text-xs font-fredoka text-red-600">
                  {item.categories?.name}
                </Text>
              </View>
            </View>
            <Text className="text-sm font-fredoka text-gray-600 mt-2 leading-5" numberOfLines={2}>
              {item.description}
            </Text>
            <View className="flex-row justify-between items-center mt-3">
              <Text className="text-base font-fredokasemi text-green-700">
                ₹{item.price.toFixed(2)}
              </Text>
              <View className="flex-row items-center">
                <FontAwesome name="star" size={14} color="#fbbf24" />
                <Text className="text-sm font-fredoka text-gray-600 ml-1">
                  {item.rating}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View className="items-center mt-20">
            <FontAwesome name="search" size={60} color="#d1d5db" />
            <Text className="font-fredokasemi text-gray-500 text-lg mt-4 text-center">
              No items found
            </Text>
            <Text className="font-fredoka text-gray-400 text-sm mt-2 text-center px-8">
              Try adjusting your search or filters to find what you're looking for
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Search;