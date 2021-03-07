import React from "react";
import { View, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import { RestaurantInfoCard } from "features/restaurants/components";
import styled from "styled-components/native";
import { Spacer } from "components/spacer";
import { SafeArea } from "components/utility";

const mockRestaurant = {
  name: "I55",
  icon:
    "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
  photos: [
    "https://i1.wp.com/i55.hu/wp-content/uploads/2019/02/MAT_1393.jpg?fit=1024%2C676",
  ],
  address: "1054 Budapest, Alkotmány utca 20.",
  isOpenNow: true,
  rating: 5,
  isClosedTemporarily: true,
};

const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[3]};
`;

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const RestaurantsScreen = () => {
  return (
    <>
      <SafeArea>
        <SearchContainer>
          <Searchbar value={""} />
        </SearchContainer>
        <RestaurantList
          data={[
            { name: 1 },
            { name: 2 },
            { name: 3 },
            { name: 4 },
            { name: 5 },
            { name: 6 },
            { name: 7 },
            { name: 8 },
            { name: 9 },
            { name: 10 },
            { name: 11 },
          ]}
          renderItem={() => (
            <Spacer position="bottom" size="large">
              <RestaurantInfoCard restaurant={mockRestaurant} />
            </Spacer>
          )}
          keyExtractor={(item: any) => item.name}
        />
      </SafeArea>
    </>
  );
};
