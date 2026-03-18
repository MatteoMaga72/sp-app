import { NextRequest } from 'next/server';
import { ChallengeService } from '@/lib/services/challenge.service';
import {
  successResponse,
  errorResponse,
  notFoundResponse,
  badRequestResponse,
} from '@/lib/utils/api-response';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (body.progress === undefined || typeof body.progress !== 'number') {
      return badRequestResponse('progress (number) is required');
    }

    const updated = await ChallengeService.updateProgress(id, body.progress);
    return successResponse(updated);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Challenge not found') return notFoundResponse('Challenge');
      if (error.message.includes('Progress must be')) return badRequestResponse(error.message);
    }
    return errorResponse('Failed to update challenge progress');
  }
}
