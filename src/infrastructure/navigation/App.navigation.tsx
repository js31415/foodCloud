import React from "react";
import { Text } from "react-native";
import { SafeArea } from "components/utility";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RestaurantNavigator } from "./Restaurant.navigation";

type TabParamList = {
  Restaurant: { name: string };
  Map: { name: string };
  Settings: { name: string };
};

interface ScreenOptionsProps {
  route: RouteProp<TabParamList, keyof TabParamList>;
  navigation: any;
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
};

const Settings = () => (
  <SafeArea>
    <Text>{"settings"}</Text>
  </SafeArea>
);
const Map = () => (
  <SafeArea>
    <Text>{"map"}</Text>
  </SafeArea>
);

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
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={createScreenOptions}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Restaurant" component={RestaurantNavigator} />
        <Tab.Screen name="Map" component={Settings} />
        <Tab.Screen name="Settings" component={Map} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
