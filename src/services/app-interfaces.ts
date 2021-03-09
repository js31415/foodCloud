export interface RestaurantRequest {
  address?: string;
  businessStatus: string;
  geometry: Geometry;
  icon?: string;
  isClosedTemporarily: boolean;
  isOpenNow?: boolean;
  ix: string;
  name: string;
  openingHours?: OpeningHours;
  photos: string[];
  placeId: string;
  plusCode?: PlusCode;
  priceLevel: number;
  rating: number;
  reference: string;
  scope: string;
  types?: string[];
  userRatingsTotal: number;
  vicinity?: string;
}

export interface Geometry {
  location: Coordinates;
  viewport: ViewPort;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface ViewPort {
  northeast: Coordinates;
  southwest: Coordinates;
}

interface OpeningHours {
  openNow: boolean;
}

interface PlusCode {
  compoundCode: string;
  globalCode: string;
}
export interface LocationRequest {
  results: LocationItem[];
  status?: string;
}

export interface LocationItem {
  geometry: Geometry;
}

export interface Places {
  [index: string]: LocationRequest;
}

export interface LocationResult {
  coordinates: Coordinates;
  viewport: ViewPort;
}
