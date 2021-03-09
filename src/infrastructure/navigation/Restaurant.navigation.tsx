import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import {
  RestaurantDetailScreen,
  RestaurantsScreen,
} from "features/restaurants/screens";
import { RestaurantRequest } from "services/app-interfaces";

export type RestaurantParamList = {
  Restaurant: { name: string };
  RestaurantDetail: { name?: string; restaurant: RestaurantRequest };
};

const RestaurantStack = createStackNavigator<RestaurantParamList>();

export const RestaurantNavigator = () => {
  return (
    <RestaurantStack.Navigator
      headerMode="none"
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <RestaurantStack.Screen name="Restaurant" component={RestaurantsScreen} />
      <RestaurantStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
      />
    </RestaurantStack.Navigator>
  );
};
