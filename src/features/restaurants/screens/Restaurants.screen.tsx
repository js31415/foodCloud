import React from "react";
import { FlatList } from "react-native";
import { Colors, ActivityIndicator } from "react-native-paper";
import { RestaurantInfoCard } from "features/restaurants/components";
import styled from "styled-components/native";
import { Spacer } from "components/spacer";
import { SafeArea } from "components/utility";
import { Search } from "../components/Search.component";
import {
  RestaurantsContext,
  useRestaurants,
} from "services/restaurants/restaurants.context";

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left 50%;
`;

export const RestaurantsScreen = () => {
  const { isLoading, restaurants } = useRestaurants(RestaurantsContext);

  return (
    <>
      <SafeArea>
        {isLoading && (
          <LoadingContainer>
            <Loading size={50} color={Colors.blue500} animating={true} />
          </LoadingContainer>
        )}
        <Search />
        <RestaurantList
          data={restaurants}
          renderItem={({ item }) => (
            <Spacer position="bottom" size="large">
              <RestaurantInfoCard restaurant={item} />
            </Spacer>
          )}
          keyExtractor={(item: any) => item.name}
        />
      </SafeArea>
    </>
  );
};
