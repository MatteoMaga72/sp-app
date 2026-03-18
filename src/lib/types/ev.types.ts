export interface EVStation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  available: number;
  total: number;
  chargerTypes: string[];
  distance: number;
}
