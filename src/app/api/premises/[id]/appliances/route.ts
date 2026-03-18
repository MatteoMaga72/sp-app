import { NextRequest } from 'next/server';
import { ApplianceService } from '@/lib/services/appliance.service';
import { successResponse, errorResponse } from '@/lib/utils/api-response';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const appliances = await ApplianceService.getAppliances(id);
    return successResponse(appliances);
  } catch (error) {
    return errorResponse('Failed to fetch appliances');
  }
}
