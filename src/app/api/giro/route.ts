import { NextRequest } from 'next/server';
import { GiroService } from '@/lib/services/giro.service';
import { successResponse, errorResponse, badRequestResponse } from '@/lib/utils/api-response';

export async function GET() {
  try {
    const arrangements = await GiroService.getArrangements();
    return successResponse(arrangements);
  } catch (error) {
    return errorResponse('Failed to fetch GIRO arrangements');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.bankName || !body.accountNumber) {
      return badRequestResponse('bankName and accountNumber are required');
    }
    const arrangement = await GiroService.createArrangement(body);
    return successResponse(arrangement, 201);
  } catch (error) {
    return errorResponse('Failed to create GIRO arrangement');
  }
}
