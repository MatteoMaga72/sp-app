import { NextRequest } from 'next/server';
import { EVStationService } from '@/lib/services/ev-station.service';
import { successResponse, errorResponse } from '@/lib/utils/api-response';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const radius = searchParams.get('radius');

    if (lat && lng) {
      const stations = await EVStationService.findNearby(
        parseFloat(lat),
        parseFloat(lng),
        radius ? parseFloat(radius) : undefined
      );
      return successResponse(stations);
    }

    const stations = await EVStationService.listStations();
    return successResponse(stations);
  } catch (error) {
    return errorResponse('Failed to fetch EV stations');
  }
}
