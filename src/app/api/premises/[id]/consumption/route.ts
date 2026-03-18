import { NextRequest } from 'next/server';
import { ConsumptionService } from '@/lib/services/consumption.service';
import { successResponse, errorResponse } from '@/lib/utils/api-response';
import type { UtilityType, PeriodType } from '@/lib/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const utilityType = searchParams.get('utilityType') as UtilityType | undefined;
    const period = searchParams.get('period') as PeriodType | undefined;

    const consumption = await ConsumptionService.getConsumption(
      id,
      utilityType || undefined,
      period || undefined
    );
    return successResponse(consumption);
  } catch (error) {
    return errorResponse('Failed to fetch consumption data');
  }
}
