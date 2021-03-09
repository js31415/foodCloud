import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  restaurantsRequest,
  restaurantTransform,
} from "./restaurants.services";

import { useLocation } from "../locations/locations.context";
import { RestaurantRequest } from "services/app-interfaces";

type RestaurantsContextType = {
  restaurants: RestaurantRequest[] | undefined;
  isLoading: boolean;
  error: null | string;
};

export const RestaurantsContext = createContext<
  RestaurantsContextType | undefined
>(undefined);

const RestaurantsContextProvider = (props: { children: ReactNode }) => {
  const [restaurants, setRestaurants] = useState<
    RestaurantRequest[] | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location } = useLocation();

  const retriveRestaurants = (loc: string) => {
    setIsLoading(true);
    setRestaurants([]);

    setTimeout(() => {
      restaurantsRequest(loc)
        .then(restaurantTransform)
        .then((results) => {
          setIsLoading(false);
          setRestaurants(results);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    }, 2000);
  };

  useEffect(() => {
    if (location) {
      const locationString = `${location.coordinates.lat},${location.coordinates.lng}`;
      retriveRestaurants(locationString);
    }
  }, [location]);

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        isLoading,
        error,
      }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};

function useRestaurants() {
  const context = useContext(RestaurantsContext);
  if (context === undefined) {
    throw new Error("useRestaurants must be used within a RestaurantsProvider");
  }
  return context;
}

export { RestaurantsContextProvider, useRestaurants };
