import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";

export default function Card({ item, data, onPress }) {
  return (
    <View className="border-gray-400 border-2 p-2 rounded-2xl mb-4 flex-row items-center relative">
      <Image
        source={item.image}
        className="w-32 h-32 rounded-2xl"
        style={{ resizeMode: "contain" }}
      />
      
      <View className="ml-3">
        <Text className="text-lg">{item.name}</Text>
        <Text className="text-xs">{item.category}</Text>
      </View>

      <TouchableOpacity className="p-1 rounded-lg absolute top-2 right-2" onPress={onPress}>
        {data && item ? (
          <FAIcon
            name={
              data.find((favorite) => favorite.id === item.id)
                ? "heart"
                : "heart-o"
            }
            size={20}
            color="red"
            className="text-red-500"
          />
        ) : (
          <>
            <FAIcon
              name={"remove"}
              size={20}
              color="red"
              className="text-black"
            />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}
