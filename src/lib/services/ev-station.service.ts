import { EVStationRepository } from '@/lib/repositories/ev-station.repository';

export class EVStationService {
  static async listStations() {
    return EVStationRepository.findAll();
  }

  static async findNearby(lat: number, lng: number, radiusKm?: number) {
    return EVStationRepository.findNearby(lat, lng, radiusKm);
  }
}
