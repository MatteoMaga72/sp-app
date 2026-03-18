import { GreenGoalService } from '@/lib/services/green-goal.service';
import { successResponse, errorResponse } from '@/lib/utils/api-response';

export async function GET() {
  try {
    const data = await GreenGoalService.getDistrictData();
    return successResponse(data);
  } catch (error) {
    return errorResponse('Failed to fetch district data');
  }
}
