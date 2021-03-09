import React from "react";
import { CompactRestaurantInfo } from "components/restaurant";
import { RestaurantRequest } from "services/app-interfaces";

interface MapCalloutProps {
  restaurant: RestaurantRequest;
}

export const MapCallout = (props: MapCalloutProps) => {
  return (
    <>
      <CompactRestaurantInfo restaurant={props.restaurant} />
    </>
  );
};
