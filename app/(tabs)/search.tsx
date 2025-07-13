import CartButton from "@/components/CartButton";
import { getCategories, getMenu } from "@/lib/appwrite";
import FontAwesome from "@expo/vector-icons/FontAwesome";
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
        <View className="flex-row items-center mb-3">
          <Text className="text-lg font-semibold flex-1 font-fredoka">
            Search
          </Text>
          <View className="flex-row items-center mr-2 border border-gray-200 bg-white px-4 py-2 rounded-full shadow-sm w-4/6">
            <FontAwesome name="search" size={18} color="gray" />
            <TextInput
              placeholder="Search your favourites"
              placeholderTextColor="#888"
              className="ml-2 flex-1 text-sm text-black"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
          </View>
          <CartButton cartCount={3} />
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
                className={`px-4 py-2 mr-2 rounded-full border ${
                  isSelected
                    ? "bg-blue-900 border-blue-950"
                    : "bg-white border-gray-300"
                }`}
              >
                <Text
                  className={`text-sm ${
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
          <TouchableOpacity className="bg-white rounded-xl p-3 mb-6 shadow-md w-[47%]">
            <Image
              source={{ uri: item.image_url }}
              className="w-full h-32 rounded-md"
              resizeMode="cover"
            />
            <Text className="mt-2 text-base font-semibold text-black">
              {item.name}
            </Text>
            <Text className="text-xs text-gray-500">
              {item.categories?.name}
            </Text>
            <Text className="text-sm text-gray-700 mt-1" numberOfLines={2}>
              {item.description}
            </Text>
            <View className="flex-row justify-between mt-2">
              <Text className="text-sm font-bold text-green-700">
                ₹{item.price.toFixed(2)}
              </Text>
              <Text className="text-sm text-yellow-600">⭐ {item.rating}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View className="items-center mt-20">
            <Text className="text-gray-500 text-sm text-center">
              Apologies, but your favourites aren’t available currently.
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
