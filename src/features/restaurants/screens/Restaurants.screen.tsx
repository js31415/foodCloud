import React, { useState } from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import { Colors, ActivityIndicator } from "react-native-paper";
import { RestaurantInfoCard } from "features/restaurants/components";
import styled from "styled-components/native";
import { Spacer } from "components/spacer";
import { SafeArea } from "components/utility";
import { Search } from "../components/search.component";
import { useRestaurants } from "services/restaurants/restaurants.context";
import { TouchableOpacity } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RestaurantParamList } from "infrastructure/navigation/restaurant.navigation";
import { RestaurantRequest } from "services/app-interfaces";
import { FavoriteBar } from "components/favorites";
import { useFavorites } from "services/favorites/favorites.context";

type RestaurantScreenProps = StackScreenProps<
  RestaurantParamList,
  "Restaurant"
>;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  left: 50%;
  top: 50%;
`;

export const RestaurantsScreen = (props: RestaurantScreenProps) => {
  const { isLoading, restaurants } = useRestaurants();
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const { state } = useFavorites();

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
        <Search
          isFavoritesToggled={isToggled}
          onFavoritesToggled={() => setIsToggled(!isToggled)}
        />
        {isToggled && (
          <>
            <FavoriteBar
              favorites={state.favorites}
              onNavigation={props.navigation}
            />
          </>
        )}
        {isLoading && (
          <LoadingContainer>
            <Loading size={50} color={Colors.blue500} animating={true} />
          </LoadingContainer>
        )}
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
