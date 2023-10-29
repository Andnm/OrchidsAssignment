import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Icon } from 'react-native-elements';
import { enableScreens } from 'react-native-screens';
import DetailScreen from './screens/DetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import HomeScreen from './screens/HomeScreen';
import { TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

enableScreens();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator initialRouteName='Home' >
    <Stack.Screen name="Home" options={({ navigation }) => ({
      headerShown: false,
    })} component={HomeScreen} />
    <Stack.Screen name="HomeDetail" component={DetailScreen}  />
  </Stack.Navigator>
);

const TabNavigate = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: 'green',
    }}
  >
    <Tab.Screen
      name="HomeRoot"
      component={HomeStack}
      options={{
        headerShown: false,
        tabBarLabel: 'Home',
        unmountOnBlur: true,
        tabBarIcon: ({ color }) => (
          <Icon name="home" type="font-awesome" color={color} />
        ),
        tabBarButton: (props) => <CustomButton {...props} navigateName='HomeRoot' screen='Home' />,
      }}
    />
    <Tab.Screen
      name="FavoritesRoot"
      component={FavoritesStack}
      options={{
        headerShown: false,
        tabBarLabel: 'Favorites',
        unmountOnBlur: true,
        tabBarIcon: ({ color }) => (
          <Icon name="heart" type="font-awesome" color={color} />
        ),
        tabBarButton: (props) => <CustomButton {...props} navigateName='FavoritesRoot' screen='Favorites' />,
      }}
    />
  </Tab.Navigator>
)

const FavoritesStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Favorites"
      component={FavoritesScreen}
      options={({ navigation }) => ({
        headerShown: false,
      })}
    />
    <Stack.Screen name="FavoriteDetail" component={DetailScreen} o />
  </Stack.Navigator>
);

const CustomButton = (props) => {
  const navigation = useNavigation();
  const { navigateName, screen } = props;

  const handlePress = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: navigateName }],
    });
    navigation.navigate(navigateName, { screen });
  };

  return (
    <TouchableOpacity {...props} onPress={handlePress} />
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigate />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
