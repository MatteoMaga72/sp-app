import { NextRequest } from 'next/server';
import { LeaderboardService } from '@/lib/services/leaderboard.service';
import { successResponse, errorResponse } from '@/lib/utils/api-response';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const district = searchParams.get('district') ?? undefined;
    const leaderboard = await LeaderboardService.getLeaderboard(district);
    return successResponse(leaderboard);
  } catch (error) {
    return errorResponse('Failed to fetch leaderboard');
  }
}
