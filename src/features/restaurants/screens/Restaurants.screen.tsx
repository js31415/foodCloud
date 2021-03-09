import React from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import { Colors, ActivityIndicator } from "react-native-paper";
import { RestaurantInfoCard } from "features/restaurants/components";
import styled from "styled-components/native";
import { Spacer } from "components/spacer";
import { SafeArea } from "components/utility";
import { Search } from "../components/search.component";
import { useRestaurants } from "services/restaurants/restaurants.context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackScreenProps } from "@react-navigation/stack";
import { RestaurantParamList } from "infrastructure/navigation/restaurant.navigation";
import { RestaurantRequest } from "services/app-interfaces";

type RestaurantScreenProps = StackScreenProps<
  RestaurantParamList,
  "Restaurant"
>;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left 50%;
`;

export const RestaurantsScreen = (props: RestaurantScreenProps) => {
  const { isLoading, restaurants } = useRestaurants();

  const renderItem: ListRenderItem<RestaurantRequest> = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("RestaurantDetail", {
            restaurant: item,
          })
        }
      >
        <Spacer position="bottom" size="large">
          <RestaurantInfoCard restaurant={item} />
        </Spacer>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeArea>
        {isLoading && (
          <LoadingContainer>
            <Loading size={50} color={Colors.blue500} animating={true} />
          </LoadingContainer>
        )}
        <Search />
        <FlatList
          data={restaurants}
          contentContainerStyle={styles.listContainer}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.name}
        />
      </SafeArea>
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
});
