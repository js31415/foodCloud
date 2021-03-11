import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { RestaurantRequest } from "services/app-interfaces";
import { ActionKind, useFavorites } from "services/favorites/favorites.context";

interface FavoriteProps {
  restaurant: RestaurantRequest;
}

const FavoriteButton = styled(TouchableOpacity)`
  position: absolute;
  right: 25px;
  top: 25px;
  z-index: 9;
`;

export const Favorite = (props: FavoriteProps) => {
  const { state, dispatch } = useFavorites();
  const isFavorite = state.favorites.find(
    (r) => r.placeId === props.restaurant.placeId
  );
  return (
    <FavoriteButton
      onPress={() =>
        !isFavorite
          ? dispatch({
              type: ActionKind.AddToFavorite,
              payload: props.restaurant,
            })
          : dispatch({
              type: ActionKind.RemoveFromFavorite,
              payload: props.restaurant,
            })
      }
    >
      <AntDesign
        name={isFavorite ? "heart" : "hearto"}
        size={24}
        color={isFavorite ? "red" : "white"}
      />
    </FavoriteButton>
  );
};
