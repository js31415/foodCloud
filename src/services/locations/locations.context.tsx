import React, {
  useState,
  createContext,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import { LocationResult } from "services/app-interfaces";

import { locationRequest, locationTransform } from "./locations.services";

type LocationContextType = {
  isLoading: boolean;
  error: null | string;
  location: LocationResult | undefined;
  keyword: string;
  setKeyword: (value: string) => void;
};

export const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

const LocationContextProvider = (props: { children: ReactNode }) => {
  const [keyword, setKeyword] = useState<string>("san francisco");
  const [location, setLocation] = useState<LocationResult | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (!keyword.length) {
      return;
    }
    setIsLoading(true);
    locationRequest(keyword.toLowerCase())
      .then(locationTransform)
      .then((result) => {
        setIsLoading(false);
        setLocation(result);
      })
      .catch((err) => {
        setError(err);
      });
  }, [keyword]);

  return (
    <LocationContext.Provider
      value={{
        isLoading,
        error,
        location,
        keyword,
        setKeyword,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};

function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }

  return context;
}

export { LocationContextProvider, useLocation };
