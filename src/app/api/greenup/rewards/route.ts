import { RewardService } from '@/lib/services/reward.service';
import { successResponse, errorResponse } from '@/lib/utils/api-response';

export async function GET() {
  try {
    const [rewards, userRewards] = await Promise.all([
      RewardService.listRewards(),
      RewardService.getUserRewards(),
    ]);
    return successResponse({ rewards, userRewards });
  } catch (error) {
    return errorResponse('Failed to fetch rewards');
  }
}
