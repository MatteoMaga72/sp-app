import { ChallengeService } from '@/lib/services/challenge.service';
import { successResponse, errorResponse } from '@/lib/utils/api-response';

export async function GET() {
  try {
    const [challenges, userChallenges] = await Promise.all([
      ChallengeService.listChallenges(),
      ChallengeService.getUserChallenges(),
    ]);
    return successResponse({ challenges, userChallenges });
  } catch (error) {
    return errorResponse('Failed to fetch challenges');
  }
}
