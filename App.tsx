import React from "react";
import { Text } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { RestaurantsScreen } from "./src/features/restaurants/screens";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";
import { SafeArea } from "./src/components/utility";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

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
      console.log(props);
      return (
        <Ionicons name={iconName} size={tabProps.size} color={tabProps.color} />
      );
    },
  };
};

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={createScreenOptions}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Restaurant" component={RestaurantsScreen} />
      <Tab.Screen name="Map" component={Settings} />
      <Tab.Screen name="Settings" component={Map} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [oswaldLoaded] = useOswald({ Oswald_400Regular });
  const [latoLoaded] = useLato({ Lato_400Regular });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <BottomNavigation />
        </NavigationContainer>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
