import { NextRequest } from 'next/server';
import { PremiseService } from '@/lib/services/premise.service';
import { successResponse, errorResponse, notFoundResponse } from '@/lib/utils/api-response';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const premise = await PremiseService.getPremise(id);
    return successResponse(premise);
  } catch (error) {
    if (error instanceof Error && error.message === 'Premise not found') {
      return notFoundResponse('Premise');
    }
    return errorResponse('Failed to fetch premise');
  }
}
