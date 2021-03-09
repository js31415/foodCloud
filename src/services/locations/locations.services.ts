import { locations } from "./location.mock";
import {
  Places,
  LocationRequest,
  LocationResult,
} from "services/app-interfaces";

export const locationRequest = (searchTerm: keyof Places) => {
  return new Promise<LocationRequest>((resolve, reject) => {
    const locationMock = locations[searchTerm];
    if (!locationMock) {
      reject("not found");
    }

    resolve(locationMock);
  });
};

export const locationTransform = (
  response: LocationRequest
): LocationResult => {
  const { geometry } = response.results[0];
  const { lat, lng } = geometry.location;

  return { coordinates: { lat, lng }, viewport: geometry.viewport };
};
