import { NextRequest } from 'next/server';
import { RewardService } from '@/lib/services/reward.service';
import { successResponse, errorResponse } from '@/lib/utils/api-response';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const claimed = await RewardService.claimReward(id);
    return successResponse(claimed, 201);
  } catch (error) {
    return errorResponse('Failed to claim reward');
  }
}
