import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { MapCallout, Search } from "../components";
import { useRestaurants } from "services/restaurants/restaurants.context";
import { useLocation } from "services/locations/locations.context";
import MapView, { Marker, Callout } from "react-native-maps";
import { RestaurantRequest } from "services/app-interfaces";
import { StackScreenProps } from "@react-navigation/stack";
import { TabParamList } from "infrastructure/navigation/app.navigation";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

type MapScreenProps = StackScreenProps<TabParamList, "Map">;

export const MapScreen = (props: MapScreenProps) => {
  const { restaurants } = useRestaurants();
  const { location } = useLocation();
  const [latDelta, setLatDelta] = useState(0);

  useEffect(() => {
    const northeastLat = location!.viewport.northeast.lat;
    const southwestLat = location!.viewport.southwest.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [location]);

  return (
    <>
      <Search />
      <Map
        region={{
          latitude: location!.coordinates.lat || 0,
          longitude: location!.coordinates.lng || 0,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {restaurants!.map((restaurant: RestaurantRequest) => {
          return (
            <Marker
              key={restaurant.name}
              title={restaurant.name}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
            >
              <Callout
                onPress={() =>
                  props.navigation.navigate("RestaurantDetail", {
                    restaurant: restaurant,
                  })
                }
              >
                <MapCallout restaurant={restaurant} />
              </Callout>
            </Marker>
          );
        })}
      </Map>
    </>
  );
};
