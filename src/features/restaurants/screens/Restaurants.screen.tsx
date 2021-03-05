import React from "react";
import { View, SafeAreaView } from "react-native";
import { Searchbar } from "react-native-paper";
import { RestaurantInfoCard } from "features/restaurants/components";
import styled from "styled-components/native";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
`;

const SearchContainer = styled(View)`
  padding: 16px;
`;

const RestaurantListContainer = styled(View)`
  flex: 1;
  padding: 16px;
`;

export const RestaurantsScreen = () => {
  return (
    <>
      <SafeArea>
        <SearchContainer>
          <Searchbar value={""} />
        </SearchContainer>
        <RestaurantListContainer>
          <RestaurantInfoCard
            name={"I55"}
            icon={""}
            photos={[
              "https://i1.wp.com/i55.hu/wp-content/uploads/2019/02/MAT_1393.jpg?fit=1024%2C676",
            ]}
            address={"1054 Budapest, Alkotmány utca 20."}
            isOpenNow={true}
            rating={5}
          />
        </RestaurantListContainer>
      </SafeArea>
    </>
  );
};
