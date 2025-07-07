import CartButton from "@/components/CartButton";
import { images, offers } from "@/constants";
import useAuthStore from "@/store/auth.store";
import * as Sentry from "@sentry/react-native";
import {
  Button,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const {user}=useAuthStore();
  console.log("User: ",JSON.stringify(user,null,2))
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
            <CartButton cartCount={3} />
          </View>
        )}
      
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;
          return (
            <Pressable
              style={{ backgroundColor: item.color }}
              className={`h-40 m-2 overflow-hidden rounded-2xl ${isEven ? "flex-row" : "flex-row-reverse"}`}
              android_ripple={{ color: "#fffff22" }}
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
      />
    </SafeAreaView>
  );
}
