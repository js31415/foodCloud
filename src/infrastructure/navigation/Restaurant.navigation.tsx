import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { RestaurantsScreen } from "features/restaurants/screens";

type RestauratnParamList = {
  Restaurant: { name: string };
};

const RestaurantStack = createStackNavigator<RestauratnParamList>();

export const RestaurantNavigator = () => {
  return (
    <RestaurantStack.Navigator headerMode="none">
      <RestaurantStack.Screen name="Restaurant" component={RestaurantsScreen} />
    </RestaurantStack.Navigator>
  );
};
