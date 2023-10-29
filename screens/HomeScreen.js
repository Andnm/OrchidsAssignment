import { useIsFocused } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EntypoIcon from "react-native-vector-icons/Entypo";
import Card from "../components/Card";
import Loading from "../components/Loading";
import useFavorite from "../hooks/useFavorite";
// Sample data

const orchidsList = [
  {
    id: 1,
    name: "Amabilis",
    category: "Phalaenopsis",
    text: `The Phalaenopsis amabilis, also known as the "Queen of the Orchids," is renowned for its pure white, fragrant flowers.`,
    image: {uri: 'https://www.nparks.gov.sg/-/media/ffw/migrated/round2/flora/5881/999040af1dee48248a863d1666a5d4c1.ashx'},
  },
  {
    id: 2,
    name: "Equestris",
    category: "Phalaenopsis",
    text: "Phalaenopsis equestris features small, often pink or purple flowers with unique spots and stripes on the petals.",
    image: {uri: 'https://drbillsorchids.com/cdn/shop/products/phalaenopsis-equestris-pink-purple-442145.jpg?v=1696958067'},
  },
  {
    id: 3,
    name: "Schilleriana",
    category: "Phalaenopsis",
    text: "Phalaenopsis schilleriana is known for its elegant, tongue-shaped petals and intricate veining.",
    image: {uri: 'https://www.orchidsforeurope.com/storage/images/image?remote=https%3A%2F%2Fwww.orchidsforeurope.com%2FWebRoot%2FStore25%2FShops%2F89807534%2F6042%2F0ED9%2FBD4E%2F29CC%2FB98C%2F0A0C%2F6D0E%2FB247%2FP.schilleriana.png&shop=89807534'}
  },
  {
    id: 4,
    name: "Trianae",
    category: "Cattleya",
    text: "Cattleya trianae is celebrated for its large, usually deep purple or pink flowers and is the national flower of Colombia.",
    image: {uri: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Cattleya_trianae.jpg'},
  },
  {
    id: 5,
    name: "Labiata",
    category: "Cattleya",
    text: "Cattleya labiata boasts dark pink or purple petals and emits a delightful, captivating fragrance.",
    image: {uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/A_and_B_Larsen_orchids_-_Cattleya_labiata_1067-11.jpg/1280px-A_and_B_Larsen_orchids_-_Cattleya_labiata_1067-11.jpg'},
  },
  {
    id: 6,
    name: "Maxima",
    category: "Cattleya",
    text: "Cattleya maxima stands out with its vibrant, purple or pink flowers and alluring shape.",
    image: {uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Cattleya_maxima_Orchi_01.jpg/1200px-Cattleya_maxima_Orchi_01.jpg'},
  },
  {
    id: 7,
    name: "Nobile",
    category: "Dendrobium",
    text: "Dendrobium nobile presents white or pink flowers and is commonly found in the Himalayan and East Asian regions.",
    image: {uri: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Dendrobium_nobile_-_flower_view_01.jpg'},
  },
  {
    id: 8,
    name: "Chrysotoxum",
    category: "Dendrobium",
    text: "Dendrobium chrysotoxum features bright yellow flowers and is often found in Southeast Asia.",
    image: {uri: 'https://potsandpetals.in/wp-content/uploads/2021/04/cryso11__1641107339_99.246.51.241.jpg'},
  },
  // Add more orchids as needed
];

const HomeScreen = ({ navigation }) => {
  // const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { addToFavorites, favorites, loading } = useFavorite(isFocused);
  const [orchids, setOrchids] = useState(orchidsList);
  const { top } = useSafeAreaInsets();

  const goToDetailScreen = (orchid) => {
    navigation.navigate("HomeDetail", { orchid });
  };

  //filter
  const availableCategories = ["All", "Phalaenopsis", "Cattleya", "Dendrobium"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleFilter = (category) => {
    setSelectedCategory(category);
  };

  const filteredOrchids = selectedCategory === "All"
    ? orchidsList
    : orchidsList.filter((orchid) => orchid.category === selectedCategory);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => goToDetailScreen(item)}>
      <Card item={item} data={favorites} onPress={() => addToFavorites(item)} />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1" style={{ marginTop: top }}>
      <View className="justify-between items-center flex-row px-4 my-4">
        <Text className="text-2xl font-bold ">Orchids</Text>
      </View>

      <View className="mb-2" />

      <View className="flex-row px-4 mb-3">
        {availableCategories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => handleFilter(category)}
            style={{
                borderWidth: 1, 
                borderColor: selectedCategory === category ? "red" : "gray", 
                borderRadius: 5, 
                paddingHorizontal: 10, 
                paddingVertical: 5,
                marginRight: 10, 
              }}
          >
            <Text
              className={
                selectedCategory === category ? "text-red-500" : "text-gray-500"
              }
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={filteredOrchids}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          className="px-4"
        />
      )}
    </View>
  );
};

export default HomeScreen;
