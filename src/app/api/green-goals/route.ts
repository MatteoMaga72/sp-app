import { NextRequest } from 'next/server';
import { GreenGoalService } from '@/lib/services/green-goal.service';
import { successResponse, errorResponse, badRequestResponse } from '@/lib/utils/api-response';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const premiseId = searchParams.get('premiseId');
    if (!premiseId) {
      return badRequestResponse('premiseId is required');
    }
    const goals = await GreenGoalService.getGoals(premiseId);
    return successResponse(goals);
  } catch (error) {
    return errorResponse('Failed to fetch green goals');
  }
}
