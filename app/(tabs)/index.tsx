import CartButton from "@/components/CartButton";
import { images, offers } from "@/constants";
import useAuthStore from "@/store/auth.store";
import useCartStore from "@/zustand/CartStore";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useAuthStore();
  const { getCartItemCount } = useCartStore();
  // console.log("User: ", JSON.stringify(user, null, 2));
  return (
    <SafeAreaView className="flex-1 bg-[#FFF8F0]">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={offers}
        ListHeaderComponent={() => (
          <View className="flex-row w-full my-5 px-5 justify-between">
            <View className="flex-start">
              <Text className="font-fredoka">Welcome {user?.name}</Text>
              <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
                <Text className="font-fredokasemi">Mumbai</Text>
                <Image
                  source={images.arrowDown}
                  className="size-3 mt-1"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <CartButton cartCount={getCartItemCount()} />
          </View>
        )}
       
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;
          return (
            <Pressable
              style={{ backgroundColor: item.color }}
              className={`h-40 m-2 overflow-hidden rounded-2xl ${isEven ? "flex-row" : "flex-row-reverse"}`}
              android_ripple={{ color: "#fffff22" }}
              onPress={() => router.push(`/offers/${item.id}`)}
            >
              <View className={` ${isEven ? "ml-4" : "mr-4"}`}>
                <Text
                  className={`font-fredokabold flex-wrap text-2xl text-white mt-6`}
                >
                  {item.title}
                </Text>
                <Image
                  source={images.arrowRight}
                  className="size-10"
                  resizeMode="contain"
                />
              </View>
              <Image
                source={item.image}
                className={`size-56 ${isEven ? "ml-4 bottom-4" : "mr-2"}`}
                resizeMode="contain"
              />
            </Pressable>
          );
        }}

         ListFooterComponent={() => (
  <View className="px-5 pb-20">
    {/* Why Choose Us Section */}
    <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
      <Text className="text-xl font-fredokasemi text-gray-800 mb-4 text-center">
        Why Choose QuickBite?
      </Text>
      <View className="space-y-4">
        <View className="flex-row items-center">
          <View className="bg-red-100 p-3 rounded-full mr-4">
            <FontAwesome name="clock-o" size={20} color="#dc2626" />
          </View>
          <View className="flex-1">
            <Text className="font-fredokasemi text-gray-800 text-base">
              Lightning Fast Delivery
            </Text>
            <Text className="font-fredoka text-gray-600 text-sm mt-1">
              Get your favorite food delivered in under 30 minutes
            </Text>
          </View>
        </View>
        
        <View className="flex-row items-center">
          <View className="bg-green-100 p-3 rounded-full mr-4">
            <FontAwesome name="leaf" size={20} color="#16a34a" />
          </View>
          <View className="flex-1">
            <Text className="font-fredokasemi text-gray-800 text-base">
              Fresh Ingredients
            </Text>
            <Text className="font-fredoka text-gray-600 text-sm mt-1">
              Made with the freshest ingredients, sourced daily
            </Text>
          </View>
        </View>
        
        <View className="flex-row items-center">
          <View className="bg-blue-100 p-3 rounded-full mr-4">
            <FontAwesome name="star" size={20} color="#2563eb" />
          </View>
          <View className="flex-1">
            <Text className="font-fredokasemi text-gray-800 text-base">
              5-Star Quality
            </Text>
            <Text className="font-fredoka text-gray-600 text-sm mt-1">
              Consistently rated 5 stars by our happy customers
            </Text>
          </View>
        </View>
      </View>
    </View>

    {/* Stats Section */}
    <View className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-6 shadow-sm mb-6">
      <Text className="text-xl font-fredokasemi text-black mb-4 text-center">
        Our Numbers Speak
      </Text>
      <View className="flex-row justify-around">
        <View className="items-center">
          <Text className="text-2xl font-fredokasemi text-black">50K+</Text>
          <Text className="font-fredoka text-red-600 text-sm">Happy Customers</Text>
        </View>
        <View className="items-center">
          <Text className="text-2xl font-fredokasemi text-black">1M+</Text>
          <Text className="font-fredoka text-red-600 text-sm">Orders Delivered</Text>
        </View>
        <View className="items-center">
          <Text className="text-2xl font-fredokasemi text-black">4.9★</Text>
          <Text className="font-fredoka text-red-600 text-sm">Average Rating</Text>
        </View>
      </View>
    </View>

    {/* How It Works Section */}
    <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
      <Text className="text-xl font-fredokasemi text-gray-800 mb-4 text-center">
        How It Works
      </Text>
      <View className="space-y-4">
        <View className="flex-row items-center">
          <View className="bg-red-600 rounded-full w-8 h-8 items-center justify-center mr-4">
            <Text className="text-white font-fredokasemi text-sm">1</Text>
          </View>
          <View className="flex-1">
            <Text className="font-fredokasemi text-gray-800">Browse & Select</Text>
            <Text className="font-fredoka text-gray-600 text-sm">Choose from our delicious menu items</Text>
          </View>
        </View>
        
        <View className="flex-row items-center">
          <View className="bg-red-600 rounded-full w-8 h-8 items-center justify-center mr-4">
            <Text className="text-white font-fredokasemi text-sm">2</Text>
          </View>
          <View className="flex-1">
            <Text className="font-fredokasemi text-gray-800">Customize & Order</Text>
            <Text className="font-fredoka text-gray-600 text-sm">Add your preferences and place your order</Text>
          </View>
        </View>
        
        <View className="flex-row items-center">
          <View className="bg-red-600 rounded-full w-8 h-8 items-center justify-center mr-4">
            <Text className="text-white font-fredokasemi text-sm">3</Text>
          </View>
          <View className="flex-1">
            <Text className="font-fredokasemi text-gray-800">Track & Enjoy</Text>
            <Text className="font-fredoka text-gray-600 text-sm">Track your order and enjoy hot, fresh food</Text>
          </View>
        </View>
      </View>
    </View>

    {/* Customer Reviews Section */}
    <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
      <Text className="text-xl font-fredokasemi text-gray-800 mb-4 text-center">
        What Our Customers Say
      </Text>
      <View className="space-y-4">
        <View className="bg-gray-50 rounded-xl p-4">
          <View className="flex-row items-center mb-2">
            <View className="flex-row">
              {[1,2,3,4,5].map((star) => (
                <FontAwesome key={star} name="star" size={12} color="#fbbf24" />
              ))}
            </View>
            <Text className="font-fredokasemi text-gray-800 text-sm ml-2">Sarah M.</Text>
          </View>
          <Text className="font-fredoka text-gray-600 text-sm">
            "Best fast food delivery in town! Always fresh and arrives super quick. The burgers are amazing!"
          </Text>
        </View>
        
        <View className="bg-gray-50 rounded-xl p-4">
          <View className="flex-row items-center mb-2">
            <View className="flex-row">
              {[1,2,3,4,5].map((star) => (
                <FontAwesome key={star} name="star" size={12} color="#fbbf24" />
              ))}
            </View>
            <Text className="font-fredokasemi text-gray-800 text-sm ml-2">Mike R.</Text>
          </View>
          <Text className="font-fredoka text-gray-600 text-sm">
            "Love the variety and quality. Perfect for late-night cravings. Highly recommend!"
          </Text>
        </View>
      </View>
    </View>

    {/* Contact Info Section */}
    <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
      <Text className="text-xl font-fredokasemi text-gray-800 mb-4 text-center">
        Get In Touch
      </Text>
      <View className="space-y-3">
        <View className="flex-row items-center">
          <FontAwesome name="phone" size={16} color="#dc2626" />
          <Text className="font-fredoka text-gray-600 ml-3">+91 98765 43210</Text>
        </View>
        <View className="flex-row items-center">
          <FontAwesome name="envelope" size={16} color="#dc2626" />
          <Text className="font-fredoka text-gray-600 ml-3">hello@quickbite.com</Text>
        </View>
        <View className="flex-row items-center">
          <FontAwesome name="map-marker" size={16} color="#dc2626" />
          <Text className="font-fredoka text-gray-600 ml-3">123 Food Street, Mumbai, India</Text>
        </View>
      </View>
    </View>

    {/* Operating Hours */}
    <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
      <Text className="text-xl font-fredokasemi text-gray-800 mb-4 text-center">
        Operating Hours
      </Text>
      <View className="space-y-2">
        <View className="flex-row justify-between">
          <Text className="font-fredoka text-gray-600">Monday - Friday</Text>
          <Text className="font-fredokasemi text-gray-800">9:00 AM - 11:00 PM</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-fredoka text-gray-600">Saturday - Sunday</Text>
          <Text className="font-fredokasemi text-gray-800">10:00 AM - 12:00 AM</Text>
        </View>
      </View>
    </View>

    {/* Footer */}
    <View className="bg-gray-800 rounded-2xl p-6 shadow-sm">
      <View className="items-center">
        <Text className="text-2xl font-fredokasemi text-white mb-2">QuickBite</Text>
        <Text className="font-fredoka text-gray-300 text-center text-sm mb-4">
          Delivering happiness, one meal at a time
        </Text>
        <View className="flex-row space-x-4">
          <TouchableOpacity className="bg-white rounded-full p-3">
            <FontAwesome name="facebook" size={20} color="#1877f2" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-white rounded-full p-3">
            <FontAwesome name="instagram" size={20} color="#e4405f" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-white rounded-full p-3">
            <FontAwesome name="twitter" size={20} color="#1da1f2" />
          </TouchableOpacity>
        </View>
        <Text className="font-fredoka text-gray-400 text-xs mt-4 text-center">
          © 2024 QuickBite. All rights reserved.
        </Text>
      </View>
    </View>
  </View>
)}
      />
    </SafeAreaView>
  );
}
