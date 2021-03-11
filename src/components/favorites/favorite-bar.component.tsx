import React from "react";
import styled from "styled-components/native";

import { TouchableOpacity, ScrollView } from "react-native";
import { RestaurantRequest } from "services/app-interfaces";
import { Spacer } from "components/spacer";
import { CompactRestaurantInfo } from "components/restaurant";
import { Text } from "components/typography";
import { StackNavigationProp } from "@react-navigation/stack";
import { RestaurantParamList } from "infrastructure/navigation/restaurant.navigation";

interface FavoriteBarProps {
  favorites: RestaurantRequest[];
  onNavigation: StackNavigationProp<RestaurantParamList, "Restaurant">;
}

const FavoriteWrapper = styled.View`
  padding: 10px;
`;

export const FavoriteBar = (props: FavoriteBarProps) => {
  if (!props.favorites.length) {
    return <></>;
  }

  return (
    <FavoriteWrapper>
      <Spacer position="left" size="large">
        <Text variant="caption">Favorites</Text>
      </Spacer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {props.favorites.map((r) => {
          const key = r.name;
          return (
            <Spacer key={key} position="left" size="medium">
              <TouchableOpacity
                onPress={() =>
                  props.onNavigation.navigate("RestaurantDetail", {
                    name: "RestaurantDetail",
                    restaurant: r,
                  })
                }
              >
                <CompactRestaurantInfo restaurant={r} />
              </TouchableOpacity>
            </Spacer>
          );
        })}
      </ScrollView>
    </FavoriteWrapper>
  );
};
