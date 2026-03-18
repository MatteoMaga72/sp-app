import { NextRequest } from 'next/server';
import { SimulatorService } from '@/lib/services/simulator.service';
import { successResponse, errorResponse, badRequestResponse } from '@/lib/utils/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (
      body.acTemp === undefined ||
      body.acHours === undefined ||
      body.showers === undefined ||
      body.laundryLoads === undefined ||
      body.lightsWasted === undefined ||
      body.entertainment === undefined
    ) {
      return badRequestResponse(
        'Required fields: acTemp, acHours, showers, laundryLoads, lightsWasted, entertainment'
      );
    }

    const result = SimulatorService.calculate(body);
    return successResponse(result);
  } catch (error) {
    return errorResponse('Failed to calculate simulation');
  }
}
