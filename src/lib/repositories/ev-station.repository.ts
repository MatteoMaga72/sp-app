import { SEED_EV_STATIONS } from '@/lib/db/seed-data';
import type { EVStation } from '@/lib/types';

export class EVStationRepository {
  static async findAll(): Promise<EVStation[]> {
    return SEED_EV_STATIONS;
  }

  static async findNearby(lat: number, lng: number, radiusKm = 5): Promise<EVStation[]> {
    // Simplified distance filter using Haversine approximation
    return SEED_EV_STATIONS.filter((station) => {
      const dLat = Math.abs(station.latitude - lat);
      const dLng = Math.abs(station.longitude - lng);
      const approxKm = Math.sqrt(dLat * dLat + dLng * dLng) * 111;
      return approxKm <= radiusKm;
    });
  }
}
