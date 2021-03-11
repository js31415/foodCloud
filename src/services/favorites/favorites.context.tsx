import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { RestaurantRequest } from "services/app-interfaces";
import { useAuthentication } from "services/authentication/authentication.context";

export enum ActionKind {
  AddToFavorite = "ADD_TO_FAVORITE",
  RemoveFromFavorite = "REMOVE_FROM_FAVORITE",
  GetFavorites = "GET_FAVORITES",
}

type Action =
  | { type: ActionKind.AddToFavorite; payload: RestaurantRequest }
  | { type: ActionKind.RemoveFromFavorite; payload: RestaurantRequest }
  | { type: ActionKind.GetFavorites; payload: RestaurantRequest[] };

type Dispatch = (action: Action) => void;
type State = { favorites: Array<RestaurantRequest> | [] };
type FavoritesProviderProps = { children: ReactNode };

type FavoritesContextType = {
  state: State;
  dispatch: Dispatch;
};

const initialFavoritesState: State = {
  favorites: [],
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

function favoritesReducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionKind.GetFavorites: {
      return { favorites: [...state.favorites, ...action.payload] };
    }
    case ActionKind.AddToFavorite: {
      return { favorites: [...state.favorites, { ...action.payload }] };
    }
    case ActionKind.RemoveFromFavorite: {
      return {
        favorites: state.favorites.filter(
          (restaurant) => restaurant.placeId !== action.payload.placeId
        ),
      };
    }
    default: {
      return state;
    }
  }
}

const FavoritesContextProvider = (props: FavoritesProviderProps) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialFavoritesState);
  const {
    state: { user },
  } = useAuthentication();

  const saveFavorites = async (
    value: RestaurantRequest[] | [],
    uid: string
  ) => {
    if (!value.length) {
      return;
    }
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@favoritesStorage-${uid}`, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const loadFavorites = async (uid: string) => {
    try {
      const value = await AsyncStorage.getItem(`@favoritesStorage-${uid}`);
      if (value !== null && value.length) {
        const restaurants: RestaurantRequest[] = await JSON.parse(value);
        dispatch({
          type: ActionKind.GetFavorites,
          payload: restaurants,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (user) {
      loadFavorites(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      saveFavorites(state.favorites, user.uid);
    }
  }, [state.favorites, user]);

  const value = { state, dispatch };
  return (
    <FavoritesContext.Provider value={value}>
      {props.children}
    </FavoritesContext.Provider>
  );
};

const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  return context;
};

export { FavoritesContextProvider, useFavorites };
