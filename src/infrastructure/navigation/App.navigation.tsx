import React from "react";
import { SafeArea } from "components/utility";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RestaurantNavigator } from "./restaurant.navigation";
import { MapScreen } from "features/map/screens";
import { RestaurantRequest } from "services/app-interfaces";
import { logoutUser } from "services/authentication/authentication.context";
import { FavoritesContextProvider } from "services/favorites/favorites.context";
import { LocationContextProvider } from "services/locations/locations.context";
import { RestaurantsContextProvider } from "services/restaurants/restaurants.context";

export type TabParamList = {
  Restaurant: { name: string };
  RestaurantDetail: { name?: string; restaurant: RestaurantRequest };
  Map: { name: string };
  Settings: { name: string };
};

interface ScreenOptionsProps {
  route: RouteProp<TabParamList, keyof TabParamList>;
}

interface tabOptionsProps {
  color: string;
  focused: boolean;
  size: number;
}

const Tab = createBottomTabNavigator<TabParamList>();

const TAB_ICONS = {
  Restaurant: "md-restaurant",
  Map: "md-map",
  Settings: "md-settings",
  RestaurantDetail: "md-restaurant",
};

const tabBarOptions = {
  activeTintColor: "tomato",
  inactiveTintColor: "gray",
};

const Settings = () => {
  return (
    <SafeArea>
      <Button onPress={() => logoutUser()}> Logout </Button>
    </SafeArea>
  );
};

const createScreenOptions = (props: ScreenOptionsProps) => {
  const iconName: any = TAB_ICONS[props.route.name];
  return {
    tabBarIcon: (tabProps: tabOptionsProps) => {
      return (
        <Ionicons name={iconName} size={tabProps.size} color={tabProps.color} />
      );
    },
  };
};

export const AppNavigator = () => {
  return (
    <FavoritesContextProvider>
      <LocationContextProvider>
        <RestaurantsContextProvider>
          <Tab.Navigator
            screenOptions={createScreenOptions}
            tabBarOptions={tabBarOptions}
          >
            <Tab.Screen name="Restaurant" component={RestaurantNavigator} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Settings" component={Settings} />
          </Tab.Navigator>
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </FavoritesContextProvider>
  );
};
