import { mockImages, mocks } from "./mock";
import camelcaseKeys from "camelcase-keys";
import { RestaurantRequest } from "services/app-interfaces";

export const restaurantsRequest = (location: string) => {
  return new Promise<RestaurantRequest[]>((resolve, reject) => {
    const mock: Array<RestaurantRequest> = mocks[location].results;
    if (!mock) {
      reject("not found");
    }
    resolve(mock);
  });
};

export const restaurantTransform = (
  response: Array<RestaurantRequest>
): RestaurantRequest[] => {
  const transformedResult = camelcaseKeys(response);
  const mappedResults = transformedResult.map(
    (restaurant: RestaurantRequest) => {
      restaurant.photos = restaurant.photos.map((_p: any) => {
        return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
      });

      return {
        ...restaurant,
        address: restaurant.vicinity,
        isOpenNow: restaurant.openingHours && restaurant.openingHours.openNow,
        isClosedTemporarily: restaurant.businessStatus === "CLOSED_TEMPORARILY",
      };
    }
  );

  return mappedResults;
};
