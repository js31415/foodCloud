import React from "react";
import styled from "styled-components/native";
import WebView from "react-native-webview";
import { Platform } from "react-native";

import { Text } from "../typography";
import { RestaurantRequest } from "services/app-interfaces";

interface CompactRestaurantInfoProps {
  restaurant: RestaurantRequest;
}

const CompactImage = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const CompactWebview = styled(WebView)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const Item = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;

const isAndroid = Platform.OS === "android";

export const CompactRestaurantInfo = (props: CompactRestaurantInfoProps) => {
  return (
    <Item>
      {isAndroid ? (
        <CompactWebview source={{ uri: props.restaurant.photos[0] }} />
      ) : (
        <CompactImage source={{ uri: props.restaurant.photos[0] }} />
      )}
      <Text variant="caption" numberOfLines={3}>
        {props.restaurant.name}
      </Text>
    </Item>
  );
};
